import { TOTAL_W, MAIN_H } from './data/constants.js';
import { setupInput } from './core/input.js';
import { loop } from './core/gameLoop.js';

const canvas = document.getElementById("game");
if (canvas) {
  canvas.width = TOTAL_W;
  canvas.height = MAIN_H;
  setupInput();
  loop();
}
