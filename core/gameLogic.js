import * as CONST from '../data/constants.js';
import * as WORLD from '../world/world.js';
import * as STATE from '../core/stateManager.js';
import * as COLLAPSE from '../world/collapse.js';
import * as BLOCK from '../entities/block.js';
import * as EFFECTS from '../core/effects.js';
import * as SCORE from '../ui/score.js';
import { Human } from '../entities/human.js';

let rowFullTimers = {}; // { y: seconds }

export function spawnHumans() {
  let h = [];
  let vipIndex = Math.floor(Math.random() * CONST.HUMAN_COUNT_INITIAL);
  for (let i = 0; i < CONST.HUMAN_COUNT_INITIAL; i++) {
    let x = CONST.OFFSET_X + CONST.SIZE + Math.random() * (CONST.COLS - 2) * CONST.SIZE;
    h.push(new Human(i, x, 0, i === vipIndex));
  }
  for (let human of h) {
    let gx = Math.round((human.x - CONST.OFFSET_X) / CONST.SIZE);
    let surfaceY = human.getStandingY(gx, 0);
    // 初期は地面に設置
    human.y = surfaceY - CONST.HUMAN_LOGICAL_SIZE;
  }
  STATE.setHumans(h);
  STATE.setAllHumans([...h]);
}

export function startGameOver() {
  if (STATE.state === "gameover") return;
  STATE.setState("gameover");
  STATE.setGameoverStart(STATE.elapsed);
  STATE.setGameoverCameraY(WORLD.cameraY);
  BLOCK.setPair(null);
  STATE.setGravityActive(false);
}

export function resetFloodGrace() {
  STATE.setFloodPhase("none");
  STATE.setCurrentPhase(0);
}

export function startFloodGrace() {
  if (STATE.floodPhase !== "none") return;
  STATE.setLimitWarningUntil(0);
  STATE.setFloodPhase("blink");
  STATE.setFloodBlinkStart(STATE.elapsed);
  STATE.setCautionAnimTimer(CONST.UI_CAUTION_ANIM_DURATION + CONST.UI_CAUTION_FADE_OUT_DURATION);
}

export function updateFloodGrace(dt) {
  if (STATE.floodPhase === "none") return;

  if (STATE.floodPhase === "blink") {
    STATE.setCautionAnimTimer(Math.max(0, STATE.cautionAnimTimer - dt));
    if (STATE.cautionAnimTimer <= 0) {
      STATE.setFloodPhase("countdown");
      STATE.setFloodCountdownEnd(STATE.elapsed + CONST.DANGER_COUNTDOWN_SECONDS);
    }
    return;
  }

  if (STATE.floodPhase === "countdown") {
    const remain = Math.max(0, STATE.floodCountdownEnd - STATE.elapsed);
    if (remain > 7.0) STATE.setCurrentPhase(1);
    else if (remain > 4.0) STATE.setCurrentPhase(2);
    else if (remain > 2.0) STATE.setCurrentPhase(3);
    else STATE.setCurrentPhase(4);
    if (remain <= 0) startGameOver();
  }
}

export function isCautionPause() {
  return STATE.state === "playing" && STATE.floodPhase === "blink";
}

export function update(dt) {
  STATE.addElapsed(dt);
  if (STATE.debugMessageTimer > 0) {
    STATE.setDebugMessageTimer(STATE.debugMessageTimer - dt);
  }

  EFFECTS.updateRain(dt);
  EFFECTS.updateThunder(dt);
  EFFECTS.updateShake(dt);

  WORLD.updateSafe();

  // 人間の更新 (Playing, GoalWait, GameOver, Clear のいずれでも継続)
  if (STATE.state === "playing" || STATE.state === "goal_wait" || STATE.state === "gameover" || STATE.state === "clear") {
    let remaining = [];
    let speedMult = (STATE.state === "goal_wait") ? 2.5 : 1.0;
    for (let h of STATE.humans) {
      h.update(dt * speedMult);
      if (h.state === 'drown' && !h.isDead) {
        h.drownTimer = (h.drownTimer || 0) + dt * speedMult;
        if (h.drownTimer >= CONST.HUMAN_DROWN_DEATH_SEC) {
          h.die('drown');
        }
      }
      if (h.y <= (WORLD.cameraY + CONST.ROWS + 10) * CONST.SIZE) {
        remaining.push(h);
      }
    }
    STATE.setHumans(remaining);

    if (remaining.length === 0 && STATE.state === "playing") {
      STATE.setState("gameover");
      STATE.setGameoverStart(STATE.elapsed);
      STATE.setGameoverCameraY(WORLD.cameraY);
      return;
    }
    updateRescue(dt);
  }

  // --- 以降、状態ごとの個別処理 ---

  if (STATE.state === "clear") {
    const clearRiseSec = 2.4;
    if (!STATE.clearCelebrationFired && (STATE.elapsed - STATE.clearStart) >= clearRiseSec) {
      EFFECTS.spawnClearCelebration();
      STATE.setClearCelebrationFired(true);
    }
    EFFECTS.updateCelebrationEffects();
    return;
  }

  if (STATE.state === "gameover") {
    WORLD.setCameraY(STATE.gameoverCameraY);
    for (let i = 0; i < CONST.GAMEOVER_GRAVITY_STEPS; i++) COLLAPSE.forceGravity();
    if (STATE.elapsed >= CONST.WATER_START_DELAY) {
      WORLD.setWater(WORLD.water + dt * CONST.WATER_SPEED * CONST.GAMEOVER_WATER_MULT);
      const maxWater = (CONST.TOTAL_ROWS - 1) - WORLD.cameraY;
      WORLD.setWater(Math.min(WORLD.water, maxWater));
    }
    return;
  }

  if (STATE.state === "goal_wait") {
    let allReached = true;
    let goalMeterY = (CONST.TOTAL_ROWS - (CONST.GOAL_METERS / CONST.METERS_PER_ROW) - 1.5) * CONST.SIZE;
    for (let h of STATE.humans) {
      if (h.y > goalMeterY) {
        allReached = false;
        break;
      }
    }
    if (allReached) {
      STATE.setState("clear");
      let s = 0;
      for (let h of STATE.humans) {
        s += h.isVIP ? CONST.SCORE_HUMAN_VIP : CONST.SCORE_HUMAN_NORMAL;
        h.state = 'goal';
        h.timer = CONST.HUMAN_GOAL_SUBSTATE_SEC;
        h.goalSubState = 0; 
        h.say("GOAL");
      }
      SCORE.addScore(s);
      STATE.setClearStart(STATE.elapsed);
    }
    return;
  }

  if (STATE.state !== "playing") return;
  if (isCautionPause()) {
    updateFloodGrace(dt);
    return;
  }

  // --- プレイ中のメインロジック ---
  if (!STATE.debugPauseWater && STATE.elapsed >= CONST.WATER_START_DELAY) {
    WORLD.setWater(WORLD.water + dt * CONST.WATER_SPEED);
  }
  updateBombs(dt);

  // ゴール到達チェック
  const currentRenderM = Math.round((CONST.TOTAL_ROWS - STATE.renderSafeLine - 2) * CONST.METERS_PER_ROW);
  if (currentRenderM >= CONST.GOAL_METERS && !STATE.gravityActive) {
    STATE.setState("goal_wait");
    BLOCK.setPair(null);
  }

  if ((WORLD.water * CONST.METERS_PER_ROW) >= WORLD.heightMeters()) {
    startFloodGrace();
  } else {
    resetFloodGrace();
  }
  updateFloodGrace(dt);

  if (STATE.state !== "playing") return;

  if (BLOCK.pair) BLOCK.updatePairRender();
  if (STATE.gravityActive) COLLAPSE.updateCascade(dt);

  updateCrackingBlocks(dt);

  if (!STATE.nextPair && STATE.spawnEnabled) STATE.setNextPair(BLOCK.newPair());
  if (!BLOCK.pair && STATE.spawnEnabled && STATE.nextPair) {
    BLOCK.setPair(STATE.nextPair);
    STATE.setNextPair(BLOCK.newPair());
  }

  BLOCK.addDrop(dt);
  let speed = BLOCK.fast ? CONST.FAST : CONST.FALL;

  if (BLOCK.drop > speed) {
    BLOCK.setDrop(0);
    BLOCK.pair.y++;
    if (BLOCK.hit(BLOCK.blocks(BLOCK.pair))) {
      BLOCK.pair.y--;
      BLOCK.merge();
      BLOCK.setPair(null);
      if (!STATE.gravityActive) COLLAPSE.startCascade();
      else {
        COLLAPSE.setupGravity();
        let hasCracking = false;
        for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
          for (let x = 0; x < CONST.COLS; x++) {
            let c = WORLD.grid[y][x];
            if (c && typeof c === 'object' && c.state === 'cracking') hasCracking = true;
          }
        }
        if (hasCracking && STATE.cascadePhase !== 'cracking') STATE.setCascadePhase('cracking');
      }
    }
  }

  if (STATE.state === "playing") {
    STATE.setRenderSafeLine(STATE.renderSafeLine + (WORLD.safeLine - STATE.renderSafeLine) * CONST.SAFE_LINE_LERP);
    WORLD.setTargetCameraY(Math.max(0, Math.min(CONST.TOTAL_ROWS - CONST.ROWS, (STATE.renderSafeLine + 1) - CONST.SAFE_LINE_SCREEN_Y)));
    WORLD.setCameraY(WORLD.cameraY + (WORLD.targetCameraY - WORLD.cameraY) * CONST.CAMERA_LERP);
  }
}

function updateBombs(dt) {
  if (STATE.state !== "playing") return;
  if (STATE.elapsed - STATE.lastBombCheck >= CONST.BOMB_CHECK_INTERVAL) {
    STATE.setLastBombCheck(STATE.lastBombCheck + CONST.BOMB_CHECK_INTERVAL);
    const currentM = WORLD.heightMeters();
    if (currentM >= CONST.BOMB_START_METERS) {
      let prob = Math.floor((currentM - CONST.BOMB_START_METERS) / CONST.BOMB_PROB_STEP_METERS) * CONST.BOMB_PROB_STEP_PERCENT;
      prob = Math.min(CONST.BOMB_PROB_MAX_PERCENT, prob);
      if (Math.random() < prob / 100) {
        STATE.fallingBombs.push({
          x: Math.floor(Math.random() * CONST.COLS),
          y: WORLD.cameraY - 2,
          timer: CONST.BOMB_TIMER_MIN + Math.random() * (CONST.BOMB_TIMER_MAX - CONST.BOMB_TIMER_MIN)
        });
      }
    }
  }
  for (let i = STATE.fallingBombs.length - 1; i >= 0; i--) {
    let b = STATE.fallingBombs[i];
    let nextY = b.y + CONST.BOMB_FALL_SPEED * dt;
    
    let visualTop = CONST.TOTAL_ROWS;
    for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
      let cell = WORLD.grid[y][b.x];
      if (cell) {
        let offset = (typeof cell === 'object' && cell.renderOffsetY) ? cell.renderOffsetY : 0;
        visualTop = y + offset;
        break;
      }
    }
    
    if (nextY + 1 >= visualTop) {
      let placeY = Math.floor(visualTop) - 1; // 実際のグリッドインデックスとして最も近い空きマス
      if (placeY >= 0) {
        WORLD.grid[placeY][b.x] = { type: 'bomb', timer: b.timer };
        if (!STATE.gravityActive) COLLAPSE.startCascade();
        else COLLAPSE.setupGravity();
        if (COLLAPSE.applyLimit()) COLLAPSE.triggerLimitWarning();
      }
      STATE.fallingBombs.splice(i, 1);
    } else {
      b.y = nextY;
    }
  }
  let exploded = false;
  for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
    for (let x = 0; x < CONST.COLS; x++) {
      let cell = WORLD.grid[y][x];
      if (typeof cell === 'object' && cell.type === 'bomb' && cell.state !== 'cracking') {
        if (!STATE.debugPauseCracking) {
          cell.timer -= dt;
        }
        if (cell.timer <= 0) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              let ny = y + dy, nx = x + dx;
              if (nx >= 0 && nx < CONST.COLS && ny >= 0 && ny < CONST.TOTAL_ROWS && WORLD.grid[ny][nx] !== 9) {
                if (WORLD.grid[ny][nx]) {
                  let color = (typeof WORLD.grid[ny][nx] === 'number') ? CONST.COLORS[WORLD.grid[ny][nx]] : "#ff3300";
                  EFFECTS.spawnParticles(nx, ny, color);
                }
                WORLD.grid[ny][nx] = 0;
                STATE.humans.forEach(h => h.onBlockBroken(nx, ny));
              }
            }
          }
          exploded = true;
        }
      }
    }
  }
  if (exploded) {
    if (!STATE.gravityActive) COLLAPSE.startCascade();
    else COLLAPSE.setupGravity();
  }
}

function updateCrackingBlocks(dt) {
  if (STATE.debugPauseCracking) return;
  if (!STATE.gravityActive) {
    let anyCrackFinished = false;
    for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
      for (let x = 0; x < CONST.COLS; x++) {
        let cell = WORLD.grid[y][x];
        if (cell && typeof cell === 'object' && cell.state === 'cracking') {
          let timerKey = cell.type === 'bomb' ? 'crackTimer' : 'timer';
          cell[timerKey] -= dt;
          if (cell[timerKey] <= 0) {
            if (cell.type === 'bomb') {
              checkBombDamage(x, y);
            }
            let color = cell.type === 'bomb' ? "#555555" : CONST.COLORS[cell.color];
            EFFECTS.spawnParticles(x, y, color);
            WORLD.grid[y][x] = 0;
            anyCrackFinished = true;
          }
        }
      }
    }
    if (anyCrackFinished) COLLAPSE.startCascade();
  }
}

function checkRowFullCracked(y) {
  if (y < 0 || y >= CONST.TOTAL_ROWS) return false;
  for (let x = 0; x < CONST.COLS; x++) {
    let cell = WORLD.grid[y][x];
    if (!cell || cell === 9 || (typeof cell === 'object' && !cell.isCracked)) return false;
  }
  return true;
}

function updateRescue(dt) {
  if (!CONST.HUMAN_RESCUE_ENABLED || STATE.state !== "playing") return;

  // 安全高度より下の行をチェック
  for (let y = Math.floor(STATE.renderSafeLine); y < CONST.TOTAL_ROWS; y++) {
    if (checkRowFullCracked(y)) {
      // その行（ブロックの上）に立っている人間をカウント
      let humansAtRow = STATE.humans.filter(h => {
        let gy = Math.floor((h.y + CONST.HUMAN_LOGICAL_SIZE - 2) / CONST.SIZE);
        return gy === y + 1; // y行目のブロックの上に立っているのはy+1行目
      });

      if (humansAtRow.length > 0) {
        rowFullTimers[y] = (rowFullTimers[y] || 0) + dt;
        if (rowFullTimers[y] >= CONST.HUMAN_RESCUE_TIME) {
          // 救済発動！
          let victim = humansAtRow[0];
          if (victim.state !== 'climb_cracked' && victim.state !== 'shock') {
            victim.state = 'climb_cracked';
            STATE.showDebugMessage(`RESCUE: Floor ${y} opened by Human ${victim.id}`);
            rowFullTimers[y] = 0; // 一人発動したらリセット
          }
        }
      } else {
        rowFullTimers[y] = 0;
      }
    } else {
      rowFullTimers[y] = 0;
    }
  }
}
function checkBombDamage(bx, by) {
  const worldX = bx * CONST.SIZE + CONST.OFFSET_X + CONST.SIZE / 2;
  const worldY = by * CONST.SIZE + CONST.SIZE / 2;
  const radius = CONST.SIZE * 1.5; // 爆発半径
  
  for (let h of STATE.humans) {
    if (h.isDead) continue;
    let dx = h.x - worldX;
    let dy = (h.y + CONST.HUMAN_LOGICAL_SIZE / 2) - worldY;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      h.die('bomb');
    }
  }
}
