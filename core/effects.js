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
      y: -10,
      v: 10 + Math.random() * 10,
      len: 10 + Math.random() * 10
    });
  }

  // 雨の更新
  STATE.rainParticles.forEach(p => {
    p.y += p.v;
    p.x += 1; // 斜めに降らせる
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
        vx: dx * CONST.PARTICLE_SPEED + (Math.random() - 0.5) * 0.012,
        vy: Math.abs(dy) * CONST.PARTICLE_SPEED * 0.25 + Math.random() * 0.018,
        life: CONST.PARTICLE_LIFE + Math.random() * 18,
        maxLife: CONST.PARTICLE_LIFE + 18,
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
  const cy = 220;
  const colors = ["#ff4d4d", "#ffd54f", "#66e066", "#66b3ff", "#ff7ad9", "#ffffff"];
  for (let i = 0; i < 140; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 2.4 + Math.random() * 3.2;
    STATE.confetti.push({
      x: cx,
      y: cy,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp - 2.2,
      g: 0.11 + Math.random() * 0.06,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.35,
      w: 8 + Math.random() * 7,
      h: 4 + Math.random() * 5,
      c: colors[(Math.random() * colors.length) | 0],
      life: 85 + Math.random() * 45
    });
  }
}

export function updateCelebrationEffects() {
  STATE.confetti.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.g;
    p.vx *= 0.996;
    p.r += p.vr;
    p.life--;
  });
  STATE.setConfetti(STATE.confetti.filter(p => p.life > 0 && p.y < 560));
}
