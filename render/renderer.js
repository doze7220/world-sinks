import * as CONST from '../data/constants.js';
import * as WORLD from '../world/world.js';
import * as STATE from '../core/stateManager.js';
import * as EDITOR from '../ui/humanEditor.js';
import { SYSTEM_TEXT as TEXT } from '../ui/text_system.js';
import * as BLOCK from '../entities/block.js';
import { drawHumans } from './humanRenderer.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let clouds = [];
export function resetClouds() {
  clouds = Array.from({ length: CONST.CLOUD_COUNT }, () => ({
    x: Math.random() * CONST.CLOUD_RANDOM_X_MAX,
    y: Math.random() * CONST.TOTAL_ROWS,
    s: CONST.CLOUD_SIZE_MIN + Math.random() * CONST.CLOUD_SIZE_RANGE
  }));
}
resetClouds();

export const screenY = (y) => (y - WORLD.cameraY) * CONST.SIZE;

export function radarYByMeters(m) {
  const clamped = Math.max(0, Math.min(CONST.GOAL_METERS, m));
  const innerTop = CONST.RADAR_V_PAD;
  const innerBottom = CONST.RADAR_CANVAS_H - CONST.RADAR_V_PAD;
  const innerH = Math.max(1, innerBottom - innerTop);
  return innerBottom - (clamped / CONST.GOAL_METERS) * innerH;
}

export function drawSkyAndClouds(targetCtx, width, height, xOffset = 0, totalWidth = width) {
  let brightness = 1.0;
  const distance = WORLD.heightMeters() - (WORLD.water * CONST.METERS_PER_ROW);
  if (distance < CONST.DANGER_PROXIMITY_BLOCKS * CONST.METERS_PER_ROW) {
    brightness = CONST.PROXIMITY_BRIGHTNESS_DROP;
  }

  if (STATE.floodPhase === "countdown") {
    const remain = Math.max(0, STATE.floodCountdownEnd - STATE.elapsed);
    const progress = 1.0 - (remain / CONST.DANGER_COUNTDOWN_SECONDS);
    brightness *= (1.0 - progress * 0.9);
  } else if (STATE.currentPhase === 2) brightness *= 0.8;
  else if (STATE.currentPhase === 3) brightness *= 0.7;
  else if (STATE.currentPhase === 4) brightness *= 0.6;
  
  brightness = Math.max(0.1, brightness);

  targetCtx.fillStyle = darkenColor(CONST.SKY_TOP, brightness);
  if (STATE.thunderFlashTimer > 0) targetCtx.fillStyle = "#FFFFFF";
  targetCtx.fillRect(-CONST.SKY_RECT_OFFSET, -CONST.SKY_RECT_OFFSET, width + CONST.SKY_RECT_OFFSET * 2, height + CONST.SKY_RECT_OFFSET * 2);

  targetCtx.save();
  targetCtx.globalAlpha = CONST.CLOUD_ALPHA * brightness;
  const cloudGray = Math.floor(255 * brightness);
  targetCtx.fillStyle = `rgb(${cloudGray},${cloudGray},${cloudGray})`;

  const nowSec = performance.now() / 1000;
  for (const c of clouds) {
    const wrapW = Math.max(1, totalWidth);
    const worldX = (c.x + nowSec * CONST.CLOUD_DRIFT_PX_PER_SEC) % (wrapW + c.s * 2) - c.s;
    const x = worldX - xOffset;
    const y = ((c.y - WORLD.cameraY * CONST.CLOUD_PARALLAX) * CONST.SIZE);
    const py = y % (height + c.s * 4);
    const cy = py - c.s * 2;
    if (cy < CONST.CLOUD_Y_CLIP_MIN || cy > CONST.CLOUD_Y_CLIP_MAX) continue;
    if (x < -c.s * 2 || x > width + c.s * 2) continue;

    const s = c.s;
    targetCtx.beginPath();
    targetCtx.arc(x, cy, s * 0.55, 0, Math.PI * 2);
    targetCtx.arc(x + s * 0.55, cy + s * 0.05, s * 0.7, 0, Math.PI * 2);
    targetCtx.arc(x + s * 1.15, cy, s * 0.55, 0, Math.PI * 2);
    targetCtx.arc(x + s * 0.35, cy - s * 0.2, s * 0.5, 0, Math.PI * 2);
    targetCtx.arc(x + s * 0.9, cy - s * 0.22, s * 0.5, 0, Math.PI * 2);
    targetCtx.fill();
  }
  targetCtx.restore();
}

function darkenColor(hex, factor) {
  const r = Math.floor(parseInt(hex.slice(1, 3), 16) * factor);
  const g = Math.floor(parseInt(hex.slice(3, 5), 16) * factor);
  const b = Math.floor(parseInt(hex.slice(5, 7), 16) * factor);
  return `rgb(${r},${g},${b})`;
}

export function drawRain() {
  ctx.save();
  ctx.strokeStyle = "rgba(200, 220, 255, 0.4)";
  ctx.lineWidth = 1;
  STATE.rainParticles.forEach(p => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + p.len * 0.1, p.y + p.len);
    ctx.stroke();
  });
  ctx.restore();
}

export function drawWater() {
  const wy = screenY(WORLD.waterWorldY());
  const waterBaseY = wy;
  
  let amp = CONST.BASE_WAVE_AMPLITUDE;
  const distance = WORLD.heightMeters() - (WORLD.water * CONST.METERS_PER_ROW);
  if (distance < CONST.DANGER_PROXIMITY_BLOCKS * CONST.METERS_PER_ROW) {
    amp = CONST.DANGER_WAVE_AMPLITUDE;
  }
  if (STATE.currentPhase >= 3) amp = CONST.WATER_DANGER_WAVE_AMP;
  if (STATE.currentPhase === 4) amp = CONST.WATER_DANGER_WAVE_AMP * (1 + (Math.random() - 0.5) * 0.4);

  const phase1 = STATE.elapsed * (Math.PI * 2 / CONST.WAVE_PERIOD_1);
  const phase2 = STATE.elapsed * (Math.PI * 2 / CONST.WAVE_PERIOD_2);

  const grad = ctx.createLinearGradient(0, waterBaseY - amp, 0, CONST.MAIN_H);
  const toRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  grad.addColorStop(0, toRGBA(CONST.WATER_TOP_COLOR, CONST.WATER_ALPHA));
  grad.addColorStop(0.5, toRGBA(CONST.WATER_MID_COLOR, CONST.WATER_ALPHA));
  grad.addColorStop(1, toRGBA(CONST.WATER_BOTTOM_COLOR, CONST.WATER_ALPHA));

  ctx.save();
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(-50, CONST.MAIN_H + 50);
  ctx.lineTo(-50, waterBaseY);
  for (let x = -50; x <= CONST.TOTAL_W + 50; x += 5) {
    const wave = Math.sin((x / CONST.WATER_WAVE_X_DIV_1) + phase1) * amp + Math.cos((x / CONST.WATER_WAVE_X_DIV_2) + phase2) * (amp * 0.3);
    ctx.lineTo(x, waterBaseY + wave);
  }
  ctx.lineTo(CONST.TOTAL_W + 50, CONST.MAIN_H + 50);
  ctx.closePath();
  ctx.fill();

  if (STATE.state === "playing" || STATE.state === "gameover") {
    ctx.strokeStyle = CONST.WATER_HIGHLIGHT_COLOR;
    ctx.lineWidth = CONST.WATER_HIGHLIGHT_THICKNESS;
    ctx.beginPath();
    for (let x = -50; x <= CONST.TOTAL_W + 50; x += 5) {
      const wave = Math.sin((x / 80) + phase1) * amp + Math.cos((x / 50) + phase2) * (amp * 0.3);
      if (x === -50) ctx.moveTo(x, waterBaseY + wave);
      else ctx.lineTo(x, waterBaseY + wave);
    }
    ctx.stroke();

    if (STATE.state !== "gameover") {
      ctx.font = "bold 12px sans-serif";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(0,0,0,0.85)";
      ctx.fillStyle = CONST.WATER_LINE;
      ctx.strokeText(TEXT.WATER_LEVEL, CONST.WATER_LABEL_X, waterBaseY - CONST.WATER_LABEL_Y_OFF);
      ctx.fillText(TEXT.WATER_LEVEL, CONST.WATER_LABEL_X, waterBaseY - CONST.WATER_LABEL_Y_OFF);
      ctx.strokeText(WORLD.waterMeters() + "m", CONST.WATER_METERS_X, waterBaseY - CONST.WATER_METERS_Y_OFF);
      ctx.fillText(WORLD.waterMeters() + "m", CONST.WATER_METERS_X, waterBaseY - CONST.WATER_METERS_Y_OFF);
    }
  }
  ctx.restore();
}

export function drawCountdownUI() {
  if (STATE.state !== "playing") return;

  const remain = (STATE.floodPhase === "countdown") 
    ? Math.max(0, STATE.floodCountdownEnd - STATE.elapsed)
    : Math.max(0, WORLD.heightMeters() / CONST.METERS_PER_ROW / CONST.WATER_SPEED - STATE.elapsed);

  ctx.save();
  let color = CONST.UI_COUNTDOWN_NORMAL_COLOR;
  let scale = 1.0;
  let isDanger = (STATE.floodPhase === "countdown" && remain <= CONST.DANGER_COUNTDOWN_SECONDS);
  
  if (isDanger) {
    color = CONST.UI_COUNTDOWN_DANGER_COLOR;
    const t = (STATE.elapsed % CONST.UI_COUNTDOWN_ANIM_PERIOD) / CONST.UI_COUNTDOWN_ANIM_PERIOD;
    const s = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
    scale = CONST.UI_COUNTDOWN_SCALE_MIN + s * (CONST.UI_COUNTDOWN_SCALE_MAX - CONST.UI_COUNTDOWN_SCALE_MIN);
  }

  const cx = CONST.UI_COUNTDOWN_X + CONST.UI_COUNTDOWN_CENTER_OFFSET_X;
  const cy = CONST.MAIN_H - CONST.UI_COUNTDOWN_Y - CONST.UI_COUNTDOWN_CENTER_OFFSET_Y;
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = CONST.UI_COUNTDOWN_FONT;
  
  ctx.lineWidth = CONST.UI_COUNTDOWN_TEXT_OUTLINE_WIDTH;
  ctx.strokeStyle = CONST.UI_COUNTDOWN_TEXT_OUTLINE_COLOR;
  const text = `${TEXT.FLOOD_COUNTDOWN_PREFIX} ${remain.toFixed(1)}${TEXT.FLOOD_COUNTDOWN_SUFFIX}`;
  ctx.strokeText(text, 0, 0);
  
  ctx.fillStyle = color;
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

export function drawCautionUI() {
  if (STATE.floodPhase !== "blink") return;

  const t = (CONST.UI_CAUTION_ANIM_DURATION + CONST.UI_CAUTION_FADE_OUT_DURATION) - STATE.cautionAnimTimer;
  let scale = 1.0;
  let opacity = 1.0;

  if (t < CONST.UI_CAUTION_ANIM_DURATION) {
    const p = t / CONST.UI_CAUTION_ANIM_DURATION;
    const easeOut = 1 - Math.pow(1 - p, 3);
    scale = 1.5 - 0.5 * easeOut;
    opacity = easeOut;
  } else {
    opacity = 1.0 - (t - CONST.UI_CAUTION_ANIM_DURATION) / CONST.UI_CAUTION_FADE_OUT_DURATION;
  }

  ctx.save();
  ctx.globalAlpha = opacity;
  const cx = CONST.OFFSET_X + (CONST.COLS * CONST.SIZE) / 2;
  const cy = CONST.MAIN_H / 2;

  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  ctx.font = CONST.UI_CAUTION_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.lineWidth = CONST.UI_CAUTION_STOKE_WIDTH;
  ctx.strokeStyle = TEXT.UI_CAUTION_STOKE_COLOR;
  ctx.strokeText(TEXT.CAUTION_TEXT, 0, 0);

  ctx.fillStyle = TEXT.UI_CAUTION_COLOR;
  ctx.fillText(TEXT.CAUTION_TEXT, 0, 0);

  ctx.restore();
}

export function drawRadar() {
  if (STATE.state === "gameover") return;

  const rctx = ctx;
  const radarHeight = CONST.RADAR_CANVAS_H;
  rctx.save();
  rctx.translate(CONST.RADAR_X, 0);

  if (STATE.state === "title" || STATE.state === "intro") { rctx.restore(); return; }

  const rx0 = CONST.RADAR_PAD;
  const innerTop = CONST.RADAR_V_PAD;
  const innerBottom = radarHeight - CONST.RADAR_V_PAD;
  const innerH = Math.max(1, innerBottom - innerTop);

  rctx.fillStyle = "rgba(0,0,0,0.35)";
  rctx.fillRect(rx0, innerTop, CONST.RADAR_INNER_W, innerH);
  rctx.strokeStyle = CONST.RADAR_BORDER_COLOR;
  rctx.strokeRect(rx0, innerTop, CONST.RADAR_INNER_W, innerH);

  const showDetails = (STATE.state === "playing" || STATE.state === "gameover");

  if (STATE.radarAbstractionMode) {
    for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
      let count = 0;
      for (let x = 0; x < CONST.COLS; x++) {
        if (WORLD.grid[y][x] && WORLD.grid[y][x] !== 9) count++;
      }
      if (count > 0) {
        const m = (CONST.TOTAL_ROWS - y - 1) * CONST.METERS_PER_ROW;
        if (m < 0 || m > CONST.GOAL_METERS) continue;
        const ry = radarYByMeters(m);
        const rh = Math.max(1, innerH / CONST.GOAL_METERS * CONST.METERS_PER_ROW);
        let opacity = 0.2; if (count >= 5) opacity = 0.8; else if (count >= 3) opacity = 0.5;
        rctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        rctx.fillRect(rx0, ry, CONST.RADAR_INNER_W, rh);
      }
    }
  } else {
    const sx = CONST.RADAR_INNER_W / CONST.COLS;
    for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
      for (let x = 0; x < CONST.COLS; x++) {
        if (WORLD.grid[y][x] && WORLD.grid[y][x] !== 9) {
          const m = (CONST.TOTAL_ROWS - y - 1) * CONST.METERS_PER_ROW;
          if (m < 0 || m > CONST.GOAL_METERS) continue;
          const ry = radarYByMeters(m);
          const rh = Math.max(1, innerH / CONST.GOAL_METERS * CONST.METERS_PER_ROW);
          let c = (typeof WORLD.grid[y][x] === 'object') ? WORLD.grid[y][x].color : WORLD.grid[y][x];
          rctx.fillStyle = CONST.COLORS[c];
          rctx.fillRect(rx0 + x * sx, ry, sx, rh);
        }
      }
    }
  }

  // 人間の表示 (リアルタイム)
  const sx_h = CONST.RADAR_INNER_W / CONST.COLS;
  const rh_h = Math.max(1, (innerH / CONST.GOAL_METERS) * CONST.METERS_PER_ROW);
  for (let h of STATE.humans) {
    if (h.isDead) continue;
    let gx = (h.x - CONST.OFFSET_X) / CONST.SIZE;
    let hm = (CONST.TOTAL_ROWS - (h.y / CONST.SIZE) - 1) * CONST.METERS_PER_ROW;
    if (hm < 0 || hm > CONST.GOAL_METERS) continue;
    let ry = radarYByMeters(hm);
    rctx.fillStyle = h.isVIP ? "gold" : "#FFF";
    rctx.beginPath();
    rctx.arc(rx0 + gx * sx_h + sx_h/2, ry + rh_h/2, sx_h * CONST.RADAR_HUMAN_SIZE_RATIO, 0, Math.PI * 2);
    rctx.fill();
    rctx.strokeStyle = "#000";
    rctx.lineWidth = 1;
    rctx.stroke();
  }

  const drawLine = (m, color, label) => {
    const ry = radarYByMeters(m);
    const lineW = CONST.RADAR_INNER_W + CONST.RADAR_LINE_EXT;
    const labelX = rx0 + CONST.RADAR_INNER_W + CONST.RADAR_LABEL_EXT;
    rctx.strokeStyle = color; rctx.lineWidth = CONST.RADAR_LINE_WIDTH;
    rctx.beginPath(); rctx.moveTo(rx0, ry); rctx.lineTo(rx0 + lineW, ry); rctx.stroke();
    rctx.fillStyle = color; rctx.font = "11px sans-serif"; rctx.textAlign = "right";
    rctx.fillText(`${label} ${Math.round(m)}m`, labelX, ry - CONST.RADAR_LABEL_Y_OFF);
  };

  if (showDetails) {
    drawLine(CONST.GOAL_METERS, CONST.GOAL_LINE, TEXT.GOAL);
    const renderMeters = Math.max(0, (CONST.TOTAL_ROWS - STATE.renderSafeLine - 2) * CONST.METERS_PER_ROW);
    drawLine(renderMeters, CONST.SAFE_LINE, TEXT.SAFE_HEIGHT);
    drawLine(WORLD.waterMeters(), CONST.WATER_LINE, TEXT.WATER_LEVEL);

    const cy1 = radarYByMeters((CONST.TOTAL_ROWS - WORLD.cameraY - 1) * CONST.METERS_PER_ROW);
    const cy2 = radarYByMeters((CONST.TOTAL_ROWS - (WORLD.cameraY + CONST.ROWS) - 1) * CONST.METERS_PER_ROW);
    rctx.fillStyle = CONST.RADAR_VIEW_BOX_COLOR;
    rctx.fillRect(rx0, cy1, CONST.RADAR_INNER_W, cy2 - cy1);
    rctx.strokeStyle = CONST.RADAR_VIEW_BOX_BORDER_COLOR;
    rctx.strokeRect(rx0, cy1, CONST.RADAR_INNER_W, cy2 - cy1);
  }
  // Dead humans X marks
  STATE.deadHumans.forEach(h => {
    let hm = (CONST.TOTAL_ROWS - (h.y / CONST.SIZE) - 1) * CONST.METERS_PER_ROW;
    let ry = radarYByMeters(hm);
    let rx = rx0 + ((h.x - CONST.OFFSET_X) / (CONST.COLS * CONST.SIZE)) * CONST.RADAR_INNER_W;
    
    if (ry > innerTop && ry < innerBottom) {
      ctx.save();
      ctx.strokeStyle = "#000"; ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(rx - 3, ry - 3); ctx.lineTo(rx + 3, ry + 3);
      ctx.moveTo(rx + 3, ry - 3); ctx.lineTo(rx - 3, ry + 3);
      ctx.stroke();
      ctx.strokeStyle = "#f00"; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rx - 3, ry - 3); ctx.lineTo(rx + 3, ry + 3);
      ctx.moveTo(rx + 3, ry - 3); ctx.lineTo(rx - 3, ry + 3);
      ctx.stroke();
      ctx.restore();
    }
  });

  rctx.restore();
}

function drawSurvivalList() {
  const startX = CONST.SURVIVAL_LIST_X;
  const startY = CONST.SURVIVAL_LIST_Y;
  const spacingX = CONST.SURVIVAL_LIST_SPACING_X;
  const spacingY = CONST.SURVIVAL_LIST_SPACING_Y;
  ctx.save();
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  STATE.allHumans.forEach((h, i) => {
    let col = i % 5;
    let row = Math.floor(i / 5);
    let x = startX + col * spacingX;
    let y = startY + row * spacingY;
    
    if (h.isDead && h.skullTimer <= 0) {
      ctx.fillStyle = "#444";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("●", x, y);
    } else {
      ctx.fillStyle = h.isVIP ? "#fb0" : "#fff";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("●", x, y);
    }
  });
  ctx.restore();
}

function drawNextBlock() {
  if (!STATE.nextPair) return;
  const boxX = CONST.NEXT_BOX_X, boxY = CONST.NEXT_BOX_Y, boxW = CONST.NEXT_BOX_W, boxH = CONST.NEXT_BOX_H;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.strokeRect(boxX, boxY, boxW, boxH);
  
  ctx.fillStyle = "#fff";
  ctx.font = "bold 10px sans-serif";
  ctx.fillText(TEXT.NEXT_LABEL, boxX + 5, boxY + 12);
  
  // Draw mini blocks
  const miniSize = CONST.NEXT_MINI_BLOCK_SIZE;
  const centerX = boxX + boxW / 2;
  const centerY = boxY + boxH / 2 + 5;
  
  const offsets = BLOCK.getShapeOffsets(STATE.nextPair.size, STATE.nextPair.rot);
  offsets.forEach((off, i) => {
    const colorIdx = STATE.nextPair.c[i];
    ctx.fillStyle = CONST.COLORS[colorIdx];
    const px = centerX + (off[0] - 0.5) * miniSize;
    const py = centerY + (off[1] - 0.5) * miniSize;
    ctx.fillRect(px, py, miniSize, miniSize);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.strokeRect(px, py, miniSize, miniSize);
  });
  ctx.restore();
}

export function draw(dt = 0) {
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  if (STATE.state !== "gameover") ctx.translate(STATE.shakeOffset.x, STATE.shakeOffset.y);
  ctx.clearRect(-50, -50, CONST.TOTAL_W + 100, CONST.MAIN_H + 100);
  drawSkyAndClouds(ctx, CONST.TOTAL_W, CONST.MAIN_H, 0, CONST.TOTAL_W);
  drawRain();

  if (STATE.state === "title" || STATE.state === "intro") {
    drawOverlays(); 
  } else {
    if (STATE.state === "playing") {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(CONST.OFFSET_X, 0, CONST.COLS * CONST.SIZE, CONST.MAIN_H);
    }
    if (STATE.state !== "clear") {
      let gy = screenY(CONST.TOTAL_ROWS - 1);
      ctx.fillStyle = CONST.GROUND;
      ctx.fillRect(0, gy, CONST.TOTAL_W, CONST.SIZE);
    }
    drawGridBlocks();
    if (STATE.state === "playing" && BLOCK.pair) {
      BLOCK.renderBlocks(BLOCK.pair).forEach(b => {
        drawBlockCell(b.x * CONST.SIZE + CONST.OFFSET_X, screenY(b.y), CONST.COLORS[b.c], null, b.isCracked);
      });
    }
    if (STATE.state === "playing") drawGameGuides();
    drawWater();
    
    if (STATE.state === "playing" || STATE.state === "goal_wait") {
      drawCountdownUI();
      drawCautionUI();
      drawLimitWarning();
      drawFallingBombs();
      drawHumans(ctx, WORLD.cameraY * CONST.SIZE);
    }
    drawParticles();
    if (STATE.state === "clear") {
       drawHumans(ctx, WORLD.cameraY * CONST.SIZE);
       drawClearUI();
    }
    if (STATE.state === "gameover") {
      drawHumans(ctx, WORLD.cameraY * CONST.SIZE);
      drawGameOverUI();
    }
    drawDebugMessage();
  }
  ctx.restore();
  drawRadar();
  if (STATE.state !== "title" && STATE.state !== "intro") {
    drawSurvivalList();
    drawNextBlock();
  }
  drawFps();

  // ポーズ画面
  if (STATE.state === "human_edit") {
    EDITOR.updateEditor(dt);
    drawEditMode();
    return;
  }

  if (STATE.isPaused) {
    drawPauseUI();
  }
}

function drawPauseUI() {
  ctx.save();
  ctx.fillStyle = TEXT.PAUSE_OVERLAY_COLOR;
  ctx.fillRect(0, 0, CONST.TOTAL_W, CONST.MAIN_H);

  // 点滅ロジック
  const now = performance.now() / 1000;
  if ((now % CONST.UI_PAUSE_BLINK_PERIOD) < (CONST.UI_PAUSE_BLINK_PERIOD / 2)) {
    ctx.fillStyle = TEXT.PAUSE_TEXT_COLOR;
    ctx.font = CONST.UI_PAUSE_FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(TEXT.PAUSE_TEXT, CONST.TOTAL_W / 2, CONST.MAIN_H / 2);
  }
  ctx.restore();
}

function drawGameGuides() {
  ctx.strokeStyle = TEXT.UI_SIDE_LINE_COLOR; 
  ctx.lineWidth = CONST.UI_SIDE_LINE_WIDTH; 
  ctx.beginPath();
  ctx.moveTo(CONST.OFFSET_X, 0); ctx.lineTo(CONST.OFFSET_X, CONST.MAIN_H);
  ctx.moveTo(CONST.OFFSET_X + CONST.COLS * CONST.SIZE, 0); ctx.lineTo(CONST.OFFSET_X + CONST.COLS * CONST.SIZE, CONST.MAIN_H);
  ctx.stroke();

  const goalWorldY = (CONST.TOTAL_ROWS - 1) - (CONST.GOAL_METERS / CONST.METERS_PER_ROW);
  const gy = screenY(goalWorldY);
  ctx.strokeStyle = CONST.GOAL_LINE; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(CONST.OFFSET_X - CONST.GOAL_LINE_EXT, gy); ctx.lineTo(CONST.OFFSET_X + CONST.COLS * CONST.SIZE, gy); ctx.stroke();
  drawGuideText(TEXT.GOAL, CONST.GOAL_METERS + "m", 15, gy, CONST.GOAL_LINE);

  let sly = screenY(STATE.renderSafeLine + 1);
  ctx.strokeStyle = CONST.SAFE_LINE; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, sly); ctx.lineTo(CONST.OFFSET_X + CONST.COLS * CONST.SIZE, sly); ctx.stroke();
  const currentM = Math.max(0, Math.round((CONST.TOTAL_ROWS - STATE.renderSafeLine - 2) * CONST.METERS_PER_ROW));
  drawGuideText(TEXT.SAFE_HEIGHT, currentM + "m", 10, sly, CONST.SAFE_LINE);
}

function drawGuideText(label, value, x, y, color) {
  ctx.font = "10px sans-serif"; ctx.lineWidth = 3; ctx.strokeStyle = "rgba(0,0,0,0.85)"; ctx.fillStyle = color;
  ctx.strokeText(label, x, y - 15); ctx.fillText(label, x, y - 15);
  ctx.strokeText(value, x + 5, y - 2); ctx.fillText(value, x + 5, y - 2);
}

function drawLimitWarning() {
  if (STATE.state !== "playing") return;
  if (STATE.floodPhase === "none" && STATE.elapsed < STATE.limitWarningUntil) {
    ctx.save();
    ctx.font = "18px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const cx = CONST.OFFSET_X + (CONST.COLS * CONST.SIZE) / 2, cy = 240;
    const lh = 22;
    const totalH = (TEXT.LIMIT_WARNING_LINES.length - 1) * lh;
    TEXT.LIMIT_WARNING_LINES.forEach((line, i) => {
      const y = cy - totalH / 2 + i * lh;
      ctx.lineWidth = 4; ctx.strokeStyle = "rgba(0,0,0,0.85)";
      ctx.strokeText(line, cx, y);
      ctx.fillStyle = "#ffeb3b"; ctx.fillText(line, cx, y);
    });
    ctx.restore();
  }
}

function drawDebugMessage() {
  if (STATE.debugMessageTimer > 0) {
    ctx.save();
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = "#FF0000";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const cx = CONST.OFFSET_X + (CONST.COLS * CONST.SIZE) / 2;
    ctx.fillText(STATE.debugMessage, cx, 10);
    ctx.restore();
  }
}

function drawFallingBombs() {
  STATE.fallingBombs.forEach(b => {
    const px = b.x * CONST.SIZE + CONST.OFFSET_X;
    const py = screenY(b.y);
    drawBomb(px, py, b.timer);
  });
}

function drawFps() {
  ctx.save(); ctx.fillStyle = "#0f0"; ctx.font = "12px monospace"; ctx.textAlign = "right";
  ctx.fillText(`FPS: ${STATE.fps}`, CONST.TOTAL_W - 10, 20); ctx.restore();
}

function drawGridBlocks() {
  for (let y = 0; y < CONST.ROWS + 1; y++) {
    for (let x = 0; x < CONST.COLS; x++) {
      let gy = y + Math.floor(WORLD.cameraY);
      if (gy >= 0 && gy < CONST.TOTAL_ROWS && WORLD.grid[gy][x] && WORLD.grid[gy][x] !== CONST.BLOCK_TYPE_BOMB) {
        let cell = WORLD.grid[gy][x];
        let isBomb = (typeof cell === 'object' && cell.type === 'bomb');
        let color = isBomb ? null : (typeof cell === 'object' ? CONST.COLORS[cell.color] : CONST.COLORS[cell]);
        let offsetY = (typeof cell === 'object' && cell.renderOffsetY) ? cell.renderOffsetY * CONST.SIZE : 0;
        let px = x * CONST.SIZE + CONST.OFFSET_X;
        let py = screenY(gy) + offsetY;
        if (isBomb) drawBomb(px, py, cell.timer, cell.state === 'cracking' ? cell.crackTimer : null);
        else drawBlockCell(px, py, color, cell.state === 'cracking' ? cell.timer : null, cell.isCracked);
      }
    }
  }
}

function drawOverlays() {
  const cx = CONST.TOTAL_W / 2;
  if (STATE.state === "title") {
    ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.fillRect(0, 0, CONST.TOTAL_W, CONST.MAIN_H);
    const blink = (Math.floor(STATE.elapsed * 2) % 2) === 0;
    ctx.save(); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(20,20,40,0.95)"; ctx.fillStyle = "#f7f7ff";
    ctx.font = "64px sans-serif"; ctx.strokeText(TEXT.TITLE, cx, 200); ctx.fillText(TEXT.TITLE, cx, 200);
    if (blink) {
      ctx.font = "28px sans-serif"; ctx.lineWidth = 5; ctx.strokeStyle = "rgba(0,0,0,0.9)"; ctx.fillStyle = "#ffd54f";
      ctx.strokeText(TEXT.PUSH_SPACE, cx, 315); ctx.fillText(TEXT.PUSH_SPACE, cx, 315);
    }
    ctx.restore();
  } else if (STATE.state === "intro") {
    ctx.fillStyle = "rgba(0,0,0,0.48)"; ctx.fillRect(28, 28, CONST.TOTAL_W - 56, CONST.MAIN_H - 56);
    ctx.save(); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.lineWidth = 6; ctx.strokeStyle = "rgba(0,0,0,0.92)"; ctx.fillStyle = "#fff";
    ctx.font = "22px sans-serif"; let y = 50;
    for (const line of TEXT.INTRO_LINES) {
      if (line === "") { y += 10; continue; }
      ctx.strokeText(line, cx, y); ctx.fillText(line, cx, y); y += 30;
    }
    ctx.font = "15px sans-serif"; y += 8;
    for (const line of TEXT.INTRO_CONTROLS) {
      if (line === "") { y += 6; continue; }
      ctx.strokeText(line, cx, y); ctx.fillText(line, cx, y); y += 21;
    }
    const blink = (Math.floor(STATE.elapsed * 2) % 2) === 0;
    if (blink) {
      ctx.font = "26px sans-serif"; ctx.fillStyle = "#ffd54f";
      ctx.strokeText(TEXT.PUSH_SPACE, cx, CONST.MAIN_H - 50); ctx.fillText(TEXT.PUSH_SPACE, cx, CONST.MAIN_H - 50);
    }
    ctx.restore();
  }
}

function drawClearUI() {
  const t = Math.max(0, STATE.elapsed - STATE.clearStart);
  const p = Math.min(1, t / 2.4);
  const ease = 1 - Math.pow(1 - p, 3);
  const cx = CONST.OFFSET_X + (CONST.COLS * CONST.SIZE) / 2;
  const startY = CONST.CLEAR_UI_Y_START, targetY = CONST.CLEAR_UI_Y_TARGET;
  const y = startY + (targetY - startY) * ease;
  ctx.save(); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.lineWidth = 6; ctx.strokeStyle = "rgba(0,0,0,0.9)"; ctx.fillStyle = "#fff";
  ctx.font = "52px sans-serif"; ctx.strokeText(TEXT.GOAL_TEXT, cx, y - 35); ctx.fillText(TEXT.GOAL_TEXT, cx, y - 35);
  ctx.font = "28px sans-serif"; ctx.strokeText(TEXT.CONGRATULATIONS, cx, y + 30); ctx.fillText(TEXT.CONGRATULATIONS, cx, y + 30);
  if (p >= 1 && (Math.floor(t * 2) % 2) === 0) {
    ctx.font = "18px sans-serif"; ctx.strokeText(TEXT.PUSH_SPACE, cx, y + 95); ctx.fillText(TEXT.PUSH_SPACE, cx, y + 95);
  }
  STATE.confetti.forEach(p => {
    ctx.save(); ctx.globalAlpha = Math.max(0, p.life / 90); ctx.translate(p.x, p.y);
    ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
  });
  ctx.restore();
}

export function drawEditMode() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, CONST.TOTAL_W, CONST.MAIN_H);
  
  // Left Panel: Parameters
  ctx.fillStyle = "#fff";
  ctx.font = "14px monospace";
  ctx.textAlign = "left";
  
  EDITOR.EDITOR_BUTTONS.forEach(btn => {
    if (btn.type === 'page_nav') {
      ctx.fillStyle = "#444";
      ctx.fillRect(btn.rect.x, btn.rect.y, btn.rect.w, btn.rect.h);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 18px monospace";
      ctx.textAlign = "center";
      ctx.fillText(btn.dir === -1 ? "≪" : "≫", btn.rect.x + btn.rect.w/2, btn.rect.y + btn.rect.h/2 + 6);
      
      if (btn.dir === 1) {
        // 表示中のパターン名
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px sans-serif";
        const patternName = EDITOR.PAGES[STATE.editorPage].name;
        ctx.fillText(patternName, (btn.rect.x - 100), btn.rect.y + btn.rect.h/2 + 6);
      }
      ctx.textAlign = "left";
    } else if (btn.type === 'param') {
      ctx.fillStyle = "#fff";
      ctx.fillText(btn.name, 10, btn.y);
      // Minus
      ctx.fillStyle = "#444";
      ctx.fillRect(btn.minusRect.x, btn.minusRect.y, btn.minusRect.w, btn.minusRect.h);
      ctx.fillStyle = "#fff";
      ctx.fillText("▼", btn.minusRect.x + 5, btn.minusRect.y + 18);
      // Value
      ctx.fillText(CONST.HUMAN_RENDER_CONFIG[btn.name], btn.minusRect.x + 35, btn.y);
      // Plus
      ctx.fillStyle = "#444";
      ctx.fillRect(btn.plusRect.x, btn.plusRect.y, btn.plusRect.w, btn.plusRect.h);
      ctx.fillStyle = "#fff";
      ctx.fillText("▲", btn.plusRect.x + 5, btn.plusRect.y + 18);
    } else if (btn.type === 'state') {
      ctx.fillStyle = (STATE.editorState === btn.name) ? "#fb0" : "#444";
      ctx.fillRect(btn.rect.x, btn.rect.y, btn.rect.w, btn.rect.h);
      ctx.fillStyle = "#fff";
      ctx.fillText(btn.name, btn.rect.x + 5, btn.rect.y + 20);
    } else if (btn.type === 'speech') {
      ctx.fillStyle = "#26a";
      ctx.fillRect(btn.rect.x, btn.rect.y, btn.rect.w, btn.rect.h);
      ctx.fillStyle = "#fff";
      ctx.fillText(btn.name, btn.rect.x + 10, btn.rect.y + 22);
    }
  });

  // Center: Humans
  if (STATE.editorHuman) {
    // 2x scale
    ctx.save();
    ctx.translate(CONST.EDITOR_PREVIEW_X_2X, CONST.EDITOR_PREVIEW_Y);
    ctx.scale(2, 2);
    STATE.editorHuman.x = 0;
    STATE.editorHuman.y = -CONST.HUMAN_LOGICAL_SIZE;
    drawHumans(ctx, 0, [STATE.editorHuman]);
    ctx.restore();
    
    // 1x scale
    ctx.save();
    ctx.translate(CONST.EDITOR_PREVIEW_X_1X, CONST.EDITOR_PREVIEW_Y);
    STATE.editorHuman.x = 0;
    STATE.editorHuman.y = -CONST.HUMAN_LOGICAL_SIZE;
    drawHumans(ctx, 0, [STATE.editorHuman]);
    ctx.restore();
  }
  
  ctx.fillStyle = "#fff";
  ctx.font = "12px sans-serif";
  ctx.fillText(TEXT.RETURN_TO_TITLE, 10, CONST.MAIN_H - 10);
}

function drawGameOverUI() {
  const t = Math.max(0, STATE.elapsed - STATE.gameoverStart);
  const cx = CONST.OFFSET_X + (CONST.COLS * CONST.SIZE) / 2;
  const targetY = CONST.GAMEOVER_UI_Y_TARGET, startY = CONST.GAMEOVER_UI_Y_START;
  const p = Math.min(1, t / CONST.GAMEOVER_FALL_SEC);
  const ease = 1 - Math.pow(1 - p, 3);
  const y = startY + (targetY - startY) * ease;
  ctx.save(); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.lineWidth = 6; ctx.strokeStyle = "rgba(0,0,0,0.9)"; ctx.fillStyle = "#fff";
  ctx.font = "34px sans-serif"; ctx.strokeText(TEXT.GAME_OVER, cx, y - 40); ctx.fillText(TEXT.GAME_OVER, cx, y - 40);
  ctx.font = "54px sans-serif"; ctx.strokeText(TEXT.TITLE, cx, y + 20); ctx.fillText(TEXT.TITLE, cx, y + 20);
  if (p >= 1 && (Math.floor(t * 2) % 2) === 0) {
    ctx.font = "18px sans-serif"; ctx.strokeText(TEXT.PUSH_SPACE, cx, y + 95); ctx.fillText(TEXT.PUSH_SPACE, cx, y + 95);
  }
  ctx.restore();
}

export function drawParticles() {
  STATE.particles.forEach(p => {
    ctx.globalAlpha = Math.max(0, p.life / p.maxLife); ctx.fillStyle = p.c;
    const px = p.x * CONST.SIZE + CONST.OFFSET_X - p.size / 2; const py = screenY(p.y) - p.size / 2;
    ctx.fillRect(px, py, p.size, p.size); ctx.globalAlpha = 1;
  });
}

export function drawBlockCell(px, py, color, timer = null, isCracked = false) {
  ctx.fillStyle = color; ctx.fillRect(px, py, CONST.SIZE, CONST.SIZE);
  if (timer !== null && timer > CONST.ANIM_CRACK_SEC) {
    let alpha = (timer - CONST.ANIM_CRACK_SEC) / CONST.ANIM_GLOW_SEC;
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.8})`; ctx.fillRect(px, py, CONST.SIZE, CONST.SIZE);
  }
  ctx.strokeStyle = "rgba(0,0,0,0.75)"; ctx.lineWidth = 2; ctx.strokeRect(px - 1, py - 1, CONST.SIZE + 2, CONST.SIZE + 2);
  
  // ヒビの描画
  if (timer !== null && timer <= CONST.ANIM_CRACK_SEC) {
    // 崩壊時のヒビ（上から）
    drawCrack(px, py, 1.0 - (timer / CONST.ANIM_CRACK_SEC));
  } else if (isCracked) {
    // 新ブロックのヒビ（下から生やす）
    drawBottomCrack(px, py, 1.0);
  }
}

export function drawCrack(px, py, progress) {
  ctx.save(); ctx.strokeStyle = `rgba(0,0,0,${Math.min(1, progress * 2)})`; ctx.lineWidth = 2;
  ctx.beginPath(); 
  ctx.moveTo(px + CONST.SIZE * 0.2, py); 
  ctx.lineTo(px + CONST.SIZE * 0.4, py + CONST.SIZE * 0.4);
  ctx.lineTo(px + CONST.SIZE * 0.3, py + CONST.SIZE * 0.7); 
  ctx.lineTo(px + CONST.SIZE * 0.6, py + CONST.SIZE);
  ctx.moveTo(px + CONST.SIZE * 0.4, py + CONST.SIZE * 0.4); 
  ctx.lineTo(px + CONST.SIZE * 0.8, py + CONST.SIZE * 0.6);
  ctx.stroke(); ctx.restore();
}

export function drawBottomCrack(px, py, progress) {
  ctx.save(); ctx.strokeStyle = `rgba(0,0,0,${Math.min(1, progress * 2)})`; ctx.lineWidth = 2;
  ctx.beginPath();
  // 下から上に伸びるヒビ
  ctx.moveTo(px + CONST.SIZE * 0.5, py + CONST.SIZE);
  ctx.lineTo(px + CONST.SIZE * 0.4, py + CONST.SIZE * 0.7);
  ctx.lineTo(px + CONST.SIZE * 0.7, py + CONST.SIZE * 0.4);
  ctx.lineTo(px + CONST.SIZE * 0.6, py + CONST.SIZE * 0.1);
  // 枝分かれ
  ctx.moveTo(px + CONST.SIZE * 0.4, py + CONST.SIZE * 0.7);
  ctx.lineTo(px + CONST.SIZE * 0.2, py + CONST.SIZE * 0.5);
  ctx.stroke(); ctx.restore();
}

export function drawBomb(px, py, timer, crackTimer = null) {
  const isFlashing = (timer <= 5 && (Math.floor(STATE.elapsed * 6) % 2) === 0);
  ctx.save();
  ctx.fillStyle = isFlashing ? "#ff3333" : "#222222"; ctx.beginPath(); ctx.arc(px + CONST.SIZE / 2, py + CONST.SIZE / 2, CONST.SIZE * 0.45, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = "#000"; ctx.stroke();
  ctx.strokeStyle = "#8b4513"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px + CONST.SIZE / 2, py + CONST.SIZE * 0.1);
  ctx.quadraticCurveTo(px + CONST.SIZE * 0.8, py - CONST.SIZE * 0.2, px + CONST.SIZE * 0.8, py - CONST.SIZE * 0.3); ctx.stroke();
  if (timer > 0 && Math.random() < 0.8) {
    ctx.fillStyle = ["#ffeb3b", "#ff9800", "#ff5722"][Math.floor(Math.random() * 3)]; ctx.beginPath();
    const sx = px + CONST.SIZE * 0.8 + (Math.random() - 0.5) * 5; const sy = py - CONST.SIZE * 0.3 + (Math.random() - 0.5) * 5;
    ctx.arc(sx, sy, 3 + Math.random() * 3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = "#ffffff"; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(Math.ceil(timer), px + CONST.SIZE / 2, py + CONST.SIZE / 2);
  if (crackTimer !== null && crackTimer > CONST.ANIM_CRACK_SEC) {
    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.fillRect(px, py, CONST.SIZE, CONST.SIZE);
  }
  if (crackTimer !== null && crackTimer <= CONST.ANIM_CRACK_SEC) drawCrack(px, py, 1.0 - (crackTimer / CONST.ANIM_CRACK_SEC));
  ctx.restore();
}
