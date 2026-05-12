import * as CONST from '../data/constants.js';
import * as STATE from '../core/stateManager.js';

export function updateRain(dt) {
  // 水没危機フェーズ中（Phase 1以上）のみ雨を降らせる
  if (STATE.currentPhase === 0) {
    STATE.setRainParticles([]);
    return;
  }

  let multiplier = 1.0;
  if (STATE.currentPhase === 1) multiplier = CONST.RAIN_MULTIPLIER_PHASE1;
  else if (STATE.currentPhase === 2) multiplier = CONST.RAIN_MULTIPLIER_PHASE2;
  else if (STATE.currentPhase === 3) multiplier = CONST.RAIN_MULTIPLIER_PHASE3;
  else if (STATE.currentPhase === 4) multiplier = CONST.RAIN_MULTIPLIER_PHASE4;

  const targetCount = CONST.RAIN_COUNT_BASE * multiplier;
  if (STATE.rainParticles.length < targetCount && Math.random() < 0.5) {
    STATE.rainParticles.push({
      x: Math.random() * CONST.TOTAL_W,
      y: CONST.RAIN_START_Y,
      v: CONST.RAIN_SPEED_MIN + Math.random() * CONST.RAIN_SPEED_RANGE,
      len: CONST.RAIN_LEN_MIN + Math.random() * CONST.RAIN_LEN_RANGE
    });
  }

  // 雨の更新
  STATE.rainParticles.forEach(p => {
    p.y += p.v;
    p.x += CONST.RAIN_SLANT; // 斜めに降らせる
  });
  STATE.setRainParticles(STATE.rainParticles.filter(p => p.y < CONST.MAIN_H));
}

export function updateThunder(dt) {
  if (STATE.currentPhase < 3) {
    STATE.setThunderFlashTimer(0);
    return;
  }
  let interval = (STATE.currentPhase === 3) ? CONST.THUNDER_INTERVAL_PHASE3 : CONST.THUNDER_INTERVAL_PHASE4;
  if (Math.floor(STATE.elapsed / interval) > Math.floor((STATE.elapsed - dt) / interval)) {
    STATE.setThunderFlashTimer(CONST.THUNDER_FLASH_DURATION);
  }
  if (STATE.thunderFlashTimer > 0) {
    STATE.setThunderFlashTimer(STATE.thunderFlashTimer - dt);
  }
}

export function updateShake(dt) {
  if (STATE.currentPhase < 3) {
    STATE.setShakeOffset(0, 0);
    return;
  }
  let intensity = (STATE.currentPhase === 3) ? CONST.SHAKE_INTENSITY_PHASE3 : CONST.SHAKE_INTENSITY_PHASE4;
  let period = (STATE.currentPhase === 3) ? CONST.SHAKE_PERIOD_PHASE3 : CONST.SHAKE_PERIOD_PHASE4;
  if (Math.floor(STATE.elapsed / period) > Math.floor((STATE.elapsed - dt) / period)) {
    const rx = (Math.random() - 0.5) * intensity * 2;
    const ry = (Math.random() - 0.5) * intensity * 2;
    STATE.setShakeOffset(rx, ry);
  }
}

export function spawnParticles(x, y, color) {
  for (let py = 0; py < CONST.PARTICLE_DIV; py++) {
    for (let px = 0; px < CONST.PARTICLE_DIV; px++) {
      const localX = (px + 0.5) / CONST.PARTICLE_DIV;
      const localY = (py + 0.5) / CONST.PARTICLE_DIV;
      const dx = localX - 0.5;
      const dy = localY - 0.5;
      STATE.particles.push({
        x: x + localX,
        y: y + localY,
        vx: dx * CONST.PARTICLE_SPEED + (Math.random() - 0.5) * CONST.PARTICLE_RAND_VX,
        vy: Math.abs(dy) * CONST.PARTICLE_SPEED * CONST.PARTICLE_RAND_VY_RATIO + Math.random() * CONST.PARTICLE_RAND_VY_ADD,
        life: CONST.PARTICLE_LIFE + Math.random() * CONST.PARTICLE_LIFE_RANGE,
        maxLife: CONST.PARTICLE_LIFE + CONST.PARTICLE_LIFE_RANGE,
        c: color,
        size: CONST.PARTICLE_SIZE
      });
    }
  }
}

export function updateParticles() {
  STATE.particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += CONST.PARTICLE_GRAVITY;
    p.vx *= CONST.PARTICLE_FRICTION;
    p.vy *= CONST.PARTICLE_FRICTION;
    p.life--;
  });
  STATE.setParticles(STATE.particles.filter(p => p.life > 0));
}

export function spawnClearCelebration() {
  const cx = CONST.OFFSET_X + (CONST.COLS * CONST.SIZE) / 2;
  const cy = CONST.CLEAR_CELEB_Y;
  const colors = ["#ff4d4d", "#ffd54f", "#66e066", "#66b3ff", "#ff7ad9", "#ffffff"];
  for (let i = 0; i < CONST.CONFETTI_COUNT; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = CONST.CONFETTI_SPEED_MIN + Math.random() * CONST.CONFETTI_SPEED_RANGE;
    STATE.confetti.push({
      x: cx,
      y: cy,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp + CONST.CONFETTI_VY_OFFSET,
      g: CONST.CONFETTI_G_MIN + Math.random() * CONST.CONFETTI_G_RANGE,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * CONST.CONFETTI_VR_RANGE,
      w: CONST.CONFETTI_W_MIN + Math.random() * CONST.CONFETTI_W_RANGE,
      h: CONST.CONFETTI_H_MIN + Math.random() * CONST.CONFETTI_H_RANGE,
      c: colors[(Math.random() * colors.length) | 0],
      life: CONST.CONFETTI_LIFE_MIN + Math.random() * CONST.CONFETTI_LIFE_RANGE
    });
  }
}

export function updateCelebrationEffects() {
  STATE.confetti.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.g;
    p.vx *= CONST.CONFETTI_FRICTION;
    p.r += p.vr;
    p.life--;
  });
  STATE.setConfetti(STATE.confetti.filter(p => p.life > 0 && p.y < CONST.CONFETTI_Y_LIMIT));
}
