import * as CONST from '../data/constants.js';
import * as STATE from './stateManager.js';
import { update, isCautionPause } from './gameLogic.js';
import { updateParticles } from './effects.js';
import { draw } from '../render/renderer.js';

let last = 0;
let frameCount = 0;
let lastFpsUpdate = 0;
const minFrameTime = 1000 / CONST.FPS_LIMIT;

export function loop(t = 0) {
  const dt_ms = t - last;
  
  if (dt_ms < minFrameTime) {
    requestAnimationFrame(loop);
    return;
  }

  let dt = dt_ms / 1000;
  if (dt > 0.1) dt = 0.1;
  last = t;

  // FPS計算
  frameCount++;
  if (t - lastFpsUpdate > 1000) {
    STATE.setFps(Math.round((frameCount * 1000) / (t - lastFpsUpdate)));
    frameCount = 0;
    lastFpsUpdate = t;
  }

  // ポーズ中は更新を停止（描画のみ継続）
  if (!STATE.isPaused) {
    update(dt);
    if (!isCautionPause()) updateParticles();
  }
  
  draw(dt);

  requestAnimationFrame(loop);
}
