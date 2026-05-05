import { TOTAL_ROWS, COLS, BLOCK_TYPES, METERS_PER_ROW } from '../data/constants.js';

function rand(a = 1, b = BLOCK_TYPES) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

export function createInitialGrid() {
  const g = Array.from({ length: TOTAL_ROWS }, () => Array(COLS).fill(0));
  for (let x = 0; x < COLS; x++) {
    g[TOTAL_ROWS - 1][x] = 9;
    g[TOTAL_ROWS - 2][x] = rand();
  }
  return g;
}

export let grid = createInitialGrid();
export let cameraY = TOTAL_ROWS - 12; // 12 is ROWS
export let targetCameraY = cameraY;
export let water = -10 / METERS_PER_ROW; // -10 is WATER_START_METERS
export let safeLine = TOTAL_ROWS - 1;

export function setGrid(newGrid) { grid = newGrid; }
export function setCameraY(y) { cameraY = y; }
export function setTargetCameraY(y) { targetCameraY = y; }
export function setWater(w) { water = w; }
export function setSafeLine(s) { safeLine = s; }

export function heightMeters() {
  return Math.max(0, (TOTAL_ROWS - safeLine - 2) * METERS_PER_ROW);
}

export function waterMeters() {
  return Math.floor(water * METERS_PER_ROW);
}

export function waterWorldY() {
  return TOTAL_ROWS - 1 - water;
}

export function updateSafe() {
  for (let y = 0; y < TOTAL_ROWS - 1; y++) {
    if (grid[y].every(v => v)) {
      safeLine = y - 1;
      return;
    }
  }
  safeLine = TOTAL_ROWS - 1;
}
