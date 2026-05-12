import * as CONST from '../data/constants.js';
import * as WORLD from '../world/world.js';
import * as STATE from '../core/stateManager.js';
import * as SCORE from '../ui/score.js';
import { HUMAN_TEXT_JP } from '../text/human_text_jp.js';

export class Human {
  constructor(id, x, y, isVIP = false) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.state = 'walk';
    this.climbFlag = false;
    this.speechTimer = 0;
    this.speechText = "";
    this.speechCooldown = 0;
    this.aiTimer = 0;
    this.timer = 0;
    this.isVIP = isVIP;
    this.dir = Math.random() < 0.5 ? -1 : 1;
    this.animTime = Math.random() * 10;
    this.lastClimbTime = STATE.elapsed;
    this.attachedBlock = null; // { x, y } 追従対象のブロック座標
    this.goalSubState = 0; // 0:Wave, 1:Jump, 2:Dance, 3:Walk, 4:Joy
    this.hasNoticedCrack = false; // ヒビに気づいた直後か
    
    // 死亡関連
    this.deathType = null; // 'bomb', 'drown', 'fall'
    this.deathTimer = 0;
    this.deathParts = []; // { x, y, vx, vy, rot, vrot }
    this.skullTimer = 0;
    this.isDead = false;
  }

  getStandingY(gx, fromY) {
    if (gx < 0 || gx >= CONST.COLS) return CONST.TOTAL_ROWS * CONST.SIZE;
    for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
      let cell = WORLD.grid[y][gx];
      if (cell) {
        let offset = (typeof cell === 'object' && cell.renderOffsetY) ? cell.renderOffsetY : 0;
        let cellY = (y + offset) * CONST.SIZE;
        // 判定基準となる高さ（通常は足元の少し上）より下にあるブロックのみを返す
        if (cellY >= fromY - CONST.HUMAN_STANDING_CHECK_OFFSET) {
          return cellY;
        }
      }
    }
    return CONST.TOTAL_ROWS * CONST.SIZE;
  }

  getDanger() {
    // 落下中の爆弾
    for (let b of STATE.fallingBombs) {
      let dx = Math.abs((b.x * CONST.SIZE) - this.x);
      let dy = Math.abs((b.y * CONST.SIZE) - this.y);
      if (dx <= CONST.HUMAN_DANGER_DIST * CONST.SIZE && dy <= CONST.HUMAN_DANGER_DIST * CONST.SIZE) return true;
    }
    // 地面の爆弾（設置済み）
    let gx = Math.round((this.x - CONST.OFFSET_X) / CONST.SIZE);
    let gy = Math.floor(this.y / CONST.SIZE);
    for (let dx = -2; dx <= 2; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        let nx = gx + dx;
        let ny = gy + dy;
        if (nx >= 0 && nx < CONST.COLS && ny >= 0 && ny < CONST.TOTAL_ROWS) {
          let cell = WORLD.grid[ny][nx];
          if (cell && (cell === 9 || (typeof cell === 'object' && cell.type === 'bomb'))) return true;
        }
      }
    }
    // 水面
    let waterY = WORLD.waterWorldY() * CONST.SIZE;
    if (waterY - this.y <= CONST.HUMAN_DANGER_WATER_M * (CONST.SIZE / CONST.METERS_PER_ROW)) return true;
    return false;
  }

  onBlockBroken(bx, by) {
    let gx = Math.round((this.x - CONST.OFFSET_X) / CONST.SIZE);
    let gy = Math.floor(this.y / CONST.SIZE);
    let feetGy = Math.floor((this.y + CONST.HUMAN_LOGICAL_SIZE - CONST.HUMAN_STANDING_CHECK_OFFSET + 3) / CONST.SIZE);
    
    if (bx === gx && (by === gy || by === feetGy || by === feetGy + 1)) {
      if (this.state !== 'fall') {
        this.state = 'fall';
        this.vx = 0;
        this.say("DANGER");
        this.climbFlag = false;
      }
    }
  }

  onBlockMove(bx, oldBy, newBy) {
    let gx = Math.round((this.x - CONST.OFFSET_X) / CONST.SIZE);
    if (bx !== gx) return;
    
    let gy = Math.floor(this.y / CONST.SIZE);
    let feetGy = Math.floor((this.y + CONST.HUMAN_LOGICAL_SIZE - 2) / CONST.SIZE);

    if (this.state === 'climb' && (gy === oldBy || gy === oldBy + 1)) {
       // ブロックと一緒に落下（追従開始）
       this.attachedBlock = { x: bx, y: newBy, relativeY: this.y - oldBy * CONST.SIZE };
    } else if (bx === gx && (gy === oldBy || feetGy === oldBy)) {
       // 乗っているブロックが落ちた -> 即落下状態へ
       if (this.state !== 'fall') {
         this.state = 'fall';
         this.fallStartY = this.y; // 落下開始位置
         this.climbFlag = false;
       }
    }
  }

  think() {
    let gx = Math.round((this.x - CONST.OFFSET_X) / CONST.SIZE);
    gx = Math.max(0, Math.min(CONST.COLS - 1, gx));
    let waterY = WORLD.waterWorldY() * CONST.SIZE;

    if (this.y > waterY) {
      if (this.state !== 'drown' && this.state !== 'goal') {
        this.state = 'drown';
        this.timer = CONST.HUMAN_DROWN_DEATH_SEC; // 死亡までの時間
        this.say("DROWNING");
      } else if (this.state === 'drown' && this.timer <= 0) {
        this.die('drown');
      }
      if (this.state !== 'goal') return;
    }

    if (this.state === 'goal') return;

    if (this.state === 'shock') {
      this.timer -= CONST.HUMAN_TICK_DELTA; // Tickベースの概算
      if (this.timer <= 0) {
        this.state = 'walk';
        this.dir = Math.random() < 0.5 ? -1 : 1;
        this.vx = this.dir * CONST.HUMAN_SPEED_WALK * CONST.SIZE;
        this.hasNoticedCrack = false;
      }
      return;
    }

    if (this.state === 'climb_cracked') {
      // 救済モード：登り続けるが50%で崩壊
      let gy = Math.floor((this.y + CONST.HUMAN_LOGICAL_SIZE / 2) / CONST.SIZE);
      let gx = Math.round((this.x - CONST.OFFSET_X) / CONST.SIZE);
      let cell = WORLD.grid[gy] ? WORLD.grid[gy][gx] : null;
      
      if (!cell || !cell.isCracked) {
        this.state = 'fall';
        return;
      }

      // 50%の位置（セルの半分）まで登ったかチェック
      let cellTopY = gy * CONST.SIZE;
      if (this.y <= cellTopY + CONST.SIZE * CONST.HUMAN_CELL_CENTER_THRESHOLD) {
        // 崩壊！
        WORLD.grid[gy][gx] = null;
        STATE.showDebugMessage("RESCUE: CRACKED BLOCK BROKEN");
        this.state = 'fall';
        this.vy = 0;
        // 周辺の崩壊を誘発
        import('../world/collapse.js').then(m => m.applyLimit());
        return;
      }
      this.vy = -CONST.HUMAN_SPEED_CLIMB * CONST.SIZE;
      return;
    }

    if (this.state === 'fell_over') {
      if (this.timer <= 0 || this.getDanger()) {
        this.state = 'walk';
      } else {
        return;
      }
    }

    // 自分が重なっている、または足元にあるブロックを探索
    let feetY = this.y + CONST.HUMAN_LOGICAL_SIZE;
    let standingY = CONST.TOTAL_ROWS * CONST.SIZE;
    let wallY = -1;
    let wallCanClimb = false;

    // 現在のカラムを上から走査して、足場と壁を特定する
    for (let r = 0; r < CONST.TOTAL_ROWS; r++) {
      let cell = WORLD.grid[r][gx];
      if (cell) {
        let cellY = r * CONST.SIZE;
        let cID = (typeof cell === 'object') ? cell.color : cell;
        let props = CONST.BLOCK_PROPERTIES[cID] || { canClimb: 1 };

        // 自分が「中」にいる（重なっている）ブロック、または目の前にあるブロック
        if (cellY < feetY && cellY + CONST.SIZE > this.y) {
          if (props.canClimb && !cell.isCracked) {
            wallY = cellY;
            wallCanClimb = true;
          } else if (cell.isCracked && this.state === 'walk') {
            // ヒビを発見
            this.onEncounterCrack();
            return;
          }
        }
        // 足場（自分の足元より下にある最も高いブロック）
        if (cellY >= feetY - 2) {
          standingY = Math.min(standingY, cellY);
        }
      }
    }

    // 落下判定
    if (this.state !== 'climb' && feetY < standingY - CONST.HUMAN_FALL_THRESHOLD_SIZE) {
      if (this.state !== 'fall') {
        this.state = 'fall';
        this.fallStartY = this.y;
        this.vx = 0;
        this.say("FALLING");
      }
    }

    // 接地判定
    if (this.state === 'fall' && feetY >= standingY) {
      this.state = 'walk';
      this.say("LANDED");
      this.y = standingY - CONST.HUMAN_LOGICAL_SIZE;
      this.vy = 0;
      return;
    }

    let isDanger = this.getDanger();
    let speedMult = isDanger ? CONST.HUMAN_SPEED_ESCAPE : CONST.HUMAN_SPEED_WALK;
    
    // 特殊な高速登攀（セーフラインから遠い場合）
    let renderMeters = Math.max(0, (CONST.TOTAL_ROWS - STATE.renderSafeLine - 2) * CONST.METERS_PER_ROW);
    let currentMeters = (CONST.TOTAL_ROWS - (this.y / CONST.SIZE) - 1) * CONST.METERS_PER_ROW;
    if (renderMeters - currentMeters >= 30) {
      speedMult = CONST.HUMAN_SPEED_FAST_CLIMB;
    }

    let isClimbingPossible = (wallY !== -1 && wallCanClimb);

    // 登攀判定：自分がブロックの中にいる、または登攀中
    if (this.state === 'climb') {
      this.lastClimbTime = STATE.elapsed;
      if (wallY === -1 || !wallCanClimb) { // 壁がなくなった
        this.state = 'walk';
        this.climbFlag = false;
        this.vy = 0;
      } else if (this.y <= wallY - CONST.HUMAN_LOGICAL_SIZE + CONST.HUMAN_STANDING_SEARCH_OFFSET) { // 登りきった
        this.y = wallY - CONST.HUMAN_LOGICAL_SIZE;
        this.state = 'walk';
        this.climbFlag = false;
        this.vy = 0;
      } else {
        this.vy = -speedMult * CONST.SIZE;
      }
      return;
    }

    if (wallY !== -1) {
      if (wallCanClimb) {
        // ブロック中央から左右25%幅（中央50%エリア）にいる時のみ登れる
        let blockCenterX = gx * CONST.SIZE + CONST.OFFSET_X + CONST.SIZE / 2;
        let distFromCenter = Math.abs(this.x - blockCenterX);
        
        if (distFromCenter <= CONST.SIZE * CONST.HUMAN_BLOCK_CENTER_RANGE_RATIO) {
          this.state = 'climb';
          this.climbFlag = true;
          this.vx = 0;
          this.vy = -speedMult * CONST.SIZE;
          return;
        }
      } else {
        // 登れない壁（赤ブロックなど）
        if (Math.random() < CONST.HUMAN_CANT_CLIMB_CHANCE) this.say("CANT_CLIMB");
        // 壁にぶつかったので反転
        if (this.state === 'walk') {
           this.dir *= -1;
           this.vx = this.dir * speedMult * CONST.SIZE;
        }
      }
    }

    // 先読み：歩く先にブロックがない場合は引き返す
    if (this.state === 'walk' || this.state === 'escape') {
      let nextGx = Math.round((this.x + this.dir * CONST.SIZE * CONST.HUMAN_LOOK_AHEAD_RATIO - CONST.OFFSET_X) / CONST.SIZE);
      nextGx = Math.max(0, Math.min(CONST.COLS - 1, nextGx));
      let nextStandingY = this.getStandingY(nextGx, feetY);
      
      if (nextStandingY > feetY + CONST.HUMAN_LEDGE_HEIGHT_THRESHOLD_SIZE) { // 段差が大きい
        if (this.state === 'escape') {
          // 逃走中は50%で気づかず落ちる
          if (Math.random() < CONST.HUMAN_SLIP_CHANCE) {
             // 続行（そのまま走って落ちる）
          } else {
            this.dir *= -1;
            this.vx = this.dir * speedMult * CONST.SIZE;
          }
        } else if (this.state === 'walk') {
          // 通常時は引き返す
          this.dir *= -1;
          this.vx = this.dir * speedMult * CONST.SIZE;
        }
      }
    }

    // 洪水接近の警告
    let distToWater = waterY - feetY;
    if (distToWater > 0 && distToWater < CONST.SIZE * 3) {
      if (Math.random() < CONST.HUMAN_FLOOD_NEAR_CHANCE) this.say("FLOOD_NEAR");
    }

    // 迷子判定
    if (STATE.elapsed - this.lastClimbTime > CONST.HUMAN_LOST_SEC) {
      if (this.state === 'walk' || this.state === 'escape') {
        this.state = 'lost';
        this.say("LOST");
      }
    }
    if (this.state === 'lost' && (STATE.elapsed - this.lastClimbTime < CONST.HUMAN_LOST_SEC || isClimbingPossible)) {
       // 登れるようになったら復帰
       if (isClimbingPossible) {
         this.speechCooldown = 0; // 優先度高：クールダウン無視
         this.say("FOUND_PATH");
       }
       this.state = 'walk';
       this.lastClimbTime = STATE.elapsed;
    }

    // 逃走・歩行・迷子
    if (isDanger) {
      this.state = 'escape';
      this.lastClimbTime = STATE.elapsed; // 逃げてる間は迷子にならない
      if (Math.random() < CONST.HUMAN_FELL_OVER_CHANCE) {
        this.state = 'fell_over';
        this.timer = CONST.HUMAN_FALL_OVER_SEC;
        this.say("FELL_OVER");
        return;
      }
      this.vx = this.dir * speedMult * CONST.SIZE;
      this.vy = 0;
    } else {
      if (this.state !== 'fall') {
        if (this.state !== 'lost') this.state = 'walk';
        this.vy = 0;
        if (Math.random() < CONST.HUMAN_RANDOM_WALK_DIR_CHANCE) this.dir *= -1;
        else if (Math.random() < CONST.HUMAN_RANDOM_WALK_STOP_CHANCE) this.vx = 0;
        else this.vx = this.dir * speedMult * CONST.SIZE;
      }
    }
  }

  applyVelocity(dt) {
    let speedMultiplier = 1.0;
    if (STATE.state === "goal_wait") speedMultiplier = 2.0;

    // 落下ブロックへの追従
    if (this.attachedBlock) {
       let cell = WORLD.grid[this.attachedBlock.y][this.attachedBlock.x];
       if (cell && typeof cell === 'object' && cell.renderOffsetY !== undefined) {
          this.y = (this.attachedBlock.y + cell.renderOffsetY) * CONST.SIZE + this.attachedBlock.relativeY;
          if (cell.renderOffsetY >= 0) this.attachedBlock = null; // 追従終了
       } else {
          this.attachedBlock = null;
       }
    }

    if (this.state === 'fall' || this.state === 'drown') {
      this.vy += CONST.GRAVITY_ACCEL * CONST.SIZE * dt;
      this.vx = 0; // 落下中・溺れ中は横移動禁止
      
      if (this.state === 'drown') {
         // 水面に浮かぶ（上昇に合わせてyを更新）
         let waterY = WORLD.waterWorldY() * CONST.SIZE;
         if (this.y > waterY) {
            this.y = waterY;
            this.vy = 0;
         }
      }
    } else if (this.state !== 'climb' && !this.attachedBlock) {
      // 接地チェック
      let gx = Math.round((this.x - CONST.OFFSET_X) / CONST.SIZE);
      gx = Math.max(0, Math.min(CONST.COLS - 1, gx));
      
      let feetY = this.y + CONST.HUMAN_LOGICAL_SIZE;
      let standingY = this.getStandingY(gx, feetY);

      if (this.vy >= 0 && feetY >= standingY - 5) {
        // 着地
        if (this.state === 'fall') {
          let dist = (this.y - this.fallStartY) / CONST.SIZE;
          if (dist >= CONST.HUMAN_FALL_DEATH_HEIGHT) {
            this.die('fall');
            return;
          }
          this.state = 'walk';
          this.say("LANDED");
        }
        this.y = standingY - CONST.HUMAN_LOGICAL_SIZE;
        this.vy = 0;
      }
    }

    this.x += this.vx * dt * speedMultiplier;
    this.y += this.vy * dt * speedMultiplier;

    if (this.state !== 'climb' && this.state !== 'fell_over' && !this.attachedBlock) {
      let gx = Math.round((this.x - CONST.OFFSET_X) / CONST.SIZE);
      gx = Math.max(0, Math.min(CONST.COLS - 1, gx));
      
      let feetY = this.y + CONST.HUMAN_LOGICAL_SIZE;
      let standingY = this.getStandingY(gx, feetY);

      if (this.vy >= 0 && feetY >= standingY - 5) {
        this.y = standingY - CONST.HUMAN_LOGICAL_SIZE;
        this.vy = 0;
        if (this.state === 'fall') {
          this.state = 'walk';
          this.say("LANDED");
        }
      }
    }

    if (this.x < CONST.OFFSET_X) { this.x = CONST.OFFSET_X; this.dir = 1; }
    if (this.x > CONST.OFFSET_X + (CONST.COLS - 1) * CONST.SIZE) { this.x = CONST.OFFSET_X + (CONST.COLS - 1) * CONST.SIZE; this.dir = -1; }
  }

  update(dt) {
    this.animTime += dt;
    if (this.isDead) {
      this.updateDeath(dt);
      return;
    }
    
    this.aiTimer -= dt;
    if (this.speechTimer > 0) this.speechTimer -= dt;
    if (this.speechCooldown > 0) this.speechCooldown -= dt;
    if (this.timer > 0) this.timer -= dt;

    if (this.state === 'goal') {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.timer = CONST.HUMAN_GOAL_SUBSTATE_SEC;
        this.goalSubState = (this.goalSubState + 1) % 5;
        if (Math.random() < 0.2) this.say("GOAL");
      }
    }

    if (this.aiTimer <= 0) {
      this.think();
      this.aiTimer = CONST.HUMAN_AI_TICK_MIN + Math.random() * (CONST.HUMAN_AI_TICK_MAX - CONST.HUMAN_AI_TICK_MIN);
    }

    this.applyVelocity(dt);
  }

  onEncounterCrack() {
    this.state = 'shock';
    this.timer = CONST.HUMAN_SHOCK_SEC;
    this.vx = 0;
    this.vy = 0;
    this.hasNoticedCrack = true;
    this.say("CRACKED");
  }

  die(type) {
    if (this.isDead) return;
    this.isDead = true;
    this.state = 'dead';
    this.deathType = type;
    this.deathTimer = CONST.HUMAN_DEATH_FADE_SEC;
    this.vx = 0;
    this.vy = 0;

    if (type === 'bomb') {
      // パーツ飛散の初期化
      for (let i = 0; i < 5; i++) {
        let angle = (Math.random() * 360) * Math.PI / 180;
        let speed = (3 + Math.random() * 5) * CONST.SIZE;
        if (i < 2) { // 爆風で斜め上に飛ばす演出
           angle = (-45 + (Math.random() - 0.5) * 30) * Math.PI / 180;
           speed = 10 * CONST.SIZE;
        }
        this.deathParts.push({
          x: 0, y: 0,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * CONST.EXPLOSION_GRAVITY
        });
      }
    }

    this.checkWitnessDeath();
    
    // レーダー用の死亡リストに追加
    STATE.deadHumans.push({
      x: this.x,
      y: this.y,
      type: type
    });
  }

  checkWitnessDeath() {
    for (let h of STATE.humans) {
      if (h === this || h.isDead) continue;
      let dx = h.x - this.x;
      let dy = h.y - this.y;
      let dist = Math.sqrt(dx * dx + dy * dy) / CONST.SIZE;
      if (dist < CONST.HUMAN_DEATH_REACTION_DIST) {
        h.state = 'escape';
        h.dir = dx > 0 ? 1 : -1; // 死亡地点から離れる
        h.vx = h.dir * CONST.HUMAN_SPEED_ESCAPE * CONST.SIZE;
        h.say("FEAR");
        h.timer = 2.0; // 少しの間逃走
      }
    }
  }

  updateDeath(dt) {
    if (this.deathTimer > 0) {
      this.deathTimer -= dt;
      if (this.deathType === 'bomb') {
        for (let p of this.deathParts) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += CONST.EXPLOSION_GRAVITY * CONST.SIZE * dt; // 簡易重力
          p.rot += p.vrot * dt;
        }
      } else if (this.deathType === 'drown') {
        this.y += CONST.DROWN_SINK_SPEED * CONST.SIZE * dt; // ゆっくり沈む
      }
      
      if (this.deathTimer <= 0) {
        this.skullTimer = CONST.HUMAN_DEATH_SKULL_SEC;
      }
    } else if (this.skullTimer > 0) {
      this.skullTimer -= dt;
    }
  }

  say(key) {
    if (this.speechCooldown > 0) return;
    
    let myGx = Math.round((this.x - CONST.OFFSET_X) / CONST.SIZE);
    let myGy = Math.round(this.y / CONST.HUMAN_LOGICAL_SIZE);
    for (let h of STATE.humans) {
      if (h.id >= this.id) continue;
      let hx = Math.round((h.x - CONST.OFFSET_X) / CONST.SIZE);
      let hy = Math.round(h.y / CONST.HUMAN_LOGICAL_SIZE);
      if (Math.abs(hx - myGx) <= 1 && Math.abs(hy - myGy) <= 1) {
         return;
      }
    }
    
    let texts = HUMAN_TEXT_JP.SPEECH[key];
    if (!texts) return;
    this.speechText = texts[Math.floor(Math.random() * texts.length)];
    this.speechTimer = CONST.HUMAN_SPEECH_SEC;
    this.speechCooldown = CONST.HUMAN_SPEECH_SEC * 2 + Math.random();
  }
}
