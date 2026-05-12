import * as CONST from '../data/constants.js';
import * as WORLD from '../world/world.js';
import * as STATE from '../core/stateManager.js';
import { spawnParticles } from '../core/effects.js'; // あとで作成

export function forceGravity() {
  for (let x = 0; x < CONST.COLS; x++) {
    for (let y = CONST.TOTAL_ROWS - 2; y >= 0; y--) {
      if (WORLD.grid[y][x] && WORLD.grid[y][x] !== CONST.BLOCK_TYPE_BOMB && !WORLD.grid[y + 1][x]) {
        WORLD.grid[y + 1][x] = WORLD.grid[y][x];
        WORLD.grid[y][x] = 0;
      }
    }
  }
}

export function setupGravity() {
  let movedAny = false;
  for (let x = 0; x < CONST.COLS; x++) {
    let emptyY = -1;
    for (let y = CONST.TOTAL_ROWS - 1; y >= 0; y--) {
      let cell = WORLD.grid[y][x];
      if (!cell) {
        if (emptyY === -1) emptyY = y;
      } else if (cell !== CONST.BLOCK_TYPE_BOMB) {
        if (emptyY !== -1) {
          let obj = cell;
          if (typeof obj !== 'object') {
            obj = { type: 'block', color: obj };
          }
          obj.renderOffsetY = y - emptyY;
          obj.fallDelay = CONST.ANIM_FALL_DELAY;
          WORLD.grid[emptyY][x] = obj;
          WORLD.grid[y][x] = 0;
          movedAny = true;
          STATE.humans.forEach(h => h.onBlockMove(x, y, emptyY));
          emptyY--;
        }
      } else if (cell === CONST.BLOCK_TYPE_BOMB) {
        emptyY = -1;
      }
    }
  }
  return movedAny;
}

export function applyLimit() {
  WORLD.updateSafe();
  let erased = false;
  for (let x = 0; x < CONST.COLS; x++) {
    let count = 0;
    for (let y = WORLD.safeLine; y >= 0; y--) {
      let cell = WORLD.grid[y][x];
      if (cell && cell !== CONST.BLOCK_TYPE_BOMB) {
        count++;
        if (count > CONST.LIMIT_HEIGHT) {
          if (typeof cell === 'object' && cell.state === 'cracking') continue;
          if (typeof cell === 'object' && cell.renderOffsetY < 0) continue;
          if (typeof cell === 'object' && cell.type === 'bomb') continue;
          let color = (typeof cell === 'object') ? cell.color : cell;
          let particleColor = CONST.COLORS[color] || "#555555";
          spawnParticles(x, y, particleColor);
          WORLD.grid[y][x] = 0;
          erased = true;
        }
      } else {
        count = 0;
      }
    }
  }
  return erased;
}

export function flagErase() {
  let visited = Array.from({ length: CONST.TOTAL_ROWS }, () => Array(CONST.COLS).fill(false));
  let erased = false;
  let bombsToErase = new Set();
  let blocksToErase = [];

  for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
    for (let x = 0; x < CONST.COLS; x++) {
      let cell = WORLD.grid[y][x];
      if (!cell || cell === CONST.BLOCK_TYPE_BOMB || visited[y][x]) continue;
      if (typeof cell === 'object' && (cell.type === 'bomb' || cell.state === 'cracking')) continue;
      if (typeof cell === 'object' && cell.renderOffsetY < 0) continue;

      let color = (typeof cell === 'object') ? cell.color : cell;
      let stack = [[x, y]];
      let group = [];
      let groupBombs = new Set();
      visited[y][x] = true;

      while (stack.length) {
        let [cx, cy] = stack.pop();
        group.push([cx, cy]);
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
          let nx = cx + dx;
          let ny = cy + dy;
          if (nx >= 0 && nx < CONST.COLS && ny >= 0 && ny < CONST.TOTAL_ROWS) {
            let nCell = WORLD.grid[ny][nx];
            if (nCell) {
              if (typeof nCell === 'object' && nCell.type === 'bomb') {
                groupBombs.add(`${nx},${ny}`);
              } else if (!visited[ny][nx]) {
                let isCracking = (typeof nCell === 'object' && nCell.state === 'cracking');
                let isFalling = (typeof nCell === 'object' && nCell.renderOffsetY < 0);
                let nColor = (typeof nCell === 'object') ? nCell.color : nCell;
                if (!isCracking && !isFalling && nColor === color) {
                  visited[ny][nx] = true;
                  stack.push([nx, ny]);
                }
              }
            }
          }
        });
      }

      if (group.length >= CONST.BLOCK_ERASE_THRESHOLD) {
        group.forEach(([gx, gy]) => blocksToErase.push([gx, gy, color]));
        groupBombs.forEach(b => bombsToErase.add(b));
        erased = true;
      }
    }
  }

  blocksToErase.forEach(([bx, by, color]) => {
    WORLD.grid[by][bx] = { type: 'block', color: color, state: 'cracking', timer: CONST.ANIM_TOTAL_SEC };
    STATE.humans.forEach(h => h.onBlockBroken(bx, by));
  });

  bombsToErase.forEach(bStr => {
    let [bx, by] = bStr.split(',').map(Number);
    if (WORLD.grid[by][bx]) {
      WORLD.grid[by][bx] = { type: 'bomb', timer: WORLD.grid[by][bx].timer, state: 'cracking', crackTimer: CONST.ANIM_TOTAL_SEC };
      STATE.humans.forEach(h => h.onBlockBroken(bx, by));
    }
  });

  return erased;
}

export function isBoardStable() {
  for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
    for (let x = 0; x < CONST.COLS; x++) {
      let cell = WORLD.grid[y][x];
      if (cell && typeof cell === 'object') {
        if (cell.state === 'cracking') return false;
        if (cell.renderOffsetY < 0) return false;
      }
    }
  }
  return true;
}

export function startCascade() {
  if (!STATE.gravityActive) {
    STATE.setGravityActive(true);
    STATE.setCascadePhase("fall_setup");
    STATE.setCascadeSteps(0);
  }
}

export function updateCascade(dt) {
  STATE.setCascadeSteps(STATE.cascadeSteps + 1);
  if (STATE.cascadeSteps > CONST.MAX_CASCADE_STEPS) {
    console.warn("Cascade stopped by safety limit");
    STATE.setGravityActive(false);
    STATE.setCascadePhase("fall_setup");
    return;
  }

  let stillFalling = false;
  for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
    for (let x = 0; x < CONST.COLS; x++) {
      let cell = WORLD.grid[y][x];
      if (cell && typeof cell === 'object' && cell.renderOffsetY < 0) {
        if (cell.fallDelay > 0) {
          cell.fallDelay -= dt;
          stillFalling = true;
        } else {
          cell.renderOffsetY += CONST.ANIM_FALL_SPEED * dt;
          if (cell.renderOffsetY >= 0) {
            cell.renderOffsetY = 0;
          } else {
            stillFalling = true;
          }
        }
      }
    }
  }

  if (STATE.cascadePhase === "fall_setup") {
    let moved = setupGravity();
    if (moved || stillFalling) {
      STATE.setCascadePhase("falling");
    } else {
      STATE.setCascadePhase("erase_setup");
    }
    return;
  }

  if (STATE.cascadePhase === "falling") {
    if (!stillFalling) STATE.setCascadePhase("erase_setup");
    return;
  }

  if (STATE.cascadePhase === "erase_setup") {
    if (!STATE.debugPauseCracking && flagErase()) {
      STATE.setCascadePhase("cracking");
    } else {
      STATE.setCascadePhase("limit");
    }
    return;
  }

  if (STATE.cascadePhase === "cracking") {
    let stillCracking = false;
    for (let y = 0; y < CONST.TOTAL_ROWS; y++) {
      for (let x = 0; x < CONST.COLS; x++) {
        let cell = WORLD.grid[y][x];
        if (cell && typeof cell === 'object' && cell.state === 'cracking') {
          if (cell.type === 'bomb') {
            cell.crackTimer -= dt;
            if (cell.crackTimer <= 0) {
              spawnParticles(x, y, "#555555");
              WORLD.grid[y][x] = 0;
            } else {
              stillCracking = true;
            }
          } else {
            cell.timer -= dt;
            if (cell.timer <= 0) {
              spawnParticles(x, y, CONST.COLORS[cell.color]);
              WORLD.grid[y][x] = 0;
            } else {
              stillCracking = true;
            }
          }
        }
      }
    }
    if (!stillCracking) STATE.setCascadePhase("fall_setup");
    return;
  }

  if (STATE.cascadePhase === "limit") {
    if (applyLimit()) {
      triggerLimitWarning();
      STATE.setCascadePhase("cracking");
    } else {
      if (isBoardStable()) {
        STATE.setGravityActive(false);
      }
      STATE.setCascadePhase("fall_setup");
    }
  }
}

export function triggerLimitWarning() {
  if (STATE.floodPhase === "countdown") return;
  if (STATE.elapsed < STATE.limitWarningUntil) return;
  STATE.setLimitWarningUntil(STATE.elapsed + CONST.LIMIT_WARNING_SEC);
}
