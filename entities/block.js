import * as CONST from '../data/constants.js';
import * as WORLD from '../world/world.js';
import * as STATE from '../core/stateManager.js';

export let pair = null;
export let drop = 0;
export let fast = false;

export function setPair(p) { pair = p; }
export function setDrop(d) { drop = d; }
export function addDrop(d) { drop += d; }
export function setFast(f) { fast = f; }

function rand(a = 1, b = CONST.BLOCK_TYPES) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

export function getShapeOffsets(size, rot) {
  const base = [[0, 0]];
  if (size >= 2) base.push([0, -1]);
  if (size >= 3) base.push([1, 0]);
  if (size >= 4) base.push([1, -1]);

  return base.map(([bx, by]) => {
    if (rot === 0) return [bx, by];
    if (rot === 1) return [-by, bx];
    if (rot === 2) return [-bx, -by];
    if (rot === 3) return [by, -bx];
  });
}

export function newPair() {
  let size;
  if (CONST.RANDOM_SHAPE) {
    const r = Math.random();
    if (r < 0.6) size = 2;
    else if (r < 0.9) size = 3;
    else size = 4;
  } else {
    if (CONST.BLOCK_SHAPE_SIZE <= 1) size = 2;
    else if (CONST.BLOCK_SHAPE_SIZE >= 5) size = 4;
    else size = Math.floor(CONST.BLOCK_SHAPE_SIZE);
  }

  const c = [];
  const cracked = [];
  for (let i = 0; i < size; i++) {
    c.push(rand());
    cracked.push(Math.random() < CONST.CRACKED_BLOCK_PROBABILITY);
  }

  return {
    x: 2,
    y: Math.floor(WORLD.cameraY),
    rot: 0,
    size: size,
    c: c,
    cracked: cracked,
    rx: 2,
    ry: Math.floor(WORLD.cameraY),
    rrot: 0
  };
}

export function blocks(p) {
  const offsets = getShapeOffsets(p.size, p.rot);
  return offsets.map((off, i) => {
    return { x: p.x + off[0], y: p.y + off[1], c: p.c[i], isCracked: p.cracked[i] };
  });
}

export function renderBlocks(p) {
  const angle = p.rrot * Math.PI / 2;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  const base = [[0, 0]];
  if (p.size >= 2) base.push([0, -1]);
  if (p.size >= 3) base.push([1, 0]);
  if (p.size >= 4) base.push([1, -1]);

  return base.map(([bx, by], i) => {
    const ox = bx * cos - by * sin;
    const oy = bx * sin + by * cos;
    return { x: p.rx + ox, y: p.ry + oy, c: p.c[i], isCracked: p.cracked[i] };
  });
}

export function updatePairRender() {
  if (!pair) return;
  pair.rx += (pair.x - pair.rx) * CONST.PAIR_MOVE_LERP;
  pair.ry += (pair.y - pair.ry) * CONST.PAIR_FALL_LERP;
  let diff = pair.rot - pair.rrot;
  if (diff > 2) diff -= 4;
  if (diff < -2) diff += 4;
  pair.rrot += diff * CONST.PAIR_ROT_LERP;
  if (pair.rrot < 0) pair.rrot += 4;
  if (pair.rrot >= 4) pair.rrot -= 4;
}

export function hit(bs) {
  for (let b of bs) {
    if (b.x < 0 || b.x >= CONST.COLS || b.y >= CONST.TOTAL_ROWS) return true;
    if (b.y < 0) continue;

    let visualTop = CONST.TOTAL_ROWS;
    for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
      let cell = WORLD.grid[y][b.x];
      if (cell) {
        let offset = (typeof cell === 'object' && cell.renderOffsetY) ? cell.renderOffsetY : 0;
        visualTop = y + offset;
        break;
      }
    }
    if (b.y + 1 > visualTop + 0.01) return true;
  }
  return false;
}

export function merge() {
  for (let b of blocks(pair)) {
    if (b.y >= 0) {
      WORLD.grid[b.y][b.x] = { 
        type: 'block', 
        color: b.c, 
        isCracked: b.isCracked, 
        renderOffsetY: 0, 
        fallDelay: 0 
      };
    }
  }
  if (applyLimit()) {
    triggerLimitWarning();
  }
}

// 循環参照回避のため、applyLimit と triggerLimitWarning は外部から注入するか、
// stateManager を介して呼び出す形式にする。ここでは stateManager に定義予定。
import { applyLimit, triggerLimitWarning } from '../world/collapse.js';
