(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // data/constants.js
  var BASE_WAVE_AMPLITUDE, DANGER_WAVE_AMPLITUDE, WAVE_PERIOD_1, WAVE_PERIOD_2, WATER_TOP_COLOR, WATER_MID_COLOR, WATER_BOTTOM_COLOR, WATER_HIGHLIGHT_COLOR, WATER_HIGHLIGHT_THICKNESS, DANGER_PROXIMITY_BLOCKS, DANGER_COUNTDOWN_SECONDS, PROXIMITY_BRIGHTNESS_DROP, SHAKE_INTENSITY_PHASE3, SHAKE_INTENSITY_PHASE4, SHAKE_PERIOD_PHASE3, SHAKE_PERIOD_PHASE4, THUNDER_INTERVAL_PHASE3, THUNDER_INTERVAL_PHASE4, THUNDER_FLASH_DURATION, RAIN_COUNT_BASE, RAIN_MULTIPLIER_PHASE1, RAIN_MULTIPLIER_PHASE2, RAIN_MULTIPLIER_PHASE3, RAIN_MULTIPLIER_PHASE4, UI_COUNTDOWN_X, UI_COUNTDOWN_Y, UI_COUNTDOWN_NORMAL_COLOR, UI_COUNTDOWN_DANGER_COLOR, UI_COUNTDOWN_SCALE_MIN, UI_COUNTDOWN_SCALE_MAX, UI_COUNTDOWN_ANIM_PERIOD, UI_COUNTDOWN_TEXT_OUTLINE_WIDTH, UI_COUNTDOWN_TEXT_OUTLINE_COLOR, UI_COUNTDOWN_FONT, UI_COUNTDOWN_CENTER_OFFSET_X, UI_COUNTDOWN_CENTER_OFFSET_Y, UI_CAUTION_TEXT, UI_CAUTION_COLOR, UI_CAUTION_STOKE_COLOR, UI_CAUTION_STOKE_WIDTH, UI_CAUTION_FONT, UI_SIDE_LINE_WIDTH, UI_SIDE_LINE_COLOR, UI_CAUTION_ANIM_DURATION, UI_CAUTION_FADE_OUT_DURATION, LIMIT_WARNING_LINES, SAFE_LINE_LERP, RADAR_LINE_WIDTH, RADAR_VIEW_BOX_COLOR, RADAR_VIEW_BOX_BORDER_COLOR, BOMB_TIMER_MIN, BOMB_TIMER_MAX, BOMB_START_METERS, BOMB_PROB_STEP_METERS, BOMB_PROB_STEP_PERCENT, BOMB_PROB_MAX_PERCENT, BOMB_CHECK_INTERVAL, BOMB_FALL_SPEED, BLOCK_TYPES, RANDOM_SHAPE, BLOCK_SHAPE_SIZE, COLS, ROWS, TOTAL_ROWS, SIZE, LEFT_UI_WIDTH, OFFSET_X, CAMERA_LERP, SAFE_LINE_SCREEN_Y, FALL, FAST, WATER_SPEED, WATER_START_DELAY, WATER_START_METERS, PAIR_MOVE_LERP, PAIR_FALL_LERP, PAIR_ROT_LERP, LIMIT_HEIGHT, METERS_PER_ROW, GOAL_METERS, ANIM_GLOW_SEC, ANIM_CRACK_SEC, ANIM_TOTAL_SEC, ANIM_FALL_DELAY, ANIM_FALL_SPEED, PARTICLE_DIV, PARTICLE_SIZE, PARTICLE_LIFE, PARTICLE_SPEED, PARTICLE_GRAVITY, PARTICLE_FRICTION, MAX_CASCADE_STEPS, BLOCK_PROPERTIES, COLORS, GROUND, WATER_LINE, GOAL_LINE, SAFE_LINE, RADAR_INNER_W, RADAR_PAD, RADAR_V_PAD, SKY_TOP, CLOUD_COUNT, CLOUD_PARALLAX, CLOUD_DRIFT_PX_PER_SEC, CLOUD_ALPHA, MAIN_W, MAIN_H, RADAR_CANVAS_W, RADAR_CANVAS_H, RADAR_X, TOTAL_W, GAMEOVER_FALL_SEC, GAMEOVER_WATER_MULT, GAMEOVER_GRAVITY_STEPS, LIMIT_WARNING_SEC, FPS_LIMIT, WATER_ALPHA, UI_PAUSE_OVERLAY_COLOR, UI_PAUSE_TEXT_COLOR, UI_PAUSE_BLINK_PERIOD, UI_PAUSE_TEXT, UI_PAUSE_FONT, HUMAN_COUNT_INITIAL, HUMAN_RADIUS, HUMAN_LOGICAL_SIZE, HUMAN_SPEED_WALK, HUMAN_SPEED_ESCAPE, HUMAN_SPEED_FAST_CLIMB, HUMAN_FALL_OVER_SEC, HUMAN_DROWN_SEC, HUMAN_SPEECH_SEC, HUMAN_LOST_SEC, HUMAN_GOAL_SUBSTATE_SEC, HUMAN_RENDER_CONFIG, HUMAN_AI_TICK_MIN, HUMAN_AI_TICK_MAX, HUMAN_DANGER_DIST, HUMAN_DANGER_WATER_M, SCORE_HUMAN_NORMAL, SCORE_HUMAN_VIP, HUMAN_SPEECH_DICT;
  var init_constants = __esm({
    "data/constants.js"() {
      BASE_WAVE_AMPLITUDE = 8;
      DANGER_WAVE_AMPLITUDE = 10;
      WAVE_PERIOD_1 = 2.5;
      WAVE_PERIOD_2 = 1.3;
      WATER_TOP_COLOR = "#4FC3F7";
      WATER_MID_COLOR = "#2A7FBF";
      WATER_BOTTOM_COLOR = "#0A1A2A";
      WATER_HIGHLIGHT_COLOR = "#FFFFFF";
      WATER_HIGHLIGHT_THICKNESS = 3;
      DANGER_PROXIMITY_BLOCKS = 3;
      DANGER_COUNTDOWN_SECONDS = 10;
      PROXIMITY_BRIGHTNESS_DROP = 0.9;
      SHAKE_INTENSITY_PHASE3 = 2;
      SHAKE_INTENSITY_PHASE4 = 5;
      SHAKE_PERIOD_PHASE3 = 0.1;
      SHAKE_PERIOD_PHASE4 = 0.08;
      THUNDER_INTERVAL_PHASE3 = 2.5;
      THUNDER_INTERVAL_PHASE4 = 1;
      THUNDER_FLASH_DURATION = 0.1;
      RAIN_COUNT_BASE = 50;
      RAIN_MULTIPLIER_PHASE1 = 1;
      RAIN_MULTIPLIER_PHASE2 = 1.5;
      RAIN_MULTIPLIER_PHASE3 = 2;
      RAIN_MULTIPLIER_PHASE4 = 2.5;
      UI_COUNTDOWN_X = 65;
      UI_COUNTDOWN_Y = 20;
      UI_COUNTDOWN_NORMAL_COLOR = "#FFFFFF";
      UI_COUNTDOWN_DANGER_COLOR = "#FF3B3B";
      UI_COUNTDOWN_SCALE_MIN = 1;
      UI_COUNTDOWN_SCALE_MAX = 1.1;
      UI_COUNTDOWN_ANIM_PERIOD = 1;
      UI_COUNTDOWN_TEXT_OUTLINE_WIDTH = 4;
      UI_COUNTDOWN_TEXT_OUTLINE_COLOR = "rgba(0,0,0,0.85)";
      UI_COUNTDOWN_FONT = "bold 20px sans-serif";
      UI_COUNTDOWN_CENTER_OFFSET_X = 80;
      UI_COUNTDOWN_CENTER_OFFSET_Y = 15;
      UI_CAUTION_TEXT = "CAUTION!";
      UI_CAUTION_COLOR = "#FF3B3B";
      UI_CAUTION_STOKE_COLOR = "#FFFFFF";
      UI_CAUTION_STOKE_WIDTH = 4;
      UI_CAUTION_FONT = "bold 48px sans-serif";
      UI_SIDE_LINE_WIDTH = 4;
      UI_SIDE_LINE_COLOR = "#FFFFFF";
      UI_CAUTION_ANIM_DURATION = 0.8;
      UI_CAUTION_FADE_OUT_DURATION = 0.25;
      LIMIT_WARNING_LINES = [
        "\u5730\u9762\u306F\u5B89\u5168\u9AD8\u5EA6\u304B\u3089",
        "6\u30D6\u30ED\u30C3\u30AF\u4E0A\u307E\u3067\u3057\u304B",
        "\u7A4D\u3081\u307E\u305B\u3093\uFF01"
      ];
      SAFE_LINE_LERP = 0.15;
      RADAR_LINE_WIDTH = 3;
      RADAR_VIEW_BOX_COLOR = "rgba(255, 255, 255, 0.25)";
      RADAR_VIEW_BOX_BORDER_COLOR = "#FFFFFF";
      BOMB_TIMER_MIN = 10;
      BOMB_TIMER_MAX = 30;
      BOMB_START_METERS = 0;
      BOMB_PROB_STEP_METERS = 10;
      BOMB_PROB_STEP_PERCENT = 50;
      BOMB_PROB_MAX_PERCENT = 10;
      BOMB_CHECK_INTERVAL = 5;
      BOMB_FALL_SPEED = 3;
      BLOCK_TYPES = 4;
      RANDOM_SHAPE = true;
      BLOCK_SHAPE_SIZE = 2;
      COLS = 6;
      ROWS = 12;
      TOTAL_ROWS = 200;
      SIZE = 40;
      LEFT_UI_WIDTH = 70;
      OFFSET_X = LEFT_UI_WIDTH;
      CAMERA_LERP = 0.05;
      SAFE_LINE_SCREEN_Y = ROWS - 3;
      FALL = 0.6;
      FAST = 0.05;
      WATER_SPEED = 0.15;
      WATER_START_DELAY = 0;
      WATER_START_METERS = -10;
      PAIR_MOVE_LERP = 0.28;
      PAIR_FALL_LERP = 0.18;
      PAIR_ROT_LERP = 0.25;
      LIMIT_HEIGHT = 6;
      METERS_PER_ROW = 10;
      GOAL_METERS = 200;
      ANIM_GLOW_SEC = 0.5;
      ANIM_CRACK_SEC = 1;
      ANIM_TOTAL_SEC = ANIM_GLOW_SEC + ANIM_CRACK_SEC;
      ANIM_FALL_DELAY = 0.1;
      ANIM_FALL_SPEED = 20;
      PARTICLE_DIV = 4;
      PARTICLE_SIZE = SIZE / PARTICLE_DIV;
      PARTICLE_LIFE = 55;
      PARTICLE_SPEED = 0.055;
      PARTICLE_GRAVITY = 6e-3;
      PARTICLE_FRICTION = 0.985;
      MAX_CASCADE_STEPS = 200;
      BLOCK_PROPERTIES = {
        1: { weight: 1, hardness: 1, canClimb: 0, breakable: 1 },
        // 赤(1)は登れない
        2: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
        3: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
        4: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
        5: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
        6: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
        9: { weight: 1, hardness: 1, canClimb: 0, breakable: 1 }
        // 爆弾も登れない
      };
      COLORS = [null, "#f55", "#5f5", "#55f", "#ff5", "#f5f"];
      GROUND = "#6b4a2b";
      WATER_LINE = "#66d9ff";
      GOAL_LINE = "#ffeb3b";
      SAFE_LINE = "#fff";
      RADAR_INNER_W = 48;
      RADAR_PAD = 10;
      RADAR_V_PAD = 12;
      SKY_TOP = "#2c6fff";
      CLOUD_COUNT = 14;
      CLOUD_PARALLAX = 0.6;
      CLOUD_DRIFT_PX_PER_SEC = 6;
      CLOUD_ALPHA = 0.9;
      MAIN_W = 340;
      MAIN_H = 480;
      RADAR_CANVAS_W = 190;
      RADAR_CANVAS_H = 480;
      RADAR_X = MAIN_W;
      TOTAL_W = MAIN_W + RADAR_CANVAS_W;
      GAMEOVER_FALL_SEC = 5;
      GAMEOVER_WATER_MULT = 10;
      GAMEOVER_GRAVITY_STEPS = 6;
      LIMIT_WARNING_SEC = 5;
      FPS_LIMIT = 60;
      WATER_ALPHA = 0.8;
      UI_PAUSE_OVERLAY_COLOR = "rgba(0, 0, 0, 0.5)";
      UI_PAUSE_TEXT_COLOR = "#FFFFFF";
      UI_PAUSE_BLINK_PERIOD = 1;
      UI_PAUSE_TEXT = "\uFF1C PAUSE \uFF1E";
      UI_PAUSE_FONT = "bold 40px sans-serif";
      HUMAN_COUNT_INITIAL = 10;
      HUMAN_RADIUS = 0.26;
      HUMAN_LOGICAL_SIZE = 26;
      HUMAN_SPEED_WALK = 0.4;
      HUMAN_SPEED_ESCAPE = 0.7;
      HUMAN_SPEED_FAST_CLIMB = 1.25;
      HUMAN_FALL_OVER_SEC = 2;
      HUMAN_DROWN_SEC = 5;
      HUMAN_SPEECH_SEC = 2.5;
      HUMAN_LOST_SEC = 10;
      HUMAN_GOAL_SUBSTATE_SEC = 2;
      HUMAN_RENDER_CONFIG = {
        BOUNCE_AMP: 2,
        // 歩行時の跳ね
        SWAY_AMP: 1,
        // 登攀時の揺れ
        FOOT_X_OFF: 6.8,
        // 足の体からのX距離
        FOOT_Y_OFF: -6.5,
        // 足のY基本位置
        HAND_X_OFF: 4,
        // 手の体からのX距離
        HAND_Y_OFF_B: -1.2,
        // 手のY基本位置(BodyRに対する倍率)
        CLIMB_FOOT_X_OFF: 6.4,
        // 登攀時の足のX距離
        CLIMB_FOOT_Y_OFF: -0.9,
        // 登攀時の足のY位置(BodyRに対する倍率)
        CLIMB_HAND_X_OFF: 4.1,
        // 登攀時の手のX距離
        CLIMB_HAND_Y_OFF: -2,
        // 登攀時の手のY位置(BodyRに対する倍率)
        BODY_SIZE_RATIO: 2,
        // 胴体サイズ(BodyRに対する倍率)
        FOOT_W: 16,
        // 足の幅
        FOOT_H: 8,
        // 足の高さ
        HAND_SIZE: 12,
        // 手のサイズ
        CLIMB_FOOT_W: 12,
        // 登攀時の足の幅
        CLIMB_FOOT_H: 20,
        // 登攀時の足の高さ
        SIGMA_OFFSET_X: -10,
        // ΣのXオフセット
        SIGMA_OFFSET_Y: -10,
        // ΣのYオフセット
        SIGMA_ROTATION: 45,
        // Σの回転角度(度)
        SIGMA_SIZE: 14,
        // Σの描画サイズ
        SPEECH_FONT_SIZE: 8,
        // セリフのフォントサイズ
        SWEAT_TEXT: "\u{1F4A6}",
        // 汗の文字
        SWEAT_X_OFF: 1,
        // 汗のXオフセット(BodyRに対する倍率)
        SWEAT_Y_OFF: -2,
        // 汗のYオフセット(BodyRに対する倍率)
        SWEAT_ROTATION: -90,
        // 汗の回転角度
        FALL_FOOT_X_OFF: 4,
        // 落下時の足のX距離
        FALL_HAND_X_OFF: 10,
        // 落下時の手のX距離
        FELL_OVER_FOOT_X_OFF: 6,
        // 転倒時の足のX距離
        FELL_OVER_HAND_X_OFF: 6
        // 転倒時の手のX距離
      };
      HUMAN_AI_TICK_MIN = 0.1;
      HUMAN_AI_TICK_MAX = 0.3;
      HUMAN_DANGER_DIST = 2.5;
      HUMAN_DANGER_WATER_M = 30;
      SCORE_HUMAN_NORMAL = 100;
      SCORE_HUMAN_VIP = 500;
      HUMAN_SPEECH_DICT = {
        DANGER: ["\u52A9\u3051\u3066\uFF01", "HELP!"],
        FALLING: ["\u3046\u308F\u3042\u3041", "\u843D\u3061\u308B\u30FC!!"],
        DROWNING: ["\u3076\u304F\u3076\u304F\u2026"],
        LANDED: ["\u52A9\u304B\u3063\u305F\u2026", "\u3075\u3045"],
        FELL_OVER: ["\u75DB\u3063\uFF01", "\u3057\u307E\u3063\u305F\uFF01"],
        OBSERVE: ["\uFF65\uFF65\uFF65"],
        FLOOD_NEAR: ["\u6C34\u3060\u30FC\uFF01", "\u6C34\u304C\u6765\u305F\u305E\u30FC\uFF01", "\u9003\u3052\u308D\u30FC\uFF01"],
        CANT_CLIMB: ["\u3053\u3053\u306F\u767B\u308C\u306A\u3044\u2026", "\u4ED6\u3092\u56DE\u308D\u3046", "\u4E0A\u306B\u884C\u304F\u306B\u306F\u3069\u3053\u3078\u2026"],
        LOST: ["\u4E0A\u306B\u884C\u304F\u9053\u306F\u3069\u3053\u3060\u2026", "\u9003\u3052\u9053\u304C\u306A\u3044\u2026", "\u52A9\u3051\u3066\u2026"],
        FOUND_PATH: ["\u9053\u3060\uFF01", "\u4E0A\u306B\u884C\u3051\u308B\u305E\uFF01", "\u3053\u308C\u3067\u52A9\u304B\u308B\uFF01"],
        GOAL: ["\u795E\u69D8\u3042\u308A\u304C\u3068\u3046\uFF01", "\u751F\u304D\u6B8B\u308C\u305F\uFF01", "\u3084\u3063\u305F\u30FC\u30FC\uFF01\uFF01"]
      };
    }
  });

  // world/world.js
  function rand(a = 1, b = BLOCK_TYPES) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }
  function createInitialGrid() {
    const g = Array.from({ length: TOTAL_ROWS }, () => Array(COLS).fill(0));
    for (let x = 0; x < COLS; x++) {
      g[TOTAL_ROWS - 1][x] = 9;
      g[TOTAL_ROWS - 2][x] = rand();
    }
    return g;
  }
  function setGrid(newGrid) {
    grid = newGrid;
  }
  function setCameraY(y) {
    cameraY = y;
  }
  function setTargetCameraY(y) {
    targetCameraY = y;
  }
  function setWater(w) {
    water = w;
  }
  function setSafeLine(s) {
    safeLine = s;
  }
  function heightMeters() {
    return Math.max(0, (TOTAL_ROWS - safeLine - 2) * METERS_PER_ROW);
  }
  function waterMeters() {
    return Math.floor(water * METERS_PER_ROW);
  }
  function waterWorldY() {
    return TOTAL_ROWS - 1 - water;
  }
  function updateSafe() {
    for (let y = 0; y < TOTAL_ROWS - 1; y++) {
      if (grid[y].every((v) => v)) {
        safeLine = y - 1;
        return;
      }
    }
    safeLine = TOTAL_ROWS - 1;
  }
  var grid, cameraY, targetCameraY, water, safeLine;
  var init_world = __esm({
    "world/world.js"() {
      init_constants();
      grid = createInitialGrid();
      cameraY = TOTAL_ROWS - 12;
      targetCameraY = cameraY;
      water = -10 / METERS_PER_ROW;
      safeLine = TOTAL_ROWS - 1;
    }
  });

  // core/stateManager.js
  function setState(s) {
    state = s;
  }
  function setElapsed(e) {
    elapsed = e;
  }
  function addElapsed(dt) {
    elapsed += dt;
  }
  function setGravityActive(a) {
    gravityActive = a;
  }
  function setCascadePhase(p) {
    cascadePhase = p;
  }
  function setCascadeSteps(s) {
    cascadeSteps = s;
  }
  function setParticles(p) {
    particles = p;
  }
  function setConfetti(c) {
    confetti = c;
  }
  function setFloodPhase(p) {
    floodPhase = p;
  }
  function setFloodBlinkStart(s) {
    floodBlinkStart = s;
  }
  function setFloodCountdownEnd(e) {
    floodCountdownEnd = e;
  }
  function setLimitWarningUntil(u) {
    limitWarningUntil = u;
  }
  function setGameoverStart(s) {
    gameoverStart = s;
  }
  function setGameoverCameraY(y) {
    gameoverCameraY = y;
  }
  function setClearStart(s) {
    clearStart = s;
  }
  function setClearCelebrationFired(f) {
    clearCelebrationFired = f;
  }
  function setLastBombCheck(c) {
    lastBombCheck = c;
  }
  function setSpaceReleased(r) {
    spaceReleased = r;
  }
  function setHumans(h) {
    humans = h;
  }
  function setRainParticles(p) {
    rainParticles = p;
  }
  function setThunderFlashTimer(t) {
    thunderFlashTimer = t;
  }
  function setShakeOffset(x, y) {
    shakeOffset = { x, y };
  }
  function setRadarAbstractionMode(m) {
    radarAbstractionMode = m;
  }
  function setCautionAnimTimer(t) {
    cautionAnimTimer = t;
  }
  function setCurrentPhase(p) {
    currentPhase = p;
  }
  function setFps(f) {
    fps = f;
  }
  function setRenderSafeLine(l) {
    renderSafeLine = l;
  }
  function setIsPaused(p) {
    isPaused = p;
  }
  function setDebugPauseCracking(p) {
    debugPauseCracking = p;
  }
  function setDebugPauseWater(p) {
    debugPauseWater = p;
  }
  function setDebugMessageTimer(t) {
    debugMessageTimer = t;
  }
  function setEditorHuman(h) {
    editorHuman = h;
  }
  function setEditorState(s) {
    editorState = s;
  }
  function setEditorLastSpeech(t) {
    editorLastSpeech = t;
  }
  function setEditorPage(p) {
    editorPage = p;
  }
  function showDebugMessage(msg) {
    debugMessage = msg;
    debugMessageTimer = 1;
  }
  function resetGame() {
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
  var state, elapsed, gravityActive, cascadePhase, cascadeSteps, particles, confetti, floodPhase, floodBlinkStart, floodCountdownEnd, limitWarningUntil, gameoverStart, gameoverCameraY, clearStart, clearCelebrationFired, lastBombCheck, fallingBombs, spaceReleased, humans, rainParticles, thunderFlashTimer, shakeOffset, radarAbstractionMode, cautionAnimTimer, currentPhase, fps, renderSafeLine, isPaused, debugPauseCracking, debugPauseWater, debugMessage, debugMessageTimer, editorHuman, editorState, editorLastSpeech, editorPage;
  var init_stateManager = __esm({
    "core/stateManager.js"() {
      init_constants();
      init_world();
      state = "title";
      elapsed = 0;
      gravityActive = false;
      cascadePhase = "fall_setup";
      cascadeSteps = 0;
      particles = [];
      confetti = [];
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
      spaceReleased = true;
      humans = [];
      rainParticles = [];
      thunderFlashTimer = 0;
      shakeOffset = { x: 0, y: 0 };
      radarAbstractionMode = false;
      cautionAnimTimer = 0;
      currentPhase = 0;
      fps = 0;
      renderSafeLine = TOTAL_ROWS - 1;
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
  });

  // core/effects.js
  function updateRain(dt) {
    if (currentPhase === 0) {
      setRainParticles([]);
      return;
    }
    let multiplier = 1;
    if (currentPhase === 1) multiplier = RAIN_MULTIPLIER_PHASE1;
    else if (currentPhase === 2) multiplier = RAIN_MULTIPLIER_PHASE2;
    else if (currentPhase === 3) multiplier = RAIN_MULTIPLIER_PHASE3;
    else if (currentPhase === 4) multiplier = RAIN_MULTIPLIER_PHASE4;
    const targetCount = RAIN_COUNT_BASE * multiplier;
    if (rainParticles.length < targetCount && Math.random() < 0.5) {
      rainParticles.push({
        x: Math.random() * TOTAL_W,
        y: -10,
        v: 10 + Math.random() * 10,
        len: 10 + Math.random() * 10
      });
    }
    rainParticles.forEach((p) => {
      p.y += p.v;
      p.x += 1;
    });
    setRainParticles(rainParticles.filter((p) => p.y < MAIN_H));
  }
  function updateThunder(dt) {
    if (currentPhase < 3) {
      setThunderFlashTimer(0);
      return;
    }
    let interval = currentPhase === 3 ? THUNDER_INTERVAL_PHASE3 : THUNDER_INTERVAL_PHASE4;
    if (Math.floor(elapsed / interval) > Math.floor((elapsed - dt) / interval)) {
      setThunderFlashTimer(THUNDER_FLASH_DURATION);
    }
    if (thunderFlashTimer > 0) {
      setThunderFlashTimer(thunderFlashTimer - dt);
    }
  }
  function updateShake(dt) {
    if (currentPhase < 3) {
      setShakeOffset(0, 0);
      return;
    }
    let intensity = currentPhase === 3 ? SHAKE_INTENSITY_PHASE3 : SHAKE_INTENSITY_PHASE4;
    let period = currentPhase === 3 ? SHAKE_PERIOD_PHASE3 : SHAKE_PERIOD_PHASE4;
    if (Math.floor(elapsed / period) > Math.floor((elapsed - dt) / period)) {
      const rx = (Math.random() - 0.5) * intensity * 2;
      const ry = (Math.random() - 0.5) * intensity * 2;
      setShakeOffset(rx, ry);
    }
  }
  function spawnParticles(x, y, color) {
    for (let py = 0; py < PARTICLE_DIV; py++) {
      for (let px = 0; px < PARTICLE_DIV; px++) {
        const localX = (px + 0.5) / PARTICLE_DIV;
        const localY = (py + 0.5) / PARTICLE_DIV;
        const dx = localX - 0.5;
        const dy = localY - 0.5;
        particles.push({
          x: x + localX,
          y: y + localY,
          vx: dx * PARTICLE_SPEED + (Math.random() - 0.5) * 0.012,
          vy: Math.abs(dy) * PARTICLE_SPEED * 0.25 + Math.random() * 0.018,
          life: PARTICLE_LIFE + Math.random() * 18,
          maxLife: PARTICLE_LIFE + 18,
          c: color,
          size: PARTICLE_SIZE
        });
      }
    }
  }
  function updateParticles() {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += PARTICLE_GRAVITY;
      p.vx *= PARTICLE_FRICTION;
      p.vy *= PARTICLE_FRICTION;
      p.life--;
    });
    setParticles(particles.filter((p) => p.life > 0));
  }
  function spawnClearCelebration() {
    const cx = OFFSET_X + COLS * SIZE / 2;
    const cy = 220;
    const colors = ["#ff4d4d", "#ffd54f", "#66e066", "#66b3ff", "#ff7ad9", "#ffffff"];
    for (let i = 0; i < 140; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 2.4 + Math.random() * 3.2;
      confetti.push({
        x: cx,
        y: cy,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 2.2,
        g: 0.11 + Math.random() * 0.06,
        r: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.35,
        w: 8 + Math.random() * 7,
        h: 4 + Math.random() * 5,
        c: colors[Math.random() * colors.length | 0],
        life: 85 + Math.random() * 45
      });
    }
  }
  function updateCelebrationEffects() {
    confetti.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.g;
      p.vx *= 0.996;
      p.r += p.vr;
      p.life--;
    });
    setConfetti(confetti.filter((p) => p.life > 0 && p.y < 560));
  }
  var init_effects = __esm({
    "core/effects.js"() {
      init_constants();
      init_stateManager();
    }
  });

  // world/collapse.js
  function forceGravity() {
    for (let x = 0; x < COLS; x++) {
      for (let y = TOTAL_ROWS - 2; y >= 0; y--) {
        if (grid[y][x] && grid[y][x] !== 9 && !grid[y + 1][x]) {
          grid[y + 1][x] = grid[y][x];
          grid[y][x] = 0;
        }
      }
    }
  }
  function setupGravity() {
    let movedAny = false;
    for (let x = 0; x < COLS; x++) {
      let emptyY = -1;
      for (let y = TOTAL_ROWS - 1; y >= 0; y--) {
        let cell = grid[y][x];
        if (!cell) {
          if (emptyY === -1) emptyY = y;
        } else if (cell !== 9) {
          if (emptyY !== -1) {
            let obj = cell;
            if (typeof obj !== "object") {
              obj = { type: "block", color: obj };
            }
            obj.renderOffsetY = y - emptyY;
            obj.fallDelay = ANIM_FALL_DELAY;
            grid[emptyY][x] = obj;
            grid[y][x] = 0;
            movedAny = true;
            humans.forEach((h) => h.onBlockMove(x, y, emptyY));
            emptyY--;
          }
        } else if (cell === 9) {
          emptyY = -1;
        }
      }
    }
    return movedAny;
  }
  function applyLimit() {
    updateSafe();
    let erased = false;
    for (let x = 0; x < COLS; x++) {
      let count = 0;
      for (let y = safeLine; y >= 0; y--) {
        let cell = grid[y][x];
        if (cell && cell !== 9) {
          count++;
          if (count > LIMIT_HEIGHT) {
            if (typeof cell === "object" && cell.state === "cracking") continue;
            if (typeof cell === "object" && cell.renderOffsetY < 0) continue;
            if (typeof cell === "object" && cell.type === "bomb") continue;
            let color = typeof cell === "object" ? cell.color : cell;
            let particleColor = COLORS[color] || "#555555";
            spawnParticles(x, y, particleColor);
            grid[y][x] = 0;
            erased = true;
          }
        } else {
          count = 0;
        }
      }
    }
    return erased;
  }
  function flagErase() {
    let visited = Array.from({ length: TOTAL_ROWS }, () => Array(COLS).fill(false));
    let erased = false;
    let bombsToErase = /* @__PURE__ */ new Set();
    let blocksToErase = [];
    for (let y = 0; y < TOTAL_ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        let cell = grid[y][x];
        if (!cell || cell === 9 || visited[y][x]) continue;
        if (typeof cell === "object" && (cell.type === "bomb" || cell.state === "cracking")) continue;
        if (typeof cell === "object" && cell.renderOffsetY < 0) continue;
        let color = typeof cell === "object" ? cell.color : cell;
        let stack = [[x, y]];
        let group = [];
        let groupBombs = /* @__PURE__ */ new Set();
        visited[y][x] = true;
        while (stack.length) {
          let [cx, cy] = stack.pop();
          group.push([cx, cy]);
          [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
            let nx = cx + dx;
            let ny = cy + dy;
            if (nx >= 0 && nx < COLS && ny >= 0 && ny < TOTAL_ROWS) {
              let nCell = grid[ny][nx];
              if (nCell) {
                if (typeof nCell === "object" && nCell.type === "bomb") {
                  groupBombs.add(`${nx},${ny}`);
                } else if (!visited[ny][nx]) {
                  let isCracking = typeof nCell === "object" && nCell.state === "cracking";
                  let isFalling = typeof nCell === "object" && nCell.renderOffsetY < 0;
                  let nColor = typeof nCell === "object" ? nCell.color : nCell;
                  if (!isCracking && !isFalling && nColor === color) {
                    visited[ny][nx] = true;
                    stack.push([nx, ny]);
                  }
                }
              }
            }
          });
        }
        if (group.length >= 4) {
          group.forEach(([gx, gy]) => blocksToErase.push([gx, gy, color]));
          groupBombs.forEach((b) => bombsToErase.add(b));
          erased = true;
        }
      }
    }
    blocksToErase.forEach(([bx, by, color]) => {
      grid[by][bx] = { type: "block", color, state: "cracking", timer: ANIM_TOTAL_SEC };
      humans.forEach((h) => h.onBlockBroken(bx, by));
    });
    bombsToErase.forEach((bStr) => {
      let [bx, by] = bStr.split(",").map(Number);
      if (grid[by][bx]) {
        grid[by][bx] = { type: "bomb", timer: grid[by][bx].timer, state: "cracking", crackTimer: ANIM_TOTAL_SEC };
        humans.forEach((h) => h.onBlockBroken(bx, by));
      }
    });
    return erased;
  }
  function isBoardStable() {
    for (let y = 0; y < TOTAL_ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        let cell = grid[y][x];
        if (cell && typeof cell === "object") {
          if (cell.state === "cracking") return false;
          if (cell.renderOffsetY < 0) return false;
        }
      }
    }
    return true;
  }
  function startCascade() {
    if (!gravityActive) {
      setGravityActive(true);
      setCascadePhase("fall_setup");
      setCascadeSteps(0);
    }
  }
  function updateCascade(dt) {
    setCascadeSteps(cascadeSteps + 1);
    if (cascadeSteps > MAX_CASCADE_STEPS) {
      console.warn("Cascade stopped by safety limit");
      setGravityActive(false);
      setCascadePhase("fall_setup");
      return;
    }
    let stillFalling = false;
    for (let y = 0; y < TOTAL_ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        let cell = grid[y][x];
        if (cell && typeof cell === "object" && cell.renderOffsetY < 0) {
          if (cell.fallDelay > 0) {
            cell.fallDelay -= dt;
            stillFalling = true;
          } else {
            cell.renderOffsetY += ANIM_FALL_SPEED * dt;
            if (cell.renderOffsetY >= 0) {
              cell.renderOffsetY = 0;
            } else {
              stillFalling = true;
            }
          }
        }
      }
    }
    if (cascadePhase === "fall_setup") {
      let moved = setupGravity();
      if (moved || stillFalling) {
        setCascadePhase("falling");
      } else {
        setCascadePhase("erase_setup");
      }
      return;
    }
    if (cascadePhase === "falling") {
      if (!stillFalling) setCascadePhase("erase_setup");
      return;
    }
    if (cascadePhase === "erase_setup") {
      if (!debugPauseCracking && flagErase()) {
        setCascadePhase("cracking");
      } else {
        setCascadePhase("limit");
      }
      return;
    }
    if (cascadePhase === "cracking") {
      let stillCracking = false;
      for (let y = 0; y < TOTAL_ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          let cell = grid[y][x];
          if (cell && typeof cell === "object" && cell.state === "cracking") {
            if (cell.type === "bomb") {
              cell.crackTimer -= dt;
              if (cell.crackTimer <= 0) {
                spawnParticles(x, y, "#555555");
                grid[y][x] = 0;
              } else {
                stillCracking = true;
              }
            } else {
              cell.timer -= dt;
              if (cell.timer <= 0) {
                spawnParticles(x, y, COLORS[cell.color]);
                grid[y][x] = 0;
              } else {
                stillCracking = true;
              }
            }
          }
        }
      }
      if (!stillCracking) setCascadePhase("fall_setup");
      return;
    }
    if (cascadePhase === "limit") {
      if (applyLimit()) {
        triggerLimitWarning();
        setCascadePhase("cracking");
      } else {
        if (isBoardStable()) {
          setGravityActive(false);
        }
        setCascadePhase("fall_setup");
      }
    }
  }
  function triggerLimitWarning() {
    if (floodPhase === "countdown") return;
    if (elapsed < limitWarningUntil) return;
    setLimitWarningUntil(elapsed + LIMIT_WARNING_SEC);
  }
  var init_collapse = __esm({
    "world/collapse.js"() {
      init_constants();
      init_world();
      init_stateManager();
      init_effects();
    }
  });

  // entities/block.js
  function setPair(p) {
    pair = p;
  }
  function setDrop(d) {
    drop = d;
  }
  function addDrop(d) {
    drop += d;
  }
  function setFast(f) {
    fast = f;
  }
  function rand2(a = 1, b = BLOCK_TYPES) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }
  function getShapeOffsets(size, rot) {
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
  function newPair() {
    let size;
    if (RANDOM_SHAPE) {
      const r = Math.random();
      if (r < 0.6) size = 2;
      else if (r < 0.9) size = 3;
      else size = 4;
    } else {
      if (BLOCK_SHAPE_SIZE <= 1) size = 2;
      else if (BLOCK_SHAPE_SIZE >= 5) size = 4;
      else size = Math.floor(BLOCK_SHAPE_SIZE);
    }
    const c = [];
    for (let i = 0; i < size; i++) {
      c.push(rand2());
    }
    return {
      x: 2,
      y: Math.floor(cameraY),
      rot: 0,
      size,
      c,
      rx: 2,
      ry: Math.floor(cameraY),
      rrot: 0
    };
  }
  function blocks(p) {
    const offsets = getShapeOffsets(p.size, p.rot);
    return offsets.map((off, i) => {
      return { x: p.x + off[0], y: p.y + off[1], c: p.c[i] };
    });
  }
  function renderBlocks(p) {
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
      return { x: p.rx + ox, y: p.ry + oy, c: p.c[i] };
    });
  }
  function updatePairRender() {
    if (!pair) return;
    pair.rx += (pair.x - pair.rx) * PAIR_MOVE_LERP;
    pair.ry += (pair.y - pair.ry) * PAIR_FALL_LERP;
    let diff = pair.rot - pair.rrot;
    if (diff > 2) diff -= 4;
    if (diff < -2) diff += 4;
    pair.rrot += diff * PAIR_ROT_LERP;
    if (pair.rrot < 0) pair.rrot += 4;
    if (pair.rrot >= 4) pair.rrot -= 4;
  }
  function hit(bs) {
    for (let b of bs) {
      if (b.x < 0 || b.x >= COLS || b.y >= TOTAL_ROWS) return true;
      if (b.y < 0) continue;
      let visualTop = TOTAL_ROWS;
      for (let y = 0; y < TOTAL_ROWS; y++) {
        let cell = grid[y][b.x];
        if (cell) {
          let offset = typeof cell === "object" && cell.renderOffsetY ? cell.renderOffsetY : 0;
          visualTop = y + offset;
          break;
        }
      }
      if (b.y + 1 > visualTop + 0.01) return true;
    }
    return false;
  }
  function merge() {
    for (let b of blocks(pair)) {
      if (b.y >= 0) {
        grid[b.y][b.x] = { type: "block", color: b.c, renderOffsetY: 0, fallDelay: 0 };
      }
    }
    if (applyLimit()) {
      triggerLimitWarning();
    }
  }
  var pair, drop, fast;
  var init_block = __esm({
    "entities/block.js"() {
      init_constants();
      init_world();
      init_stateManager();
      init_collapse();
      pair = null;
      drop = 0;
      fast = false;
    }
  });

  // ui/score.js
  function addScore(points) {
    score += points;
  }
  var score;
  var init_score = __esm({
    "ui/score.js"() {
      score = 0;
    }
  });

  // entities/human.js
  var Human;
  var init_human = __esm({
    "entities/human.js"() {
      init_constants();
      init_world();
      init_stateManager();
      init_score();
      Human = class {
        constructor(id, x, y, isVIP = false) {
          this.id = id;
          this.x = x;
          this.y = y;
          this.vx = 0;
          this.vy = 0;
          this.state = "walk";
          this.climbFlag = false;
          this.speechTimer = 0;
          this.speechText = "";
          this.speechCooldown = 0;
          this.aiTimer = 0;
          this.timer = 0;
          this.isVIP = isVIP;
          this.dir = Math.random() < 0.5 ? -1 : 1;
          this.animTime = Math.random() * 10;
          this.lastClimbTime = elapsed;
          this.attachedBlock = null;
          this.goalSubState = 0;
        }
        getStandingY(gx, fromY) {
          if (gx < 0 || gx >= COLS) return TOTAL_ROWS * SIZE;
          for (let y = 0; y < TOTAL_ROWS; y++) {
            let cell = grid[y][gx];
            if (cell) {
              let offset = typeof cell === "object" && cell.renderOffsetY ? cell.renderOffsetY : 0;
              let cellY = (y + offset) * SIZE;
              if (cellY >= fromY - 5) {
                return cellY;
              }
            }
          }
          return TOTAL_ROWS * SIZE;
        }
        getDanger() {
          for (let b of fallingBombs) {
            let dx = Math.abs(b.x * SIZE - this.x);
            let dy = Math.abs(b.y * SIZE - this.y);
            if (dx <= HUMAN_DANGER_DIST * SIZE && dy <= HUMAN_DANGER_DIST * SIZE) return true;
          }
          let gx = Math.round((this.x - OFFSET_X) / SIZE);
          let gy = Math.floor(this.y / SIZE);
          for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
              let nx = gx + dx;
              let ny = gy + dy;
              if (nx >= 0 && nx < COLS && ny >= 0 && ny < TOTAL_ROWS) {
                let cell = grid[ny][nx];
                if (cell && (cell === 9 || typeof cell === "object" && cell.type === "bomb")) return true;
              }
            }
          }
          let waterY = waterWorldY() * SIZE;
          if (waterY - this.y <= HUMAN_DANGER_WATER_M * (SIZE / METERS_PER_ROW)) return true;
          return false;
        }
        onBlockBroken(bx, by) {
          let gx = Math.round((this.x - OFFSET_X) / SIZE);
          let gy = Math.floor(this.y / SIZE);
          let feetGy = Math.floor((this.y + HUMAN_LOGICAL_SIZE - 2) / SIZE);
          if (bx === gx && (by === gy || by === feetGy || by === feetGy + 1)) {
            if (this.state !== "fall") {
              this.state = "fall";
              this.vx = 0;
              this.say("DANGER");
              this.climbFlag = false;
            }
          }
        }
        onBlockMove(bx, oldBy, newBy) {
          let gx = Math.round((this.x - OFFSET_X) / SIZE);
          if (bx !== gx) return;
          let gy = Math.floor(this.y / SIZE);
          let feetGy = Math.floor((this.y + HUMAN_LOGICAL_SIZE - 2) / SIZE);
          if (this.state === "climb" && (gy === oldBy || gy === oldBy + 1)) {
            this.attachedBlock = { x: bx, y: newBy, relativeY: this.y - oldBy * SIZE };
          } else if (bx === gx && (gy === oldBy || feetGy === oldBy)) {
            if (this.state !== "fall") {
              this.state = "fall";
              this.climbFlag = false;
            }
          }
        }
        think() {
          let gx = Math.round((this.x - OFFSET_X) / SIZE);
          gx = Math.max(0, Math.min(COLS - 1, gx));
          let waterY = waterWorldY() * SIZE;
          if (this.y > waterY) {
            if (this.state !== "drown" && this.state !== "goal") {
              this.state = "drown";
              this.timer = HUMAN_DROWN_SEC;
              this.say("DROWNING");
            }
            if (this.state !== "goal") return;
          }
          if (this.state === "goal") return;
          if (this.state === "fell_over") {
            if (this.timer <= 0 || this.getDanger()) {
              this.state = "walk";
            } else {
              return;
            }
          }
          let feetY = this.y + HUMAN_LOGICAL_SIZE;
          let standingY = TOTAL_ROWS * SIZE;
          let wallY = -1;
          let wallCanClimb = false;
          for (let r = 0; r < TOTAL_ROWS; r++) {
            let cell = grid[r][gx];
            if (cell) {
              let cellY = r * SIZE;
              let cID = typeof cell === "object" ? cell.color : cell;
              let props = BLOCK_PROPERTIES[cID] || { canClimb: 1 };
              if (cellY < feetY && cellY + SIZE > this.y) {
                if (props.canClimb) {
                  wallY = cellY;
                  wallCanClimb = true;
                }
              }
              if (cellY >= feetY - 2) {
                standingY = Math.min(standingY, cellY);
              }
            }
          }
          if (this.state !== "climb" && feetY < standingY - 5) {
            if (this.state !== "fall") {
              this.state = "fall";
              this.vx = 0;
              this.say("FALLING");
            }
          }
          if (this.state === "fall" && feetY >= standingY) {
            this.state = "walk";
            this.say("LANDED");
            this.y = standingY - HUMAN_LOGICAL_SIZE;
            this.vy = 0;
            return;
          }
          let isDanger = this.getDanger();
          let speedMult = isDanger ? HUMAN_SPEED_ESCAPE : HUMAN_SPEED_WALK;
          let renderMeters = Math.max(0, (TOTAL_ROWS - renderSafeLine - 2) * METERS_PER_ROW);
          let currentMeters = (TOTAL_ROWS - this.y / SIZE - 1) * METERS_PER_ROW;
          if (renderMeters - currentMeters >= 30) {
            speedMult = HUMAN_SPEED_FAST_CLIMB;
          }
          let isClimbingPossible = wallY !== -1 && wallCanClimb;
          if (this.state === "climb") {
            this.lastClimbTime = elapsed;
            if (wallY === -1 || !wallCanClimb) {
              this.state = "walk";
              this.climbFlag = false;
              this.vy = 0;
            } else if (this.y <= wallY - HUMAN_LOGICAL_SIZE + 2) {
              this.y = wallY - HUMAN_LOGICAL_SIZE;
              this.state = "walk";
              this.climbFlag = false;
              this.vy = 0;
            } else {
              this.vy = -speedMult * SIZE;
            }
            return;
          }
          if (wallY !== -1) {
            if (wallCanClimb) {
              let blockCenterX = gx * SIZE + OFFSET_X + SIZE / 2;
              let distFromCenter = Math.abs(this.x - blockCenterX);
              if (distFromCenter <= SIZE * 0.25) {
                this.state = "climb";
                this.climbFlag = true;
                this.vx = 0;
                this.vy = -speedMult * SIZE;
                return;
              }
            } else {
              if (Math.random() < 0.05) this.say("CANT_CLIMB");
              if (this.state === "walk") {
                this.dir *= -1;
                this.vx = this.dir * speedMult * SIZE;
              }
            }
          }
          if (this.state === "walk" || this.state === "escape") {
            let nextGx = Math.round((this.x + this.dir * SIZE * 0.4 - OFFSET_X) / SIZE);
            nextGx = Math.max(0, Math.min(COLS - 1, nextGx));
            let nextStandingY = this.getStandingY(nextGx, feetY);
            if (nextStandingY > feetY + 5) {
              if (this.state === "escape") {
                if (Math.random() < 0.5) {
                } else {
                  this.dir *= -1;
                  this.vx = this.dir * speedMult * SIZE;
                }
              } else if (this.state === "walk") {
                this.dir *= -1;
                this.vx = this.dir * speedMult * SIZE;
              }
            }
          }
          let distToWater = waterY - feetY;
          if (distToWater > 0 && distToWater < SIZE * 3) {
            if (Math.random() < 0.02) this.say("FLOOD_NEAR");
          }
          if (elapsed - this.lastClimbTime > HUMAN_LOST_SEC) {
            if (this.state === "walk" || this.state === "escape") {
              this.state = "lost";
              this.say("LOST");
            }
          }
          if (this.state === "lost" && (elapsed - this.lastClimbTime < HUMAN_LOST_SEC || isClimbingPossible)) {
            if (isClimbingPossible) {
              this.speechCooldown = 0;
              this.say("FOUND_PATH");
            }
            this.state = "walk";
            this.lastClimbTime = elapsed;
          }
          if (isDanger) {
            this.state = "escape";
            this.lastClimbTime = elapsed;
            if (Math.random() < 0.05) {
              this.state = "fell_over";
              this.timer = HUMAN_FALL_OVER_SEC;
              this.say("FELL_OVER");
              return;
            }
            this.vx = this.dir * speedMult * SIZE;
            this.vy = 0;
          } else {
            if (this.state !== "fall") {
              if (this.state !== "lost") this.state = "walk";
              this.vy = 0;
              if (Math.random() < 0.1) this.dir *= -1;
              else if (Math.random() < 0.2) this.vx = 0;
              else this.vx = this.dir * speedMult * SIZE;
            }
          }
        }
        applyVelocity(dt) {
          let speedMultiplier = 1;
          if (state === "goal_wait") speedMultiplier = 2;
          if (this.attachedBlock) {
            let cell = grid[this.attachedBlock.y][this.attachedBlock.x];
            if (cell && typeof cell === "object" && cell.renderOffsetY !== void 0) {
              this.y = (this.attachedBlock.y + cell.renderOffsetY) * SIZE + this.attachedBlock.relativeY;
              if (cell.renderOffsetY >= 0) this.attachedBlock = null;
            } else {
              this.attachedBlock = null;
            }
          }
          if (this.state === "fall" || this.state === "drown") {
            this.vy += 9.8 * SIZE * dt;
            this.vx = 0;
            if (this.state === "drown") {
              let waterY = waterWorldY() * SIZE;
              if (this.y > waterY) {
                this.y = waterY;
                this.vy = 0;
              }
            }
          } else if (this.state !== "climb" && !this.attachedBlock) {
            let gx = Math.round((this.x - OFFSET_X) / SIZE);
            gx = Math.max(0, Math.min(COLS - 1, gx));
            let feetY = this.y + HUMAN_LOGICAL_SIZE;
            let standingY = this.getStandingY(gx, feetY);
            if (feetY < standingY - 5) {
              this.vy += 9.8 * SIZE * dt;
              if (this.vy > 20) {
                if (this.state !== "fall") {
                  this.state = "fall";
                  this.say("FALLING");
                }
              }
            }
          }
          this.x += this.vx * dt * speedMultiplier;
          this.y += this.vy * dt * speedMultiplier;
          if (this.state !== "climb" && this.state !== "fell_over" && !this.attachedBlock) {
            let gx = Math.round((this.x - OFFSET_X) / SIZE);
            gx = Math.max(0, Math.min(COLS - 1, gx));
            let feetY = this.y + HUMAN_LOGICAL_SIZE;
            let standingY = this.getStandingY(gx, feetY);
            if (this.vy >= 0 && feetY >= standingY - 5) {
              this.y = standingY - HUMAN_LOGICAL_SIZE;
              this.vy = 0;
              if (this.state === "fall") {
                this.state = "walk";
                this.say("LANDED");
              }
            }
          }
          if (this.x < OFFSET_X) {
            this.x = OFFSET_X;
            this.dir = 1;
          }
          if (this.x > OFFSET_X + (COLS - 1) * SIZE) {
            this.x = OFFSET_X + (COLS - 1) * SIZE;
            this.dir = -1;
          }
        }
        update(dt) {
          this.animTime += dt;
          this.aiTimer -= dt;
          if (this.speechTimer > 0) this.speechTimer -= dt;
          if (this.speechCooldown > 0) this.speechCooldown -= dt;
          if (this.timer > 0) this.timer -= dt;
          if (this.state === "goal") {
            this.timer -= dt;
            if (this.timer <= 0) {
              this.timer = HUMAN_GOAL_SUBSTATE_SEC;
              this.goalSubState = (this.goalSubState + 1) % 5;
              if (Math.random() < 0.2) this.say("GOAL");
            }
          }
          if (this.aiTimer <= 0) {
            this.think();
            this.aiTimer = HUMAN_AI_TICK_MIN + Math.random() * (HUMAN_AI_TICK_MAX - HUMAN_AI_TICK_MIN);
          }
          this.applyVelocity(dt);
        }
        say(key) {
          if (this.speechCooldown > 0) return;
          let myGx = Math.round((this.x - OFFSET_X) / SIZE);
          let myGy = Math.round(this.y / HUMAN_LOGICAL_SIZE);
          for (let h of humans) {
            if (h.id >= this.id) continue;
            let hx = Math.round((h.x - OFFSET_X) / SIZE);
            let hy = Math.round(h.y / HUMAN_LOGICAL_SIZE);
            if (Math.abs(hx - myGx) <= 1 && Math.abs(hy - myGy) <= 1) {
              return;
            }
          }
          let texts = HUMAN_SPEECH_DICT[key];
          if (!texts) return;
          this.speechText = texts[Math.floor(Math.random() * texts.length)];
          this.speechTimer = HUMAN_SPEECH_SEC;
          this.speechCooldown = HUMAN_SPEECH_SEC * 2 + Math.random();
        }
      };
    }
  });

  // core/gameLogic.js
  var gameLogic_exports = {};
  __export(gameLogic_exports, {
    isCautionPause: () => isCautionPause,
    resetFloodGrace: () => resetFloodGrace,
    spawnHumans: () => spawnHumans,
    startFloodGrace: () => startFloodGrace,
    startGameOver: () => startGameOver,
    update: () => update,
    updateFloodGrace: () => updateFloodGrace
  });
  function spawnHumans() {
    let h = [];
    let vipIndex = Math.floor(Math.random() * HUMAN_COUNT_INITIAL);
    for (let i = 0; i < HUMAN_COUNT_INITIAL; i++) {
      let x = OFFSET_X + SIZE + Math.random() * (COLS - 2) * SIZE;
      h.push(new Human(i, x, 0, i === vipIndex));
    }
    for (let human of h) {
      let gx = Math.round((human.x - OFFSET_X) / SIZE);
      let surfaceY = human.getStandingY(gx, 0);
      human.y = surfaceY - HUMAN_LOGICAL_SIZE;
    }
    setHumans(h);
  }
  function startGameOver() {
    if (state === "gameover") return;
    setState("gameover");
    setGameoverStart(elapsed);
    setGameoverCameraY(cameraY);
    setPair(null);
    setGravityActive(false);
  }
  function resetFloodGrace() {
    setFloodPhase("none");
    setCurrentPhase(0);
  }
  function startFloodGrace() {
    if (floodPhase !== "none") return;
    setLimitWarningUntil(0);
    setFloodPhase("blink");
    setFloodBlinkStart(elapsed);
    setCautionAnimTimer(UI_CAUTION_ANIM_DURATION + UI_CAUTION_FADE_OUT_DURATION);
  }
  function updateFloodGrace(dt) {
    if (floodPhase === "none") return;
    if (floodPhase === "blink") {
      setCautionAnimTimer(Math.max(0, cautionAnimTimer - dt));
      if (cautionAnimTimer <= 0) {
        setFloodPhase("countdown");
        setFloodCountdownEnd(elapsed + DANGER_COUNTDOWN_SECONDS);
      }
      return;
    }
    if (floodPhase === "countdown") {
      const remain = Math.max(0, floodCountdownEnd - elapsed);
      if (remain > 7) setCurrentPhase(1);
      else if (remain > 4) setCurrentPhase(2);
      else if (remain > 2) setCurrentPhase(3);
      else setCurrentPhase(4);
      if (remain <= 0) startGameOver();
    }
  }
  function isCautionPause() {
    return state === "playing" && floodPhase === "blink";
  }
  function update(dt) {
    addElapsed(dt);
    if (debugMessageTimer > 0) {
      setDebugMessageTimer(debugMessageTimer - dt);
    }
    updateRain(dt);
    updateThunder(dt);
    updateShake(dt);
    updateSafe();
    if (state === "playing" || state === "goal_wait" || state === "gameover" || state === "clear") {
      let remaining = [];
      let speedMult = state === "goal_wait" ? 2.5 : 1;
      for (let h of humans) {
        h.update(dt * speedMult);
        if (h.y <= (cameraY + ROWS + 2) * SIZE) {
          remaining.push(h);
        }
      }
      setHumans(remaining);
      if (remaining.length === 0 && state === "playing") {
        setState("gameover");
        setGameoverStart(elapsed);
        setGameoverCameraY(cameraY);
        return;
      }
    }
    if (state === "clear") {
      const clearRiseSec = 2.4;
      if (!clearCelebrationFired && elapsed - clearStart >= clearRiseSec) {
        spawnClearCelebration();
        setClearCelebrationFired(true);
      }
      updateCelebrationEffects();
      return;
    }
    if (state === "gameover") {
      setCameraY(gameoverCameraY);
      for (let i = 0; i < GAMEOVER_GRAVITY_STEPS; i++) forceGravity();
      if (elapsed >= WATER_START_DELAY) {
        setWater(water + dt * WATER_SPEED * GAMEOVER_WATER_MULT);
        const maxWater = TOTAL_ROWS - 1 - cameraY;
        setWater(Math.min(water, maxWater));
      }
      return;
    }
    if (state === "goal_wait") {
      let allReached = true;
      let goalMeterY = (TOTAL_ROWS - GOAL_METERS / METERS_PER_ROW - 1.5) * SIZE;
      for (let h of humans) {
        if (h.y > goalMeterY) {
          allReached = false;
          break;
        }
      }
      if (allReached) {
        setState("clear");
        let s = 0;
        for (let h of humans) {
          s += h.isVIP ? SCORE_HUMAN_VIP : SCORE_HUMAN_NORMAL;
          h.state = "goal";
          h.timer = HUMAN_GOAL_SUBSTATE_SEC;
          h.goalSubState = 0;
          h.say("GOAL");
        }
        addScore(s);
        setClearStart(elapsed);
      }
      return;
    }
    if (state !== "playing") return;
    if (isCautionPause()) {
      updateFloodGrace(dt);
      return;
    }
    if (!debugPauseWater && elapsed >= WATER_START_DELAY) {
      setWater(water + dt * WATER_SPEED);
    }
    updateBombs(dt);
    const currentRenderM = Math.round((TOTAL_ROWS - renderSafeLine - 2) * METERS_PER_ROW);
    if (currentRenderM >= GOAL_METERS && !gravityActive) {
      setState("goal_wait");
      setPair(null);
    }
    if (water * METERS_PER_ROW >= heightMeters()) {
      startFloodGrace();
    } else {
      resetFloodGrace();
    }
    updateFloodGrace(dt);
    if (state !== "playing") return;
    if (pair) updatePairRender();
    if (gravityActive) updateCascade(dt);
    updateCrackingBlocks(dt);
    if (!pair) setPair(newPair());
    addDrop(dt);
    let speed = fast ? FAST : FALL;
    if (drop > speed) {
      setDrop(0);
      pair.y++;
      if (hit(blocks(pair))) {
        pair.y--;
        merge();
        setPair(null);
        if (!gravityActive) startCascade();
        else {
          setupGravity();
          let hasCracking = false;
          for (let y = 0; y < TOTAL_ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
              let c = grid[y][x];
              if (c && typeof c === "object" && c.state === "cracking") hasCracking = true;
            }
          }
          if (hasCracking && cascadePhase !== "cracking") setCascadePhase("cracking");
        }
      }
    }
    if (state === "playing") {
      setRenderSafeLine(renderSafeLine + (safeLine - renderSafeLine) * SAFE_LINE_LERP);
      setTargetCameraY(Math.max(0, Math.min(TOTAL_ROWS - ROWS, renderSafeLine + 1 - SAFE_LINE_SCREEN_Y)));
      setCameraY(cameraY + (targetCameraY - cameraY) * CAMERA_LERP);
    }
  }
  function updateBombs(dt) {
    if (state !== "playing") return;
    if (elapsed - lastBombCheck >= BOMB_CHECK_INTERVAL) {
      setLastBombCheck(lastBombCheck + BOMB_CHECK_INTERVAL);
      const currentM = heightMeters();
      if (currentM >= BOMB_START_METERS) {
        let prob = Math.floor((currentM - BOMB_START_METERS) / BOMB_PROB_STEP_METERS) * BOMB_PROB_STEP_PERCENT;
        prob = Math.min(BOMB_PROB_MAX_PERCENT, prob);
        if (Math.random() < prob / 100) {
          fallingBombs.push({
            x: Math.floor(Math.random() * COLS),
            y: cameraY - 2,
            timer: BOMB_TIMER_MIN + Math.random() * (BOMB_TIMER_MAX - BOMB_TIMER_MIN)
          });
        }
      }
    }
    for (let i = fallingBombs.length - 1; i >= 0; i--) {
      let b = fallingBombs[i];
      let nextY = b.y + BOMB_FALL_SPEED * dt;
      let visualTop = TOTAL_ROWS;
      for (let y = 0; y < TOTAL_ROWS; y++) {
        let cell = grid[y][b.x];
        if (cell) {
          let offset = typeof cell === "object" && cell.renderOffsetY ? cell.renderOffsetY : 0;
          visualTop = y + offset;
          break;
        }
      }
      if (nextY + 1 >= visualTop) {
        let placeY = Math.floor(visualTop) - 1;
        if (placeY >= 0) {
          grid[placeY][b.x] = { type: "bomb", timer: b.timer };
          if (!gravityActive) startCascade();
          else setupGravity();
          if (applyLimit()) triggerLimitWarning();
        }
        fallingBombs.splice(i, 1);
      } else {
        b.y = nextY;
      }
    }
    let exploded = false;
    for (let y = 0; y < TOTAL_ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        let cell = grid[y][x];
        if (typeof cell === "object" && cell.type === "bomb" && cell.state !== "cracking") {
          if (!debugPauseCracking) {
            cell.timer -= dt;
          }
          if (cell.timer <= 0) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                let ny = y + dy, nx = x + dx;
                if (nx >= 0 && nx < COLS && ny >= 0 && ny < TOTAL_ROWS && grid[ny][nx] !== 9) {
                  if (grid[ny][nx]) {
                    let color = typeof grid[ny][nx] === "number" ? COLORS[grid[ny][nx]] : "#ff3300";
                    spawnParticles(nx, ny, color);
                  }
                  grid[ny][nx] = 0;
                  humans.forEach((h) => h.onBlockBroken(nx, ny));
                }
              }
            }
            exploded = true;
          }
        }
      }
    }
    if (exploded) {
      if (!gravityActive) startCascade();
      else setupGravity();
    }
  }
  function updateCrackingBlocks(dt) {
    if (debugPauseCracking) return;
    if (!gravityActive) {
      let anyCrackFinished = false;
      for (let y = 0; y < TOTAL_ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          let cell = grid[y][x];
          if (cell && typeof cell === "object" && cell.state === "cracking") {
            let timerKey = cell.type === "bomb" ? "crackTimer" : "timer";
            cell[timerKey] -= dt;
            if (cell[timerKey] <= 0) {
              let color = cell.type === "bomb" ? "#555555" : COLORS[cell.color];
              spawnParticles(x, y, color);
              grid[y][x] = 0;
              anyCrackFinished = true;
            }
          }
        }
      }
      if (anyCrackFinished) startCascade();
    }
  }
  var init_gameLogic = __esm({
    "core/gameLogic.js"() {
      init_constants();
      init_world();
      init_stateManager();
      init_collapse();
      init_block();
      init_effects();
      init_score();
      init_human();
    }
  });

  // bundle_entry.js
  init_constants();

  // core/input.js
  init_stateManager();
  init_block();

  // ui/humanEditor.js
  init_constants();
  init_stateManager();
  init_human();

  // render/humanRenderer.js
  init_constants();
  init_stateManager();
  init_world();
  var humanAtlas = null;
  var P_BODY = { x: 0, y: 0, w: 12, h: 12 };
  var P_HAND = { x: 12, y: 0, w: 8, h: 8 };
  var P_FOOT_N = { x: 20, y: 0, w: 4, h: 4 };
  var P_FOOT_C = { x: 26, y: 0, w: 8, h: 10 };
  var speechSprites = {};
  function initHumanAtlas() {
    const canvas3 = document.createElement("canvas");
    canvas3.width = 256;
    canvas3.height = 128;
    const ctx2 = canvas3.getContext("2d");
    ctx2.imageSmoothingEnabled = false;
    ctx2.fillStyle = "#FFFFFF";
    ctx2.strokeStyle = "#000000";
    ctx2.lineWidth = 1;
    ctx2.beginPath();
    ctx2.arc(6, 6, 4, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.arc(16, 3, 2, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.arc(22, 3, 2, Math.PI, 0);
    ctx2.lineTo(24, 3);
    ctx2.lineTo(20, 3);
    ctx2.fill();
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.ellipse(30, 4, 1.5, 3, 0, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.stroke();
    const texts = ["\u03A3"];
    Object.values(HUMAN_SPEECH_DICT).forEach((list) => texts.push(...list));
    let currentX = 0;
    let currentY = 20;
    const fontSize = HUMAN_RENDER_CONFIG.SPEECH_FONT_SIZE;
    ctx2.font = `bold ${fontSize}px sans-serif`;
    ctx2.textAlign = "left";
    ctx2.textBaseline = "top";
    texts.forEach((t) => {
      const isSigma = t === "\u03A3";
      const fullText = isSigma ? t : `\uFF3C${t}\uFF0F`;
      const metrics = ctx2.measureText(fullText);
      const w = Math.ceil(metrics.width) + 8;
      const h = (isSigma ? HUMAN_RENDER_CONFIG.SIGMA_SIZE : fontSize) + 8;
      if (currentX + w > 256) {
        currentX = 0;
        currentY += h;
      }
      ctx2.save();
      ctx2.translate(currentX + w / 2, currentY + h / 2);
      if (isSigma) {
        ctx2.rotate(HUMAN_RENDER_CONFIG.SIGMA_ROTATION * Math.PI / 180);
      }
      ctx2.strokeStyle = "#000";
      ctx2.lineWidth = 2;
      ctx2.strokeText(fullText, -w / 2 + 4, -h / 2 + 4);
      ctx2.fillStyle = "#FFF";
      ctx2.fillText(fullText, -w / 2 + 4, -h / 2 + 4);
      ctx2.restore();
      speechSprites[t] = { x: currentX, y: currentY, w, h };
      currentX += w;
    });
    humanAtlas = canvas3;
  }
  function drawPart(ctx2, part, dx, dy, dw, dh) {
    ctx2.drawImage(humanAtlas, part.x, part.y, part.w, part.h, dx, dy, dw, dh);
  }
  function drawHumans(ctx2, screenYOffset, humansList = null) {
    if (!humanAtlas) initHumanAtlas();
    let list = humansList || humans;
    let sortedHumans = [...list].sort((a, b) => {
      let za = a.y;
      let zb = b.y;
      if (a.state === "climb") za += 0.1;
      if (b.state === "climb") zb += 0.1;
      return za - zb;
    });
    for (let h of sortedHumans) {
      let px = h.x;
      let py = h.y + HUMAN_LOGICAL_SIZE - screenYOffset;
      let bodyR = SIZE * HUMAN_RADIUS;
      ctx2.save();
      ctx2.imageSmoothingEnabled = false;
      ctx2.translate(px, py);
      let t = h.animTime * 10;
      const cfg = HUMAN_RENDER_CONFIG;
      if (h.state === "walk" || h.state === "escape" || h.state === "lost") {
        let speed = h.state === "escape" ? 2 : 1;
        let bounce = Math.abs(Math.sin(t * speed)) * cfg.BOUNCE_AMP;
        let f1y = Math.sin(t * speed) * 2;
        let f2y = Math.sin(t * speed + Math.PI) * 2;
        drawPart(ctx2, P_HAND, -bodyR - cfg.HAND_X_OFF, bodyR * cfg.HAND_Y_OFF_B - bounce, cfg.HAND_SIZE, cfg.HAND_SIZE);
        drawPart(ctx2, P_HAND, bodyR - cfg.HAND_X_OFF / 2, bodyR * cfg.HAND_Y_OFF_B - bounce, cfg.HAND_SIZE, cfg.HAND_SIZE);
        drawPart(ctx2, P_BODY, -bodyR, -bodyR * 2 - bounce, bodyR * 2 * (cfg.BODY_SIZE_RATIO / 2), bodyR * 2 * (cfg.BODY_SIZE_RATIO / 2));
        drawPart(ctx2, P_FOOT_N, -bodyR / 2 - cfg.FOOT_X_OFF, cfg.FOOT_Y_OFF + f1y, cfg.FOOT_W, cfg.FOOT_H);
        drawPart(ctx2, P_FOOT_N, bodyR / 2 - cfg.FOOT_X_OFF, cfg.FOOT_Y_OFF + f2y, cfg.FOOT_W, cfg.FOOT_H);
        if ((h.state === "escape" || h.state === "lost") && Math.sin(t) > 0) {
          ctx2.save();
          ctx2.translate(bodyR * cfg.SWEAT_X_OFF, bodyR * cfg.SWEAT_Y_OFF);
          ctx2.rotate(cfg.SWEAT_ROTATION * Math.PI / 180);
          ctx2.font = "12px sans-serif";
          ctx2.fillText(cfg.SWEAT_TEXT, 0, 0);
          ctx2.restore();
        }
      } else if (h.state === "climb") {
        let sway = Math.sin(t * 1.5) * cfg.SWAY_AMP;
        let f1y = Math.sin(t * 1.5) * 4;
        let f2y = Math.sin(t * 1.5 + Math.PI) * 4;
        let h1y = f2y;
        let h2y = f1y;
        drawPart(ctx2, P_HAND, -bodyR - cfg.CLIMB_HAND_X_OFF + sway, bodyR * cfg.CLIMB_HAND_Y_OFF + h1y, cfg.HAND_SIZE, cfg.HAND_SIZE);
        drawPart(ctx2, P_HAND, bodyR - cfg.CLIMB_HAND_X_OFF * 2 + sway, bodyR * cfg.CLIMB_HAND_Y_OFF + h2y, cfg.HAND_SIZE, cfg.HAND_SIZE);
        drawPart(ctx2, P_BODY, -bodyR + sway, -bodyR * 2, bodyR * 2 * (cfg.BODY_SIZE_RATIO / 2), bodyR * 2 * (cfg.BODY_SIZE_RATIO / 2));
        drawPart(ctx2, P_FOOT_C, -bodyR / 2 - cfg.CLIMB_FOOT_X_OFF + sway, bodyR * cfg.CLIMB_FOOT_Y_OFF + f1y, cfg.CLIMB_FOOT_W, cfg.CLIMB_FOOT_H);
        drawPart(ctx2, P_FOOT_C, bodyR / 2 - cfg.CLIMB_FOOT_X_OFF + sway, bodyR * cfg.CLIMB_FOOT_Y_OFF + f2y, cfg.CLIMB_FOOT_W, cfg.CLIMB_FOOT_H);
        if (Math.sin(t * 2) > 0) {
          ctx2.save();
          ctx2.translate(bodyR * cfg.SWEAT_X_OFF + sway, bodyR * cfg.SWEAT_Y_OFF);
          ctx2.rotate(cfg.SWEAT_ROTATION * Math.PI / 180);
          ctx2.font = "10px sans-serif";
          ctx2.fillText(cfg.SWEAT_TEXT, 0, 0);
          ctx2.restore();
        }
      } else if (h.state === "fall" || h.state === "drown") {
        let flap = Math.sin(t * 3) > 0 ? -1 : 1;
        drawPart(ctx2, P_HAND, -bodyR - cfg.FALL_HAND_X_OFF / 2, -bodyR * 2 + flap * 4, cfg.HAND_SIZE, cfg.HAND_SIZE);
        drawPart(ctx2, P_HAND, bodyR - 2, -bodyR * 2 - flap * 4, cfg.HAND_SIZE, cfg.HAND_SIZE);
        drawPart(ctx2, P_BODY, -bodyR, -bodyR * 2, bodyR * 2, bodyR * 2);
        drawPart(ctx2, P_FOOT_N, -bodyR / 2 - cfg.FALL_FOOT_X_OFF / 2 + flap * 2, -2, cfg.FOOT_W, cfg.FOOT_H);
        drawPart(ctx2, P_FOOT_N, bodyR / 2 - cfg.FALL_FOOT_X_OFF / 2 - flap * 2, -2, cfg.FOOT_W, cfg.FOOT_H);
      } else if (h.state === "fell_over") {
        drawPart(ctx2, P_HAND, -bodyR - cfg.FELL_OVER_HAND_X_OFF / 2, -bodyR * 0.5, cfg.HAND_SIZE, cfg.HAND_SIZE);
        drawPart(ctx2, P_HAND, bodyR - cfg.FELL_OVER_HAND_X_OFF / 2, -bodyR * 0.5, cfg.HAND_SIZE, cfg.HAND_SIZE);
        drawPart(ctx2, P_BODY, -bodyR, -bodyR, bodyR * 2, bodyR * 2);
        drawPart(ctx2, P_FOOT_N, -bodyR / 2 - cfg.FELL_OVER_FOOT_X_OFF / 2, -bodyR * 1.5, cfg.FOOT_W, cfg.FOOT_H);
        drawPart(ctx2, P_FOOT_N, bodyR / 2 - cfg.FELL_OVER_FOOT_X_OFF / 2, -bodyR * 1.5, cfg.FOOT_W, cfg.FOOT_H);
      } else if (h.state === "goal") {
        const sub = h.goalSubState || 0;
        let bounce = 0;
        let h1y = 0, h2y = 0;
        let f1y = 0, f2y = 0;
        let rot = 0;
        if (sub === 0) {
          h2y = -bodyR * 1.5;
        } else if (sub === 1 || sub === 4) {
          bounce = Math.abs(Math.sin(t * 2)) * 8;
          h1y = -bodyR * 1.5;
          h2y = -bodyR * 1.5;
        } else if (sub === 3) {
          bounce = Math.abs(Math.sin(t)) * cfg.BOUNCE_AMP;
          f1y = Math.sin(t) * 4;
          f2y = -Math.sin(t) * 4;
        }
        ctx2.save();
        if (sub === 2) {
          ctx2.scale(Math.cos(t * 0.8), 1);
        }
        ctx2.translate(0, -bounce);
        drawPart(ctx2, P_HAND, -bodyR - cfg.HAND_X_OFF, cfg.HAND_Y_OFF_B * bodyR + h1y, cfg.HAND_SIZE, cfg.HAND_SIZE);
        drawPart(ctx2, P_HAND, bodyR - cfg.HAND_X_OFF, cfg.HAND_Y_OFF_B * bodyR + h2y, cfg.HAND_SIZE, cfg.HAND_SIZE);
        drawPart(ctx2, P_BODY, -bodyR, -bodyR * 2, bodyR * 2, bodyR * 2);
        drawPart(ctx2, P_FOOT_N, -bodyR / 2 - cfg.FOOT_X_OFF, cfg.FOOT_Y_OFF + f1y, cfg.FOOT_W, cfg.FOOT_H);
        drawPart(ctx2, P_FOOT_N, bodyR / 2 - cfg.FOOT_X_OFF, cfg.FOOT_Y_OFF + f2y, cfg.FOOT_W, cfg.FOOT_H);
        ctx2.restore();
      }
      if (h.isVIP) {
        ctx2.fillStyle = "gold";
        ctx2.fillRect(-4, -bodyR * 2 - 6, 8, 4);
      }
      if (h.speechTimer > 0 && speechSprites[h.speechText]) {
        const s = speechSprites[h.speechText];
        ctx2.drawImage(humanAtlas, s.x, s.y, s.w, s.h, -s.w / 2, -bodyR * 2 - 15, s.w, s.h);
      } else if (h.state === "escape" && Math.random() < 0.1) {
        const s = speechSprites["\u03A3"];
        if (s) {
          const ox = HUMAN_RENDER_CONFIG.SIGMA_OFFSET_X;
          const oy = HUMAN_RENDER_CONFIG.SIGMA_OFFSET_Y;
          ctx2.drawImage(humanAtlas, s.x, s.y, s.w, s.h, ox - s.w / 2, -bodyR + oy - s.h / 2, s.w, s.h);
        }
      }
      ctx2.restore();
    }
  }

  // ui/humanEditor.js
  var EDITOR_BUTTONS = [];
  var PAGES = [
    { name: "Common", params: ["BODY_SIZE_RATIO", "FOOT_W", "FOOT_H", "HAND_SIZE", "SPEECH_FONT_SIZE", "SIGMA_SIZE", "SIGMA_OFFSET_X", "SIGMA_OFFSET_Y", "SIGMA_ROTATION"] },
    { name: "Walk/Esc", params: ["BOUNCE_AMP", "FOOT_X_OFF", "FOOT_Y_OFF", "HAND_X_OFF", "HAND_Y_OFF_B", "SWEAT_X_OFF", "SWEAT_Y_OFF", "SWEAT_ROTATION"] },
    { name: "Climb", params: ["SWAY_AMP", "CLIMB_FOOT_X_OFF", "CLIMB_FOOT_Y_OFF", "CLIMB_HAND_X_OFF", "CLIMB_HAND_Y_OFF", "CLIMB_FOOT_W", "CLIMB_FOOT_H"] },
    { name: "Fall/Drown", params: ["FALL_FOOT_X_OFF", "FALL_HAND_X_OFF"] },
    { name: "Fell Over", params: ["FELL_OVER_FOOT_X_OFF", "FELL_OVER_HAND_X_OFF"] }
  ];
  function initEditor() {
    setState("human_edit");
    const h = new Human(999, 0, 0);
    h.state = editorState;
    setEditorHuman(h);
    refreshButtons();
  }
  function refreshButtons() {
    EDITOR_BUTTONS.length = 0;
    EDITOR_BUTTONS.push({
      type: "page_nav",
      dir: -1,
      rect: { x: 10, y: 10, w: 30, h: 25 }
    });
    EDITOR_BUTTONS.push({
      type: "page_nav",
      dir: 1,
      rect: { x: 180, y: 10, w: 30, h: 25 }
    });
    const currentPage = PAGES[editorPage];
    if (currentPage) {
      currentPage.params.forEach((p, i) => {
        EDITOR_BUTTONS.push({
          type: "param",
          name: p,
          y: 60 + i * 22,
          minusRect: { x: 135, y: 60 + i * 22 - 12, w: 20, h: 20 },
          plusRect: { x: 205, y: 60 + i * 22 - 12, w: 20, h: 20 }
        });
      });
    }
    const states = ["walk", "climb", "fall", "escape", "fell_over", "drown"];
    states.forEach((s, i) => {
      EDITOR_BUTTONS.push({
        type: "state",
        name: s,
        rect: { x: 420, y: 60 + i * 35, w: 80, h: 30 }
      });
    });
  }
  function handleEditorClick(mx, my) {
    for (let btn of EDITOR_BUTTONS) {
      if (btn.type === "page_nav") {
        if (mx >= btn.rect.x && mx <= btn.rect.x + btn.rect.w && my >= btn.rect.y && my <= btn.rect.y + btn.rect.h) {
          let next = editorPage + btn.dir;
          if (next < 0) next = PAGES.length - 1;
          if (next >= PAGES.length) next = 0;
          setEditorPage(next);
          refreshButtons();
          return true;
        }
      } else if (btn.type === "param") {
        if (mx >= btn.minusRect.x && mx <= btn.minusRect.x + btn.minusRect.w && my >= btn.minusRect.y && my <= btn.minusRect.y + btn.minusRect.h) {
          HUMAN_RENDER_CONFIG[btn.name] = Math.round((HUMAN_RENDER_CONFIG[btn.name] - 0.1) * 10) / 10;
          if (btn.name === "SPEECH_FONT_SIZE" || btn.name === "SIGMA_ROTATION" || btn.name === "SIGMA_SIZE") initHumanAtlas();
          return true;
        }
        if (mx >= btn.plusRect.x && mx <= btn.plusRect.x + btn.plusRect.w && my >= btn.plusRect.y && my <= btn.plusRect.y + btn.plusRect.h) {
          HUMAN_RENDER_CONFIG[btn.name] = Math.round((HUMAN_RENDER_CONFIG[btn.name] + 0.1) * 10) / 10;
          if (btn.name === "SPEECH_FONT_SIZE" || btn.name === "SIGMA_ROTATION" || btn.name === "SIGMA_SIZE") initHumanAtlas();
          return true;
        }
      } else if (btn.type === "state") {
        if (mx >= btn.rect.x && mx <= btn.rect.x + btn.rect.w && my >= btn.rect.y && my <= btn.rect.y + btn.rect.h) {
          setEditorState(btn.name);
          editorHuman.state = btn.name;
          return true;
        }
      }
    }
    return false;
  }
  function forceSpeech() {
    const keys = Object.keys(HUMAN_SPEECH_DICT);
    const key = keys[Math.floor(Math.random() * keys.length)];
    const texts = HUMAN_SPEECH_DICT[key];
    editorHuman.speechText = texts[Math.floor(Math.random() * texts.length)];
    editorHuman.speechTimer = 3;
  }
  function updateEditor(dt) {
    if (!editorHuman) return;
    editorHuman.animTime += dt;
    if (editorHuman.speechTimer > 0) editorHuman.speechTimer -= dt;
    if (elapsed - editorLastSpeech >= 10) {
      forceSpeech();
      setEditorLastSpeech(elapsed);
    }
  }

  // render/renderer.js
  init_constants();
  init_world();
  init_stateManager();

  // text/human_text_jp.js
  var TEXT_JP = {
    TITLE: "\u4E16\u754C\u6C88\u6CA1",
    PUSH_SPACE: "PUSH SPACE KEY",
    INTRO_LINES: [
      "\u3042\u308B\u65E5\u3001\u7A81\u5982\u3068\u3057\u3066",
      "\u4E16\u754C\u4E2D\u306E\u6C34\u4F4D\u304C\u4E0A\u6607\u3057\u306F\u3058\u3081\u305F\u3002",
      "\u3053\u306E\u307E\u307E\u3067\u306F\u4E16\u754C\u306F\u6C88\u6CA1\u3057\u3066\u3057\u307E\u3046\uFF01",
      "",
      "\u795E\u3067\u3042\u308B\u8CB4\u65B9\u306E\u529B\u3067\u300C\u5927\u5730\u300D\u3092\u4F5C\u308A\u51FA\u3057",
      "\u4EBA\u985E\u3092\u6C88\u6CA1\u304B\u3089\u6551\u3046\u306E\u3060\uFF01"
    ],
    INTRO_CONTROLS: [
      "\u3010\u64CD\u4F5C\u3011",
      "\u2190 \u2192 : \u30D6\u30ED\u30C3\u30AF\u79FB\u52D5",
      "\u2191 : \u56DE\u8EE2\u3000\u2193 : \u9AD8\u901F\u843D\u4E0B",
      "",
      "\u3010\u30EB\u30FC\u30EB\u3011",
      "\u5730\u9762\u306F4\u3064\u4EE5\u4E0A\u7E4B\u304C\u308B\u3068\u6D88\u3048\u308B",
      "\u6A2A\u4E00\u5217\u304C\u5730\u9762\u3067\u57CB\u307E\u3063\u305F\u9AD8\u3055\u304C\u5B89\u5168\u9AD8\u5EA6",
      "\u6C34\u4F4D\u304C\u5B89\u5168\u9AD8\u5EA6\u3092\u8D85\u3048\u308B\u3068\u4E16\u754C\u6C88\u6CA1\u306E\u5371\u6A5F",
      "\u5B89\u5168\u9AD8\u5EA6\u3092\u30B4\u30FC\u30EB\u307E\u3067\u4F5C\u308A\u4E0A\u3052\u3088\u3046\uFF01"
    ],
    LIMIT_WARNING_LINES: [
      "\u5730\u9762\u306F\u5B89\u5168\u9AD8\u5EA6\u304B\u3089",
      "6\u30D6\u30ED\u30C3\u30AF\u4E0A\u307E\u3067\u3057\u304B",
      "\u7A4D\u3081\u307E\u305B\u3093\uFF01"
    ],
    CAUTION: "!!! CAUTION !!!",
    FLOOD_WARNING_1: "\u6C34\u4F4D\u304C\u5B89\u5168\u9AD8\u5EA6\u3092\u8D8A\u3048\u307E\u3057\u305F\uFF01",
    FLOOD_WARNING_2: "\u901F\u3084\u304B\u306B\u8131\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\uFF01",
    FLOOD_COUNTDOWN: "\u4E16\u754C\u6C88\u6CA1\u307E\u3067\u3042\u3068",
    SEC: "\u79D2",
    WATER_LEVEL: "\u6C34\u4F4D",
    GOAL: "\u30B4\u30FC\u30EB",
    SAFE_HEIGHT: "\u5B89\u5168\u9AD8\u5EA6",
    GAME_OVER: "GAME OVER",
    CONGRATULATIONS: "congratulations\uFF01",
    GOAL_TEXT: "GOOL!!"
  };

  // render/renderer.js
  init_block();
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var clouds = [];
  function resetClouds() {
    clouds = Array.from({ length: CLOUD_COUNT }, () => ({
      x: Math.random() * 340,
      y: Math.random() * TOTAL_ROWS,
      s: 18 + Math.random() * 28
    }));
  }
  resetClouds();
  var screenY = (y) => (y - cameraY) * SIZE;
  function radarYByMeters(m) {
    const clamped = Math.max(0, Math.min(GOAL_METERS, m));
    const innerTop = RADAR_V_PAD;
    const innerBottom = RADAR_CANVAS_H - RADAR_V_PAD;
    const innerH = Math.max(1, innerBottom - innerTop);
    return innerBottom - clamped / GOAL_METERS * innerH;
  }
  function drawSkyAndClouds(targetCtx, width, height, xOffset = 0, totalWidth = width) {
    let brightness = 1;
    const distance = heightMeters() - water * METERS_PER_ROW;
    if (distance < DANGER_PROXIMITY_BLOCKS * METERS_PER_ROW) {
      brightness = PROXIMITY_BRIGHTNESS_DROP;
    }
    if (floodPhase === "countdown") {
      const remain = Math.max(0, floodCountdownEnd - elapsed);
      const progress = 1 - remain / DANGER_COUNTDOWN_SECONDS;
      brightness *= 1 - progress * 0.9;
    } else if (currentPhase === 2) brightness *= 0.8;
    else if (currentPhase === 3) brightness *= 0.7;
    else if (currentPhase === 4) brightness *= 0.6;
    targetCtx.fillStyle = darkenColor(SKY_TOP, brightness);
    if (thunderFlashTimer > 0) targetCtx.fillStyle = "#FFFFFF";
    targetCtx.fillRect(-50, -50, width + 100, height + 100);
    targetCtx.save();
    targetCtx.globalAlpha = CLOUD_ALPHA * brightness;
    const cloudGray = Math.floor(255 * brightness);
    targetCtx.fillStyle = `rgb(${cloudGray},${cloudGray},${cloudGray})`;
    const nowSec = performance.now() / 1e3;
    for (const c of clouds) {
      const wrapW = Math.max(1, totalWidth);
      const worldX = (c.x + nowSec * CLOUD_DRIFT_PX_PER_SEC) % (wrapW + c.s * 2) - c.s;
      const x = worldX - xOffset;
      const y = (c.y - cameraY * CLOUD_PARALLAX) * SIZE;
      const py = y % (height + c.s * 4);
      const cy = py - c.s * 2;
      if (cy < -120 || cy > 600) continue;
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
  function drawRain() {
    ctx.save();
    ctx.strokeStyle = "rgba(200, 220, 255, 0.4)";
    ctx.lineWidth = 1;
    rainParticles.forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.len * 0.1, p.y + p.len);
      ctx.stroke();
    });
    ctx.restore();
  }
  function drawWater() {
    const wy = screenY(waterWorldY());
    const waterBaseY = wy;
    let amp = BASE_WAVE_AMPLITUDE;
    const distance = heightMeters() - water * METERS_PER_ROW;
    if (distance < DANGER_PROXIMITY_BLOCKS * METERS_PER_ROW) {
      amp = DANGER_WAVE_AMPLITUDE;
    }
    if (currentPhase >= 3) amp = 10;
    if (currentPhase === 4) amp = 10 * (1 + (Math.random() - 0.5) * 0.4);
    const phase1 = elapsed * (Math.PI * 2 / WAVE_PERIOD_1);
    const phase2 = elapsed * (Math.PI * 2 / WAVE_PERIOD_2);
    const grad = ctx.createLinearGradient(0, waterBaseY - amp, 0, MAIN_H);
    const toRGBA = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };
    grad.addColorStop(0, toRGBA(WATER_TOP_COLOR, WATER_ALPHA));
    grad.addColorStop(0.5, toRGBA(WATER_MID_COLOR, WATER_ALPHA));
    grad.addColorStop(1, toRGBA(WATER_BOTTOM_COLOR, WATER_ALPHA));
    ctx.save();
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-50, MAIN_H + 50);
    ctx.lineTo(-50, waterBaseY);
    for (let x = -50; x <= TOTAL_W + 50; x += 5) {
      const wave = Math.sin(x / 80 + phase1) * amp + Math.cos(x / 50 + phase2) * (amp * 0.3);
      ctx.lineTo(x, waterBaseY + wave);
    }
    ctx.lineTo(TOTAL_W + 50, MAIN_H + 50);
    ctx.closePath();
    ctx.fill();
    if (state === "playing" || state === "gameover") {
      ctx.strokeStyle = WATER_HIGHLIGHT_COLOR;
      ctx.lineWidth = WATER_HIGHLIGHT_THICKNESS;
      ctx.beginPath();
      for (let x = -50; x <= TOTAL_W + 50; x += 5) {
        const wave = Math.sin(x / 80 + phase1) * amp + Math.cos(x / 50 + phase2) * (amp * 0.3);
        if (x === -50) ctx.moveTo(x, waterBaseY + wave);
        else ctx.lineTo(x, waterBaseY + wave);
      }
      ctx.stroke();
      if (state !== "gameover") {
        ctx.font = "10px sans-serif";
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(0,0,0,0.85)";
        ctx.fillStyle = WATER_LINE;
        ctx.strokeText("\u6C34\u4F4D", 15, waterBaseY - 15);
        ctx.fillText("\u6C34\u4F4D", 15, waterBaseY - 15);
        ctx.strokeText(waterMeters() + "m", 18, waterBaseY - 2);
        ctx.fillText(waterMeters() + "m", 18, waterBaseY - 2);
      }
    }
    ctx.restore();
  }
  function drawCountdownUI() {
    if (state !== "playing") return;
    const remain = floodPhase === "countdown" ? Math.max(0, floodCountdownEnd - elapsed) : Math.max(0, heightMeters() / METERS_PER_ROW / WATER_SPEED - elapsed);
    ctx.save();
    let color = UI_COUNTDOWN_NORMAL_COLOR;
    let scale = 1;
    let isDanger = floodPhase === "countdown" && remain <= DANGER_COUNTDOWN_SECONDS;
    if (isDanger) {
      color = UI_COUNTDOWN_DANGER_COLOR;
      const t = elapsed % UI_COUNTDOWN_ANIM_PERIOD / UI_COUNTDOWN_ANIM_PERIOD;
      const s = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
      scale = UI_COUNTDOWN_SCALE_MIN + s * (UI_COUNTDOWN_SCALE_MAX - UI_COUNTDOWN_SCALE_MIN);
    }
    const cx = UI_COUNTDOWN_X + UI_COUNTDOWN_CENTER_OFFSET_X;
    const cy = MAIN_H - UI_COUNTDOWN_Y - UI_COUNTDOWN_CENTER_OFFSET_Y;
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = UI_COUNTDOWN_FONT;
    ctx.lineWidth = UI_COUNTDOWN_TEXT_OUTLINE_WIDTH;
    ctx.strokeStyle = UI_COUNTDOWN_TEXT_OUTLINE_COLOR;
    const text = `\u6C34\u6CA1\u307E\u3067 ${remain.toFixed(1)}\u79D2`;
    ctx.strokeText(text, 0, 0);
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
  function drawCautionUI() {
    if (floodPhase !== "blink") return;
    const t = UI_CAUTION_ANIM_DURATION + UI_CAUTION_FADE_OUT_DURATION - cautionAnimTimer;
    let scale = 1;
    let opacity = 1;
    if (t < UI_CAUTION_ANIM_DURATION) {
      const p = t / UI_CAUTION_ANIM_DURATION;
      const easeOut = 1 - Math.pow(1 - p, 3);
      scale = 1.5 - 0.5 * easeOut;
      opacity = easeOut;
    } else {
      opacity = 1 - (t - UI_CAUTION_ANIM_DURATION) / UI_CAUTION_FADE_OUT_DURATION;
    }
    ctx.save();
    ctx.globalAlpha = opacity;
    const cx = OFFSET_X + COLS * SIZE / 2;
    const cy = 240;
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.font = UI_CAUTION_FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = UI_CAUTION_STOKE_WIDTH;
    ctx.strokeStyle = UI_CAUTION_STOKE_COLOR;
    ctx.strokeText(UI_CAUTION_TEXT, 0, 0);
    ctx.fillStyle = UI_CAUTION_COLOR;
    ctx.fillText(UI_CAUTION_TEXT, 0, 0);
    ctx.restore();
  }
  function drawRadar() {
    if (state === "gameover") return;
    const rctx = ctx;
    const radarHeight = RADAR_CANVAS_H;
    rctx.save();
    rctx.translate(RADAR_X, 0);
    if (state === "title" || state === "intro") {
      rctx.restore();
      return;
    }
    const rx0 = RADAR_PAD;
    const innerTop = RADAR_V_PAD;
    const innerBottom = radarHeight - RADAR_V_PAD;
    const innerH = Math.max(1, innerBottom - innerTop);
    rctx.fillStyle = "rgba(0,0,0,0.35)";
    rctx.fillRect(rx0, innerTop, RADAR_INNER_W, innerH);
    rctx.strokeStyle = "#888";
    rctx.strokeRect(rx0, innerTop, RADAR_INNER_W, innerH);
    const showDetails = state === "playing" || state === "gameover";
    if (radarAbstractionMode) {
      for (let y = 0; y < TOTAL_ROWS; y++) {
        let count = 0;
        for (let x = 0; x < COLS; x++) {
          if (grid[y][x] && grid[y][x] !== 9) count++;
        }
        if (count > 0) {
          const m = (TOTAL_ROWS - y - 1) * METERS_PER_ROW;
          if (m < 0 || m > GOAL_METERS) continue;
          const ry = radarYByMeters(m);
          const rh = Math.max(1, innerH / GOAL_METERS * METERS_PER_ROW);
          let opacity = 0.2;
          if (count >= 5) opacity = 0.8;
          else if (count >= 3) opacity = 0.5;
          rctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          rctx.fillRect(rx0, ry, RADAR_INNER_W, rh);
        }
      }
    } else {
      const sx = RADAR_INNER_W / COLS;
      for (let y = 0; y < TOTAL_ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (grid[y][x] && grid[y][x] !== 9) {
            const m = (TOTAL_ROWS - y - 1) * METERS_PER_ROW;
            if (m < 0 || m > GOAL_METERS) continue;
            const ry = radarYByMeters(m);
            const rh = Math.max(1, innerH / GOAL_METERS * METERS_PER_ROW);
            let c = typeof grid[y][x] === "object" ? grid[y][x].color : grid[y][x];
            rctx.fillStyle = COLORS[c];
            rctx.fillRect(rx0 + x * sx, ry, sx, rh);
          }
        }
      }
    }
    const sx_h = RADAR_INNER_W / COLS;
    const rh_h = Math.max(1, innerH / GOAL_METERS * METERS_PER_ROW);
    for (let h of humans) {
      let gx = (h.x - OFFSET_X) / SIZE;
      let hm = (TOTAL_ROWS - h.y / SIZE - 1) * METERS_PER_ROW;
      if (hm < 0 || hm > GOAL_METERS) continue;
      let ry = radarYByMeters(hm);
      rctx.fillStyle = h.isVIP ? "gold" : "#FFF";
      rctx.beginPath();
      rctx.arc(rx0 + gx * sx_h + sx_h / 2, ry + rh_h / 2, sx_h * 0.7, 0, Math.PI * 2);
      rctx.fill();
    }
    const drawLine = (m, color, label) => {
      const ry = radarYByMeters(m);
      rctx.strokeStyle = color;
      rctx.lineWidth = RADAR_LINE_WIDTH;
      rctx.beginPath();
      rctx.moveTo(rx0, ry);
      rctx.lineTo(rx0 + RADAR_INNER_W + 40, ry);
      rctx.stroke();
      rctx.fillStyle = color;
      rctx.font = "11px sans-serif";
      rctx.textAlign = "right";
      rctx.fillText(`${label} ${Math.round(m)}m`, rx0 + RADAR_INNER_W + 55, ry - 5);
    };
    if (showDetails) {
      drawLine(GOAL_METERS, GOAL_LINE, TEXT_JP.GOAL);
      const renderMeters = Math.max(0, (TOTAL_ROWS - renderSafeLine - 2) * METERS_PER_ROW);
      drawLine(renderMeters, SAFE_LINE, TEXT_JP.SAFE_HEIGHT);
      drawLine(waterMeters(), WATER_LINE, TEXT_JP.WATER_LEVEL);
      const cy1 = radarYByMeters((TOTAL_ROWS - cameraY - 1) * METERS_PER_ROW);
      const cy2 = radarYByMeters((TOTAL_ROWS - (cameraY + ROWS) - 1) * METERS_PER_ROW);
      rctx.fillStyle = RADAR_VIEW_BOX_COLOR;
      rctx.fillRect(rx0, cy1, RADAR_INNER_W, cy2 - cy1);
      rctx.strokeStyle = RADAR_VIEW_BOX_BORDER_COLOR;
      rctx.strokeRect(rx0, cy1, RADAR_INNER_W, cy2 - cy1);
    }
    rctx.restore();
  }
  function draw(dt = 0) {
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (state !== "gameover") ctx.translate(shakeOffset.x, shakeOffset.y);
    ctx.clearRect(-50, -50, TOTAL_W + 100, MAIN_H + 100);
    drawSkyAndClouds(ctx, TOTAL_W, MAIN_H, 0, TOTAL_W);
    drawRain();
    if (state === "title" || state === "intro") {
      drawOverlays();
    } else {
      if (state === "playing") {
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(OFFSET_X, 0, COLS * SIZE, MAIN_H);
      }
      if (state !== "clear") {
        let gy = screenY(TOTAL_ROWS - 1);
        ctx.fillStyle = GROUND;
        ctx.fillRect(0, gy, TOTAL_W, SIZE);
      }
      drawGridBlocks();
      if (state === "playing" && pair) {
        renderBlocks(pair).forEach((b) => {
          drawBlockCell(b.x * SIZE + OFFSET_X, screenY(b.y), COLORS[b.c]);
        });
      }
      if (state === "playing") drawGameGuides();
      drawWater();
      if (state === "playing" || state === "goal_wait") {
        drawCountdownUI();
        drawCautionUI();
        drawLimitWarning();
        drawFallingBombs();
        drawHumans(ctx, cameraY * SIZE);
      }
      drawParticles();
      if (state === "clear") {
        drawHumans(ctx, cameraY * SIZE);
        drawClearUI();
      }
      if (state === "gameover") {
        drawHumans(ctx, cameraY * SIZE);
        drawGameOverUI();
      }
      drawDebugMessage();
    }
    ctx.restore();
    drawRadar();
    drawFps();
    if (state === "human_edit") {
      updateEditor(dt);
      drawEditMode();
      return;
    }
    if (isPaused) {
      drawPauseUI();
    }
  }
  function drawPauseUI() {
    ctx.save();
    ctx.fillStyle = UI_PAUSE_OVERLAY_COLOR;
    ctx.fillRect(0, 0, TOTAL_W, MAIN_H);
    const now = performance.now() / 1e3;
    if (now % UI_PAUSE_BLINK_PERIOD < UI_PAUSE_BLINK_PERIOD / 2) {
      ctx.fillStyle = UI_PAUSE_TEXT_COLOR;
      ctx.font = UI_PAUSE_FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(UI_PAUSE_TEXT, TOTAL_W / 2, MAIN_H / 2);
    }
    ctx.restore();
  }
  function drawGameGuides() {
    ctx.strokeStyle = UI_SIDE_LINE_COLOR;
    ctx.lineWidth = UI_SIDE_LINE_WIDTH;
    ctx.beginPath();
    ctx.moveTo(OFFSET_X, 0);
    ctx.lineTo(OFFSET_X, MAIN_H);
    ctx.moveTo(OFFSET_X + COLS * SIZE, 0);
    ctx.lineTo(OFFSET_X + COLS * SIZE, MAIN_H);
    ctx.stroke();
    const goalWorldY = TOTAL_ROWS - 1 - GOAL_METERS / METERS_PER_ROW;
    const gy = screenY(goalWorldY);
    ctx.strokeStyle = GOAL_LINE;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(OFFSET_X - 60, gy);
    ctx.lineTo(OFFSET_X + COLS * SIZE, gy);
    ctx.stroke();
    drawGuideText("\u30B4\u30FC\u30EB", GOAL_METERS + "m", 15, gy, GOAL_LINE);
    let sly = screenY(renderSafeLine + 1);
    ctx.strokeStyle = SAFE_LINE;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, sly);
    ctx.lineTo(OFFSET_X + COLS * SIZE, sly);
    ctx.stroke();
    const currentM = Math.max(0, Math.round((TOTAL_ROWS - renderSafeLine - 2) * METERS_PER_ROW));
    drawGuideText("\u5B89\u5168\u9AD8\u5EA6", currentM + "m", 10, sly, SAFE_LINE);
  }
  function drawGuideText(label, value, x, y, color) {
    ctx.font = "10px sans-serif";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(0,0,0,0.85)";
    ctx.fillStyle = color;
    ctx.strokeText(label, x, y - 15);
    ctx.fillText(label, x, y - 15);
    ctx.strokeText(value, x + 5, y - 2);
    ctx.fillText(value, x + 5, y - 2);
  }
  function drawLimitWarning() {
    if (state !== "playing") return;
    if (floodPhase === "none" && elapsed < limitWarningUntil) {
      ctx.save();
      ctx.font = "18px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const cx = OFFSET_X + COLS * SIZE / 2, cy = 240;
      const lh = 22;
      const totalH = (LIMIT_WARNING_LINES.length - 1) * lh;
      LIMIT_WARNING_LINES.forEach((line, i) => {
        const y = cy - totalH / 2 + i * lh;
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(0,0,0,0.85)";
        ctx.strokeText(line, cx, y);
        ctx.fillStyle = "#ffeb3b";
        ctx.fillText(line, cx, y);
      });
      ctx.restore();
    }
  }
  function drawDebugMessage() {
    if (debugMessageTimer > 0) {
      ctx.save();
      ctx.font = "bold 20px sans-serif";
      ctx.fillStyle = "#FF0000";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const cx = OFFSET_X + COLS * SIZE / 2;
      ctx.fillText(debugMessage, cx, 10);
      ctx.restore();
    }
  }
  function drawFallingBombs() {
    fallingBombs.forEach((b) => {
      const px = b.x * SIZE + OFFSET_X;
      const py = screenY(b.y);
      drawBomb(px, py, b.timer);
    });
  }
  function drawFps() {
    ctx.save();
    ctx.fillStyle = "#0f0";
    ctx.font = "12px monospace";
    ctx.textAlign = "right";
    ctx.fillText(`FPS: ${fps}`, TOTAL_W - 10, 20);
    ctx.restore();
  }
  function drawGridBlocks() {
    for (let y = 0; y < ROWS + 1; y++) {
      for (let x = 0; x < COLS; x++) {
        let gy = y + Math.floor(cameraY);
        if (gy >= 0 && gy < TOTAL_ROWS && grid[gy][x] && grid[gy][x] !== 9) {
          let cell = grid[gy][x];
          let isBomb = typeof cell === "object" && cell.type === "bomb";
          let color = isBomb ? null : typeof cell === "object" ? COLORS[cell.color] : COLORS[cell];
          let offsetY = typeof cell === "object" && cell.renderOffsetY ? cell.renderOffsetY * SIZE : 0;
          let px = x * SIZE + OFFSET_X;
          let py = screenY(gy) + offsetY;
          if (isBomb) drawBomb(px, py, cell.timer, cell.state === "cracking" ? cell.crackTimer : null);
          else drawBlockCell(px, py, color, cell.state === "cracking" ? cell.timer : null);
        }
      }
    }
  }
  function drawOverlays() {
    const cx = TOTAL_W / 2;
    if (state === "title") {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, TOTAL_W, MAIN_H);
      const blink = Math.floor(elapsed * 2) % 2 === 0;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 10;
      ctx.strokeStyle = "rgba(20,20,40,0.95)";
      ctx.fillStyle = "#f7f7ff";
      ctx.font = "64px sans-serif";
      ctx.strokeText(TEXT_JP.TITLE, cx, 200);
      ctx.fillText(TEXT_JP.TITLE, cx, 200);
      if (blink) {
        ctx.font = "28px sans-serif";
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgba(0,0,0,0.9)";
        ctx.fillStyle = "#ffd54f";
        ctx.strokeText(TEXT_JP.PUSH_SPACE, cx, 315);
        ctx.fillText(TEXT_JP.PUSH_SPACE, cx, 315);
      }
      ctx.restore();
    } else if (state === "intro") {
      ctx.fillStyle = "rgba(0,0,0,0.48)";
      ctx.fillRect(28, 28, TOTAL_W - 56, MAIN_H - 56);
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(0,0,0,0.92)";
      ctx.fillStyle = "#fff";
      ctx.font = "22px sans-serif";
      let y = 50;
      for (const line of TEXT_JP.INTRO_LINES) {
        if (line === "") {
          y += 10;
          continue;
        }
        ctx.strokeText(line, cx, y);
        ctx.fillText(line, cx, y);
        y += 30;
      }
      ctx.font = "15px sans-serif";
      y += 8;
      for (const line of TEXT_JP.INTRO_CONTROLS) {
        if (line === "") {
          y += 6;
          continue;
        }
        ctx.strokeText(line, cx, y);
        ctx.fillText(line, cx, y);
        y += 21;
      }
      const blink = Math.floor(elapsed * 2) % 2 === 0;
      if (blink) {
        ctx.font = "26px sans-serif";
        ctx.fillStyle = "#ffd54f";
        ctx.strokeText(TEXT_JP.PUSH_SPACE, cx, MAIN_H - 50);
        ctx.fillText(TEXT_JP.PUSH_SPACE, cx, MAIN_H - 50);
      }
      ctx.restore();
    }
  }
  function drawClearUI() {
    const t = Math.max(0, elapsed - clearStart);
    const p = Math.min(1, t / 2.4);
    const ease = 1 - Math.pow(1 - p, 3);
    const cx = OFFSET_X + COLS * SIZE / 2;
    const startY = 560, targetY = 230;
    const y = startY + (targetY - startY) * ease;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(0,0,0,0.9)";
    ctx.fillStyle = "#fff";
    ctx.font = "52px sans-serif";
    ctx.strokeText(TEXT_JP.GOAL_TEXT, cx, y - 35);
    ctx.fillText(TEXT_JP.GOAL_TEXT, cx, y - 35);
    ctx.font = "28px sans-serif";
    ctx.strokeText(TEXT_JP.CONGRATULATIONS, cx, y + 30);
    ctx.fillText(TEXT_JP.CONGRATULATIONS, cx, y + 30);
    if (p >= 1 && Math.floor(t * 2) % 2 === 0) {
      ctx.font = "18px sans-serif";
      ctx.strokeText(TEXT_JP.PUSH_SPACE, cx, y + 95);
      ctx.fillText(TEXT_JP.PUSH_SPACE, cx, y + 95);
    }
    confetti.forEach((p2) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p2.life / 90);
      ctx.translate(p2.x, p2.y);
      ctx.rotate(p2.r);
      ctx.fillStyle = p2.c;
      ctx.fillRect(-p2.w / 2, -p2.h / 2, p2.w, p2.h);
      ctx.restore();
    });
    ctx.restore();
  }
  function drawEditMode() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, TOTAL_W, MAIN_H);
    ctx.fillStyle = "#fff";
    ctx.font = "14px monospace";
    ctx.textAlign = "left";
    EDITOR_BUTTONS.forEach((btn) => {
      if (btn.type === "page_nav") {
        ctx.fillStyle = "#444";
        ctx.fillRect(btn.rect.x, btn.rect.y, btn.rect.w, btn.rect.h);
        ctx.fillStyle = "#fff";
        ctx.fillText(btn.dir === -1 ? "\u226A" : "\u226B", btn.rect.x + 8, btn.rect.y + 18);
        if (btn.dir === 1) {
          ctx.textAlign = "center";
          ctx.fillText(PAGES[editorPage].name, btn.rect.x + 10 - 100, btn.rect.y + 18);
          ctx.textAlign = "left";
        }
      } else if (btn.type === "param") {
        ctx.fillStyle = "#fff";
        ctx.fillText(btn.name, 10, btn.y);
        ctx.fillStyle = "#444";
        ctx.fillRect(btn.minusRect.x, btn.minusRect.y, btn.minusRect.w, btn.minusRect.h);
        ctx.fillStyle = "#fff";
        ctx.fillText("\u25BC", btn.minusRect.x + 5, btn.minusRect.y + 18);
        ctx.fillText(HUMAN_RENDER_CONFIG[btn.name], btn.minusRect.x + 35, btn.y);
        ctx.fillStyle = "#444";
        ctx.fillRect(btn.plusRect.x, btn.plusRect.y, btn.plusRect.w, btn.plusRect.h);
        ctx.fillStyle = "#fff";
        ctx.fillText("\u25B2", btn.plusRect.x + 5, btn.plusRect.y + 18);
      } else if (btn.type === "state") {
        ctx.fillStyle = editorState === btn.name ? "#fb0" : "#444";
        ctx.fillRect(btn.rect.x, btn.rect.y, btn.rect.w, btn.rect.h);
        ctx.fillStyle = "#fff";
        ctx.fillText(btn.name, btn.rect.x + 5, btn.rect.y + 20);
      } else if (btn.type === "speech") {
        ctx.fillStyle = "#26a";
        ctx.fillRect(btn.rect.x, btn.rect.y, btn.rect.w, btn.rect.h);
        ctx.fillStyle = "#fff";
        ctx.fillText(btn.name, btn.rect.x + 10, btn.rect.y + 22);
      }
    });
    if (editorHuman) {
      ctx.save();
      ctx.translate(320, 240);
      ctx.scale(2, 2);
      editorHuman.x = 0;
      editorHuman.y = -HUMAN_LOGICAL_SIZE;
      drawHumans(ctx, 0, [editorHuman]);
      ctx.restore();
      ctx.save();
      ctx.translate(380, 240);
      editorHuman.x = 0;
      editorHuman.y = -HUMAN_LOGICAL_SIZE;
      drawHumans(ctx, 0, [editorHuman]);
      ctx.restore();
    }
    ctx.fillStyle = "#fff";
    ctx.font = "12px sans-serif";
    ctx.fillText("Press SPACE to return Title", 10, MAIN_H - 10);
  }
  function drawGameOverUI() {
    const t = Math.max(0, elapsed - gameoverStart);
    const cx = OFFSET_X + COLS * SIZE / 2;
    const targetY = 240, startY = -120;
    const p = Math.min(1, t / GAMEOVER_FALL_SEC);
    const ease = 1 - Math.pow(1 - p, 3);
    const y = startY + (targetY - startY) * ease;
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(0,0,0,0.9)";
    ctx.fillStyle = "#fff";
    ctx.font = "34px sans-serif";
    ctx.strokeText(TEXT_JP.GAME_OVER, cx, y - 40);
    ctx.fillText(TEXT_JP.GAME_OVER, cx, y - 40);
    ctx.font = "54px sans-serif";
    ctx.strokeText(TEXT_JP.TITLE, cx, y + 20);
    ctx.fillText(TEXT_JP.TITLE, cx, y + 20);
    if (p >= 1 && Math.floor(t * 2) % 2 === 0) {
      ctx.font = "18px sans-serif";
      ctx.strokeText(TEXT_JP.PUSH_SPACE, cx, y + 95);
      ctx.fillText(TEXT_JP.PUSH_SPACE, cx, y + 95);
    }
    ctx.restore();
  }
  function drawParticles() {
    particles.forEach((p) => {
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle = p.c;
      const px = p.x * SIZE + OFFSET_X - p.size / 2;
      const py = screenY(p.y) - p.size / 2;
      ctx.fillRect(px, py, p.size, p.size);
      ctx.globalAlpha = 1;
    });
  }
  function drawBlockCell(px, py, color, timer = null) {
    ctx.fillStyle = color;
    ctx.fillRect(px, py, SIZE, SIZE);
    if (timer !== null && timer > ANIM_CRACK_SEC) {
      let alpha = (timer - ANIM_CRACK_SEC) / ANIM_GLOW_SEC;
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.8})`;
      ctx.fillRect(px, py, SIZE, SIZE);
    }
    ctx.strokeStyle = "rgba(0,0,0,0.75)";
    ctx.lineWidth = 2;
    ctx.strokeRect(px - 1, py - 1, SIZE + 2, SIZE + 2);
    if (timer !== null && timer <= ANIM_CRACK_SEC) drawCrack(px, py, 1 - timer / ANIM_CRACK_SEC);
  }
  function drawCrack(px, py, progress) {
    ctx.save();
    ctx.strokeStyle = `rgba(0,0,0,${Math.min(1, progress * 2)})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px + SIZE * 0.2, py);
    ctx.lineTo(px + SIZE * 0.4, py + SIZE * 0.4);
    ctx.lineTo(px + SIZE * 0.3, py + SIZE * 0.7);
    ctx.lineTo(px + SIZE * 0.6, py + SIZE);
    ctx.moveTo(px + SIZE * 0.4, py + SIZE * 0.4);
    ctx.lineTo(px + SIZE * 0.8, py + SIZE * 0.6);
    ctx.stroke();
    ctx.restore();
  }
  function drawBomb(px, py, timer, crackTimer = null) {
    const isFlashing = timer <= 5 && Math.floor(elapsed * 6) % 2 === 0;
    ctx.save();
    ctx.fillStyle = isFlashing ? "#ff3333" : "#222222";
    ctx.beginPath();
    ctx.arc(px + SIZE / 2, py + SIZE / 2, SIZE * 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.strokeStyle = "#8b4513";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px + SIZE / 2, py + SIZE * 0.1);
    ctx.quadraticCurveTo(px + SIZE * 0.8, py - SIZE * 0.2, px + SIZE * 0.8, py - SIZE * 0.3);
    ctx.stroke();
    if (timer > 0 && Math.random() < 0.8) {
      ctx.fillStyle = ["#ffeb3b", "#ff9800", "#ff5722"][Math.floor(Math.random() * 3)];
      ctx.beginPath();
      const sx = px + SIZE * 0.8 + (Math.random() - 0.5) * 5;
      const sy = py - SIZE * 0.3 + (Math.random() - 0.5) * 5;
      ctx.arc(sx, sy, 3 + Math.random() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(Math.ceil(timer), px + SIZE / 2, py + SIZE / 2);
    if (crackTimer !== null && crackTimer > ANIM_CRACK_SEC) {
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillRect(px, py, SIZE, SIZE);
    }
    if (crackTimer !== null && crackTimer <= ANIM_CRACK_SEC) drawCrack(px, py, 1 - crackTimer / ANIM_CRACK_SEC);
    ctx.restore();
  }

  // core/input.js
  init_world();
  init_constants();
  function setupInput() {
    const canvas3 = document.querySelector("canvas");
    canvas3.addEventListener("mousedown", (e) => {
      if (state === "human_edit") {
        const rect = canvas3.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (canvas3.width / rect.width);
        const my = (e.clientY - rect.top) * (canvas3.height / rect.height);
        if (handleEditorClick(mx, my)) return;
      }
    });
    document.addEventListener("keydown", (e) => {
      if (state === "title") {
        if (e.code === "Digit1") {
          initEditor();
          return;
        }
        if (e.code !== "Space") return;
        if (!spaceReleased) return;
        setState("intro");
        setElapsed(0);
        setSpaceReleased(false);
        return;
      }
      if (state === "human_edit") {
        if (e.code === "Space") {
          setState("title");
          return;
        }
      }
      if (state === "intro") {
        if (e.code !== "Space") return;
        if (!spaceReleased) return;
        Promise.resolve().then(() => (init_gameLogic(), gameLogic_exports)).then((m) => {
          resetGame();
          setPair(null);
          updateSafe();
          setRenderSafeLine(safeLine);
          m.spawnHumans();
          setState("playing");
          setElapsed(0);
          setSpaceReleased(false);
        });
        return;
      }
      if (state === "clear" || state === "gameover") {
        if (e.code !== "Space") return;
        if (!spaceReleased) return;
        resetGame();
        setPair(null);
        updateSafe();
        setRenderSafeLine(safeLine);
        resetClouds();
        setState("title");
        setElapsed(0);
        setSpaceReleased(false);
        return;
      }
      if (e.code === "Space") {
        setSpaceReleased(false);
        return;
      }
      if (e.code === "KeyQ" && state === "playing") {
        setIsPaused(!isPaused);
        return;
      }
      if (state === "playing") {
        if (e.code === "Digit1" || e.code === "Numpad1") {
          fallingBombs.push({
            x: Math.floor(Math.random() * COLS),
            y: cameraY - 2,
            timer: BOMB_TIMER_MIN + Math.random() * (BOMB_TIMER_MAX - BOMB_TIMER_MIN)
          });
          showDebugMessage("BOMB SPAWNED!");
        }
        if (e.code === "Digit2" || e.code === "Numpad2") {
          setDebugPauseCracking(!debugPauseCracking);
          showDebugMessage(debugPauseCracking ? "CRACK & BOMB TIMER PAUSED" : "CRACK & BOMB TIMER RESUMED");
        }
        if (e.code === "Digit3" || e.code === "Numpad3") {
          setDebugPauseWater(!debugPauseWater);
          showDebugMessage(debugPauseWater ? "WATER PAUSED" : "WATER RESUMED");
        }
        if (e.code === "Digit4" || e.code === "Numpad4") {
          const jump = 50 / METERS_PER_ROW;
          setWater(Math.max(-10 / METERS_PER_ROW, water - jump));
          showDebugMessage("WATER -50m");
        }
        if (e.code === "Digit5" || e.code === "Numpad5") {
          const jump = 50 / METERS_PER_ROW;
          setWater(water + jump);
          showDebugMessage("WATER +50m");
        }
      }
      if (state !== "playing" || isPaused) return;
      if (!pair) return;
      if (e.key === "ArrowLeft") {
        pair.x--;
        if (hit(blocks(pair))) pair.x++;
      }
      if (e.key === "ArrowRight") {
        pair.x++;
        if (hit(blocks(pair))) pair.x--;
      }
      if (e.key === "ArrowUp") {
        const prevRot = pair.rot;
        const prevX = pair.x;
        pair.rot = (pair.rot + 1) % 4;
        if (hit(blocks(pair))) {
          const kicks = [-1, 1, -2, 2];
          let ok = false;
          for (const dx of kicks) {
            pair.x = prevX + dx;
            if (!hit(blocks(pair))) {
              ok = true;
              break;
            }
          }
          if (!ok) {
            pair.rot = prevRot;
            pair.x = prevX;
          }
        }
      }
      if (e.key === "ArrowDown") setFast(true);
      if (e.key === "r" || e.key === "R") {
        setRadarAbstractionMode(!radarAbstractionMode);
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.code === "Space") setSpaceReleased(true);
      if (e.key === "ArrowDown") setFast(false);
    });
  }

  // core/gameLoop.js
  init_constants();
  init_stateManager();
  init_gameLogic();
  init_effects();
  var last = 0;
  var frameCount = 0;
  var lastFpsUpdate = 0;
  var minFrameTime = 1e3 / FPS_LIMIT;
  function loop(t = 0) {
    const dt_ms = t - last;
    if (dt_ms < minFrameTime) {
      requestAnimationFrame(loop);
      return;
    }
    let dt = dt_ms / 1e3;
    if (dt > 0.1) dt = 0.1;
    last = t;
    frameCount++;
    if (t - lastFpsUpdate > 1e3) {
      setFps(Math.round(frameCount * 1e3 / (t - lastFpsUpdate)));
      frameCount = 0;
      lastFpsUpdate = t;
    }
    if (!isPaused) {
      update(dt);
      if (!isCautionPause()) updateParticles();
    }
    draw(dt);
    requestAnimationFrame(loop);
  }

  // bundle_entry.js
  var canvas2 = document.getElementById("game");
  if (canvas2) {
    canvas2.width = TOTAL_W;
    canvas2.height = MAIN_H;
    setupInput();
    loop();
  }
})();
