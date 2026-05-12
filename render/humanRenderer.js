import * as CONST from '../data/constants.js';
import * as STATE from '../core/stateManager.js';
import * as WORLD from '../world/world.js';

let humanAtlas = null;
const ATLAS_W = 64;
const ATLAS_H = 64;

const P_BODY = {x: 0, y: 0, w: 12, h: 12};
const P_HAND = {x: 12, y: 0, w: 8, h: 8};
const P_FOOT_N = {x: 20, y: 0, w: 4, h: 4};
const P_FOOT_C = {x: 26, y: 0, w: 8, h: 10};

let speechSprites = {}; // { text: {x, y, w, h} }

export function initHumanAtlas() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;

  // A: Body (6 -> 4)
  ctx.beginPath();
  ctx.arc(6, 6, 4, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  // B: Hand (3 -> 2)
  ctx.beginPath();
  ctx.arc(16, 3, 2, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  // C: Foot Normal (3 -> 2)
  ctx.beginPath();
  ctx.arc(22, 3, 2, Math.PI, 0); 
  ctx.lineTo(24, 3); ctx.lineTo(20, 3);
  ctx.fill(); ctx.stroke();

  // D: Foot Climb
  ctx.beginPath();
  ctx.ellipse(30, 4, 1.5, 3, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  // Speech Sprites
  const texts = ["Σ"];
  Object.values(CONST.HUMAN_SPEECH_DICT).forEach(list => texts.push(...list));
  
  let currentX = 0;
  let currentY = 20;
  const fontSize = CONST.HUMAN_RENDER_CONFIG.SPEECH_FONT_SIZE;
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  texts.forEach(t => {
    const isSigma = t === "Σ";
    const fullText = isSigma ? t : `＼${t}／`;
    const metrics = ctx.measureText(fullText);
    const w = Math.ceil(metrics.width) + 8;
    const h = (isSigma ? CONST.HUMAN_RENDER_CONFIG.SIGMA_SIZE : fontSize) + 8;

    if (currentX + w > 256) {
      currentX = 0;
      currentY += h;
    }

    ctx.save();
    ctx.translate(currentX + w/2, currentY + h/2);
    if (isSigma) {
      ctx.rotate(CONST.HUMAN_RENDER_CONFIG.SIGMA_ROTATION * Math.PI / 180);
    }
    
    // Outline
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeText(fullText, -w/2 + 4, -h/2 + 4);
    // Fill
    ctx.fillStyle = "#FFF";
    ctx.fillText(fullText, -w/2 + 4, -h/2 + 4);
    ctx.restore();

    speechSprites[t] = {x: currentX, y: currentY, w: w, h: h};
    currentX += w;
  });

  humanAtlas = canvas;
}

function drawPart(ctx, part, dx, dy, dw, dh) {
  ctx.drawImage(humanAtlas, part.x, part.y, part.w, part.h, dx, dy, dw, dh);
}

export function drawHumans(ctx, screenYOffset, humansList = null) {
  if (!humanAtlas) initHumanAtlas();

  let list = humansList || STATE.humans;
  let sortedHumans = [...list].sort((a, b) => {
    let za = a.y;
    let zb = b.y;
    if (a.state === 'climb') za += 0.1;
    if (b.state === 'climb') zb += 0.1;
    return za - zb;
  });

  for (let h of sortedHumans) {
    let px = h.x;
    // h.y is the top of the human cell. Feet are at h.y + CONST.HUMAN_LOGICAL_SIZE
    let py = (h.y + CONST.HUMAN_LOGICAL_SIZE) - screenYOffset;
    let alpha = 1.0;
    if (h.isDead && h.deathTimer > 0) {
      alpha = Math.max(0, h.deathTimer / CONST.HUMAN_DEATH_FADE_SEC);
    }
    
    let bodyR = CONST.SIZE * CONST.HUMAN_RADIUS;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.imageSmoothingEnabled = false; // ボヤけ防止
    ctx.translate(px, py);

    let t = h.animTime * 10;
    const cfg = CONST.HUMAN_RENDER_CONFIG;
    
    if (h.state === 'walk' || h.state === 'escape' || h.state === 'lost') {
      let speed = h.state === 'escape' ? 2 : 1;
      let bounce = Math.abs(Math.sin(t * speed)) * cfg.BOUNCE_AMP;
      
      let f1y = Math.sin(t * speed) * 2;
      let f2y = Math.sin(t * speed + Math.PI) * 2;
      
      // Z-Order: Hand -> Body -> Foot
      drawPart(ctx, P_HAND, -bodyR - cfg.HAND_X_OFF, bodyR * cfg.HAND_Y_OFF_B - bounce, cfg.HAND_SIZE, cfg.HAND_SIZE);
      drawPart(ctx, P_HAND, bodyR - (cfg.HAND_X_OFF/2), bodyR * cfg.HAND_Y_OFF_B - bounce, cfg.HAND_SIZE, cfg.HAND_SIZE);

      drawPart(ctx, P_BODY, -bodyR, -bodyR*2 - bounce, bodyR*2 * (cfg.BODY_SIZE_RATIO/2), bodyR*2 * (cfg.BODY_SIZE_RATIO/2));

      drawPart(ctx, P_FOOT_N, -bodyR/2 - cfg.FOOT_X_OFF, cfg.FOOT_Y_OFF + f1y, cfg.FOOT_W, cfg.FOOT_H);
      drawPart(ctx, P_FOOT_N, bodyR/2 - cfg.FOOT_X_OFF, cfg.FOOT_Y_OFF + f2y, cfg.FOOT_W, cfg.FOOT_H);

      if ((h.state === 'escape' || h.state === 'lost') && Math.sin(t) > 0) {
         ctx.save();
         ctx.translate(bodyR * cfg.SWEAT_X_OFF, bodyR * cfg.SWEAT_Y_OFF);
         ctx.rotate(cfg.SWEAT_ROTATION * Math.PI / 180);
         ctx.font = "12px sans-serif";
         ctx.fillText(cfg.SWEAT_TEXT, 0, 0);
         ctx.restore();
      }
    } else if (h.state === 'shock') {
      // ショック：静止
      drawPart(ctx, P_HAND, -bodyR - cfg.HAND_X_OFF, bodyR * cfg.HAND_Y_OFF_B, cfg.HAND_SIZE, cfg.HAND_SIZE);
      drawPart(ctx, P_HAND, bodyR - (cfg.HAND_X_OFF/2), bodyR * cfg.HAND_Y_OFF_B, cfg.HAND_SIZE, cfg.HAND_SIZE);
      drawPart(ctx, P_BODY, -bodyR, -bodyR*2, bodyR*2 * (cfg.BODY_SIZE_RATIO/2), bodyR*2 * (cfg.BODY_SIZE_RATIO/2));
      drawPart(ctx, P_FOOT_N, -bodyR/2 - cfg.FOOT_X_OFF, cfg.FOOT_Y_OFF, cfg.FOOT_W, cfg.FOOT_H);
      drawPart(ctx, P_FOOT_N, bodyR/2 - cfg.FOOT_X_OFF, cfg.FOOT_Y_OFF, cfg.FOOT_W, cfg.FOOT_H);

      // Σマークを表示
      let s = speechSprites["Σ"];
      if (s) {
        ctx.drawImage(humanAtlas, s.x, s.y, s.w, s.h, -s.w/2, -bodyR*4, s.w, s.h);
      }
    } else if (h.isDead) {
      if (h.deathTimer > 0) {
        if (h.deathType === 'bomb') {
          for (let p of h.deathParts) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            drawPart(ctx, P_BODY, -bodyR/2, -bodyR/2, bodyR, bodyR);
            ctx.restore();
          }
        } else if (h.deathType === 'drown') {
          ctx.filter = 'brightness(0.3)'; // 黒っぽく
          drawPart(ctx, P_BODY, -bodyR, -bodyR*2, bodyR*2 * (cfg.BODY_SIZE_RATIO/2), bodyR*2 * (cfg.BODY_SIZE_RATIO/2));
          ctx.filter = 'none';
        } else if (h.deathType === 'fall') {
          let squash = Math.max(0.1, h.deathTimer / CONST.HUMAN_DEATH_FADE_SEC);
          ctx.scale(1.5, squash);
          drawPart(ctx, P_BODY, -bodyR, -bodyR*2, bodyR*2 * (cfg.BODY_SIZE_RATIO/2), bodyR*2 * (cfg.BODY_SIZE_RATIO/2));
          // 煙
          if (h.deathTimer > CONST.HUMAN_DEATH_FADE_SEC * 0.7) {
             ctx.fillStyle = "rgba(200,200,200,0.5)";
             for(let i=0; i<3; i++) {
                ctx.beginPath(); ctx.arc((i-1)*10, -10, 8, 0, Math.PI*2); ctx.fill();
             }
          }
        }
      }
      if (h.skullTimer > 0) {
        let sAlpha = h.skullTimer / CONST.HUMAN_DEATH_SKULL_SEC;
        let sSize = (1.0 + (1.0 - sAlpha)) * CONST.SIZE;
        let sY = -(1.0 - sAlpha) * CONST.SIZE * 3;
        ctx.globalAlpha = sAlpha;
        ctx.font = `bold ${sSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("💀", 0, sY);
      }
    } else if (h.state === 'climb' || h.state === 'climb_cracked') {
      let sway = Math.sin(t * 1.5) * cfg.SWAY_AMP;

      let f1y = Math.sin(t * 1.5) * 4;
      let f2y = Math.sin(t * 1.5 + Math.PI) * 4;
      
      // Z-Order: Hand -> Body -> Foot
      let h1y = f2y; 
      let h2y = f1y;
      drawPart(ctx, P_HAND, -bodyR - cfg.CLIMB_HAND_X_OFF + sway, bodyR * cfg.CLIMB_HAND_Y_OFF + h1y, cfg.HAND_SIZE, cfg.HAND_SIZE);
      drawPart(ctx, P_HAND, bodyR - (cfg.CLIMB_HAND_X_OFF * 2) + sway, bodyR * cfg.CLIMB_HAND_Y_OFF + h2y, cfg.HAND_SIZE, cfg.HAND_SIZE);

      drawPart(ctx, P_BODY, -bodyR + sway, -bodyR*2, bodyR*2 * (cfg.BODY_SIZE_RATIO/2), bodyR*2 * (cfg.BODY_SIZE_RATIO/2));

      drawPart(ctx, P_FOOT_C, -bodyR/2 - cfg.CLIMB_FOOT_X_OFF + sway, bodyR * cfg.CLIMB_FOOT_Y_OFF + f1y, cfg.CLIMB_FOOT_W, cfg.CLIMB_FOOT_H);
      drawPart(ctx, P_FOOT_C, bodyR/2 - cfg.CLIMB_FOOT_X_OFF + sway, bodyR * cfg.CLIMB_FOOT_Y_OFF + f2y, cfg.CLIMB_FOOT_W, cfg.CLIMB_FOOT_H);
      
      if (Math.sin(t*2) > 0) {
         ctx.save();
         ctx.translate(bodyR * cfg.SWEAT_X_OFF + sway, bodyR * cfg.SWEAT_Y_OFF);
         ctx.rotate(cfg.SWEAT_ROTATION * Math.PI / 180);
         ctx.font = "10px sans-serif";
         ctx.fillText(cfg.SWEAT_TEXT, 0, 0);
         ctx.restore();
      }
    } else if (h.state === 'fall' || h.state === 'drown') {
      let flap = Math.sin(t * 3) > 0 ? -1 : 1;
      
      // Z-Order: Hand -> Body -> Foot
      drawPart(ctx, P_HAND, -bodyR - cfg.FALL_HAND_X_OFF/2, -bodyR*2 + flap*4, cfg.HAND_SIZE, cfg.HAND_SIZE);
      drawPart(ctx, P_HAND, bodyR - 2, -bodyR*2 - flap*4, cfg.HAND_SIZE, cfg.HAND_SIZE);

      drawPart(ctx, P_BODY, -bodyR, -bodyR*2, bodyR*2, bodyR*2);

      drawPart(ctx, P_FOOT_N, -bodyR/2 - cfg.FALL_FOOT_X_OFF/2 + flap*2, -2, cfg.FOOT_W, cfg.FOOT_H);
      drawPart(ctx, P_FOOT_N, bodyR/2 - cfg.FALL_FOOT_X_OFF/2 - flap*2, -2, cfg.FOOT_W, cfg.FOOT_H);
    } else if (h.state === 'fell_over') {
      // Z-Order: Hand -> Body -> Foot
      drawPart(ctx, P_HAND, -bodyR - cfg.FELL_OVER_HAND_X_OFF/2, -bodyR*0.5, cfg.HAND_SIZE, cfg.HAND_SIZE);
      drawPart(ctx, P_HAND, bodyR - cfg.FELL_OVER_HAND_X_OFF/2, -bodyR*0.5, cfg.HAND_SIZE, cfg.HAND_SIZE);

      drawPart(ctx, P_BODY, -bodyR, -bodyR, bodyR*2, bodyR*2);

      drawPart(ctx, P_FOOT_N, -bodyR/2 - cfg.FELL_OVER_FOOT_X_OFF/2, -bodyR*1.5, cfg.FOOT_W, cfg.FOOT_H);
      drawPart(ctx, P_FOOT_N, bodyR/2 - cfg.FELL_OVER_FOOT_X_OFF/2, -bodyR*1.5, cfg.FOOT_W, cfg.FOOT_H);
    } else if (h.state === 'goal') {
      const sub = h.goalSubState || 0;
      let bounce = 0;
      let h1y = 0, h2y = 0;
      let f1y = 0, f2y = 0;
      let rot = 0;

      if (sub === 0) { // Wave
        h2y = -bodyR * 1.5; // 右手上げ
      } else if (sub === 1 || sub === 4) { // Jump / Joy
        bounce = Math.abs(Math.sin(t * 2)) * 8;
        h1y = -bodyR * 1.5;
        h2y = -bodyR * 1.5;
      } else if (sub === 3) { // Walk
        bounce = Math.abs(Math.sin(t)) * cfg.BOUNCE_AMP;
        f1y = Math.sin(t) * 4;
        f2y = -Math.sin(t) * 4;
      }

      ctx.save();
      if (sub === 2) { // Dance
        // Y軸回転（左右反転）をシミュレート
        ctx.scale(Math.cos(t * 0.8), 1);
      }

      ctx.translate(0, -bounce);
      // Z-Order: Hand -> Body -> Foot
      drawPart(ctx, P_HAND, -bodyR - cfg.HAND_X_OFF, cfg.HAND_Y_OFF_B * bodyR + h1y, cfg.HAND_SIZE, cfg.HAND_SIZE);
      drawPart(ctx, P_HAND, bodyR - cfg.HAND_X_OFF, cfg.HAND_Y_OFF_B * bodyR + h2y, cfg.HAND_SIZE, cfg.HAND_SIZE);
      drawPart(ctx, P_BODY, -bodyR, -bodyR * 2, bodyR * 2, bodyR * 2);
      drawPart(ctx, P_FOOT_N, -bodyR / 2 - cfg.FOOT_X_OFF, cfg.FOOT_Y_OFF + f1y, cfg.FOOT_W, cfg.FOOT_H);
      drawPart(ctx, P_FOOT_N, bodyR / 2 - cfg.FOOT_X_OFF, cfg.FOOT_Y_OFF + f2y, cfg.FOOT_W, cfg.FOOT_H);
      ctx.restore();
    }

    if (h.isVIP) {
      ctx.fillStyle = "gold";
      ctx.fillRect(-4, -bodyR*2 - 6, 8, 4);
    }

    // セリフのスプライト描画
    if (h.speechTimer > 0 && speechSprites[h.speechText]) {
      const s = speechSprites[h.speechText];
      ctx.drawImage(humanAtlas, s.x, s.y, s.w, s.h, -s.w/2, -bodyR*2 - 15, s.w, s.h);
    } else if (h.state === 'escape' && Math.random() < 0.1) {
      const s = speechSprites["Σ"];
      if (s) {
        // 体の中心(0, -bodyR) からのオフセット
        const ox = CONST.HUMAN_RENDER_CONFIG.SIGMA_OFFSET_X;
        const oy = CONST.HUMAN_RENDER_CONFIG.SIGMA_OFFSET_Y;
        ctx.drawImage(humanAtlas, s.x, s.y, s.w, s.h, ox - s.w/2, -bodyR + oy - s.h/2, s.w, s.h);
      }
    }

    ctx.restore();
  }
}
