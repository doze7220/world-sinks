import * as STATE from './stateManager.js';
import * as BLOCK from '../entities/block.js';
import { initEditor, handleEditorClick } from '../ui/humanEditor.js';
import * as RENDER from '../render/renderer.js';
import * as WORLD from '../world/world.js';
import * as CONST from '../data/constants.js';

export function setupInput() {
  const canvas = document.querySelector('canvas');
  canvas.addEventListener("mousedown", e => {
    if (STATE.state === "human_edit") {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);
      if (handleEditorClick(mx, my)) return;
    }
  });

  document.addEventListener("keydown", e => {
    if (STATE.state === "title") {
      if (e.code === "Digit1") {
        initEditor();
        return;
      }
      if (e.code !== "Space") return;
      if (!STATE.spaceReleased) return;
      STATE.setState("intro");
      STATE.setElapsed(0);
      STATE.setSpaceReleased(false);
      return;
    }

    if (STATE.state === "human_edit") {
      if (e.code === "Space") {
        STATE.setState("title");
        return;
      }
    }

    if (STATE.state === "intro") {
      if (e.code !== "Space") return;
      if (!STATE.spaceReleased) return;
      
      import('./gameLogic.js').then(m => {
        STATE.resetGame();
        BLOCK.setPair(null);
        WORLD.updateSafe();
        STATE.setRenderSafeLine(WORLD.safeLine);
        m.spawnHumans();
        STATE.setState("playing");
        STATE.setElapsed(0);
        STATE.setSpaceReleased(false);
      });
      return;
    }

    if ((STATE.state === "clear" || STATE.state === "gameover")) {
      if (e.code !== "Space") return;
      if (!STATE.spaceReleased) return;
      STATE.resetGame();
      BLOCK.setPair(null);
      WORLD.updateSafe();
      STATE.setRenderSafeLine(WORLD.safeLine);
      RENDER.resetClouds();
      STATE.setState("title");
      STATE.setElapsed(0);
      STATE.setSpaceReleased(false);
      return;
    }

    if (e.code === "Space") {
      STATE.setSpaceReleased(false);
      return;
    }
    if (e.key === "6") {
      const alive = STATE.humans.filter(h => !h.isDead);
      if (alive.length > 0) {
        alive[Math.floor(Math.random() * alive.length)].die('none');
        STATE.showDebugMessage("DEBUG: Random Human Died");
      }
    }
    if (e.key === "7") {
      STATE.setSpawnEnabled(!STATE.spawnEnabled);
      STATE.showDebugMessage("SPAWN: " + (STATE.spawnEnabled ? "ON" : "OFF"));
    }

    if (e.code === "KeyQ" && STATE.state === "playing") {
      STATE.setIsPaused(!STATE.isPaused);
      return;
    }

    // --- Debug Keys ---
    if (STATE.state === "playing") {
      if (e.code === "Digit1" || e.code === "Numpad1") {
        STATE.fallingBombs.push({
          x: Math.floor(Math.random() * CONST.COLS),
          y: WORLD.cameraY - 2,
          timer: CONST.BOMB_TIMER_MIN + Math.random() * (CONST.BOMB_TIMER_MAX - CONST.BOMB_TIMER_MIN)
        });
        STATE.showDebugMessage("BOMB SPAWNED!");
      }
      if (e.code === "Digit2" || e.code === "Numpad2") {
        STATE.setDebugPauseCracking(!STATE.debugPauseCracking);
        STATE.showDebugMessage(STATE.debugPauseCracking ? "CRACK & BOMB TIMER PAUSED" : "CRACK & BOMB TIMER RESUMED");
      }
      if (e.code === "Digit3" || e.code === "Numpad3") {
        STATE.setDebugPauseWater(!STATE.debugPauseWater);
        STATE.showDebugMessage(STATE.debugPauseWater ? "WATER PAUSED" : "WATER RESUMED");
      }
      if (e.code === "Digit4" || e.code === "Numpad4") {
        const jump = 50 / CONST.METERS_PER_ROW;
        WORLD.setWater(Math.max(-10 / CONST.METERS_PER_ROW, WORLD.water - jump));
        STATE.showDebugMessage("WATER -50m");
      }
      if (e.code === "Digit5" || e.code === "Numpad5") {
        const jump = 50 / CONST.METERS_PER_ROW;
        WORLD.setWater(WORLD.water + jump);
        STATE.showDebugMessage("WATER +50m");
      }
    }

    if (STATE.state !== "playing" || STATE.isPaused) return;
    if (!BLOCK.pair) return;

    if (e.key === "ArrowLeft") {
      BLOCK.pair.x--;
      if (BLOCK.hit(BLOCK.blocks(BLOCK.pair))) BLOCK.pair.x++;
    }

    if (e.key === "ArrowRight") {
      BLOCK.pair.x++;
      if (BLOCK.hit(BLOCK.blocks(BLOCK.pair))) BLOCK.pair.x--;
    }

    if (e.key === "ArrowUp") {
      const prevRot = BLOCK.pair.rot;
      const prevX = BLOCK.pair.x;
      BLOCK.pair.rot = (BLOCK.pair.rot + 1) % 4;
      if (BLOCK.hit(BLOCK.blocks(BLOCK.pair))) {
        const kicks = [-1, 1, -2, 2];
        let ok = false;
        for (const dx of kicks) {
          BLOCK.pair.x = prevX + dx;
          if (!BLOCK.hit(BLOCK.blocks(BLOCK.pair))) {
            ok = true;
            break;
          }
        }
        if (!ok) {
          BLOCK.pair.rot = prevRot;
          BLOCK.pair.x = prevX;
        }
      }
    }

    if (e.key === "ArrowDown") BLOCK.setFast(true);

    if (e.key === "r" || e.key === "R") {
      STATE.setRadarAbstractionMode(!STATE.radarAbstractionMode);
    }
  });

  document.addEventListener("keyup", e => {
    if (e.code === "Space") STATE.setSpaceReleased(true);
    if (e.key === "ArrowDown") BLOCK.setFast(false);
  });
}
