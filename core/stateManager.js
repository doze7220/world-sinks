import { 
  WATER_START_METERS, METERS_PER_ROW, TOTAL_ROWS, ROWS 
} from '../data/constants.js';
import { createInitialGrid, setGrid, setCameraY, setTargetCameraY, setWater, setSafeLine } from '../world/world.js';

export let state = "title";
export let elapsed = 0;
export let gravityActive = false;
export let cascadePhase = "fall_setup";
export let cascadeSteps = 0;
export let particles = [];
export let confetti = [];
export let floodPhase = "none";
export let floodBlinkStart = 0;
export let floodCountdownEnd = 0;
export let limitWarningUntil = 0;
export let gameoverStart = 0;
export let gameoverCameraY = 0;
export let clearStart = 0;
export let clearCelebrationFired = false;
export let lastBombCheck = 0;
export let fallingBombs = [];
export let spaceReleased = true;
export let humans = [];
export let allHumans = [];
export let deadHumans = [];
export let pair = null;
export let nextPair = null;
export let spawnEnabled = true;

// --- New states for FX ---
export let rainParticles = [];
export let thunderFlashTimer = 0;
export let shakeOffset = { x: 0, y: 0 };
export let radarAbstractionMode = false;
export let cautionAnimTimer = 0; // CAUTION演出用タイマー
export let currentPhase = 0; // 1 to 4
export let fps = 0;
export let renderSafeLine = TOTAL_ROWS - 1;
export let isPaused = false;
export let debugPauseCracking = false;
export let debugPauseWater = false;
export let debugMessage = "";
export let debugMessageTimer = 0;
export let editorHuman = null; // エディットモード用
export let editorState = "walk";
export let editorLastSpeech = 0;
export let editorPage = 0;

export function setState(s) { state = s; }
export function setElapsed(e) { elapsed = e; }
export function addElapsed(dt) { elapsed += dt; }
export function setGravityActive(a) { gravityActive = a; }
export function setCascadePhase(p) { cascadePhase = p; }
export function setCascadeSteps(s) { cascadeSteps = s; }
export function setParticles(p) { particles = p; }
export function setConfetti(c) { confetti = c; }
export function setFloodPhase(p) { floodPhase = p; }
export function setFloodBlinkStart(s) { floodBlinkStart = s; }
export function setFloodCountdownEnd(e) { floodCountdownEnd = e; }
export function setLimitWarningUntil(u) { limitWarningUntil = u; }
export function setGameoverStart(s) { gameoverStart = s; }
export function setGameoverCameraY(y) { gameoverCameraY = y; }
export function setClearStart(s) { clearStart = s; }
export function setClearCelebrationFired(f) { clearCelebrationFired = f; }
export function setLastBombCheck(c) { lastBombCheck = c; }
export function setFallingBombs(b) { fallingBombs = b; }
export function setSpaceReleased(r) { spaceReleased = r; }
export function setHumans(h) { humans = h; }
export function setAllHumans(h) { allHumans = h; }
export function setDeadHumans(h) { deadHumans = h; }
export function setPair(p) { pair = p; }
export function setNextPair(p) { nextPair = p; }
export function setSpawnEnabled(e) { spawnEnabled = e; }

// --- New setters for FX ---
export function setRainParticles(p) { rainParticles = p; }
export function setThunderFlashTimer(t) { thunderFlashTimer = t; }
export function setShakeOffset(x, y) { shakeOffset = { x, y }; }
export function setRadarAbstractionMode(m) { radarAbstractionMode = m; }
export function setCautionAnimTimer(t) { cautionAnimTimer = t; }
export function setCurrentPhase(p) { currentPhase = p; }
export function setFps(f) { fps = f; }
export function setRenderSafeLine(l) { renderSafeLine = l; }
export function setIsPaused(p) { isPaused = p; }
export function setDebugPauseCracking(p) { debugPauseCracking = p; }
export function setDebugPauseWater(p) { debugPauseWater = p; }
export function setDebugMessage(m) { debugMessage = m; }
export function setDebugMessageTimer(t) { debugMessageTimer = t; }
export function setEditorHuman(h) { editorHuman = h; }
export function setEditorState(s) { editorState = s; }
export function setEditorLastSpeech(t) { editorLastSpeech = t; }
export function setEditorPage(p) { editorPage = p; }

export function showDebugMessage(msg) {
  debugMessage = msg;
  debugMessageTimer = 1.0; // 1秒間
}

export function resetGame() {
  setGrid(createInitialGrid());
  setCameraY(TOTAL_ROWS - ROWS);
  setTargetCameraY(TOTAL_ROWS - ROWS);
  setWater(WATER_START_METERS / METERS_PER_ROW);
  setSafeLine(TOTAL_ROWS - 1);
  setRenderSafeLine(TOTAL_ROWS - 1);
  
  elapsed = 0;
  gravityActive = false;
  cascadePhase = "fall_setup";
  cascadeSteps = 0;
  particles = [];
  confetti = [];
  humans = [];
  deadHumans = [];
  pair = null;
  nextPair = null;
  spawnEnabled = true;
  floodPhase = "none";
  floodBlinkStart = 0;
  floodCountdownEnd = 0;
  limitWarningUntil = 0;
  gameoverStart = 0;
  gameoverCameraY = 0;
  clearStart = 0;
  clearCelebrationFired = false;
  lastBombCheck = 0;
  fallingBombs = [];
  humans = [];

  // Reset FX states
  rainParticles = [];
  thunderFlashTimer = 0;
  shakeOffset = { x: 0, y: 0 };
  cautionAnimTimer = 0;
  currentPhase = 0;
  isPaused = false;
  debugPauseCracking = false;
  debugPauseWater = false;
  debugMessage = "";
  debugMessageTimer = 0;
  editorHuman = null;
  editorState = "walk";
  editorLastSpeech = 0;
  editorPage = 0;
}
