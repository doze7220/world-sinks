// =========================
// CONSTANTS
// =========================

// =========================
// TUNING (バランス調整値)
// =========================

// WATER (波・色)
export const BASE_WAVE_AMPLITUDE = 8;
export const DANGER_WAVE_AMPLITUDE = 10;
export const WAVE_PERIOD_1 = 2.5; // 秒
export const WAVE_PERIOD_2 = 1.3; // 秒

export const CRACKED_BLOCK_PROBABILITY = 0.2; // ヒビ入りブロックの出現確率 (1/5)
// export const WAVE_RANDOM_FACTOR = 0.1; // ±10%

export const WATER_TOP_COLOR = "#4FC3F7";
export const WATER_MID_COLOR = "#2A7FBF";
export const WATER_BOTTOM_COLOR = "#0A1A2A";
export const WATER_HIGHLIGHT_COLOR = "#FFFFFF";
export const WATER_HIGHLIGHT_THICKNESS = 3;

// DANGER (危機判定・距離・時間)
export const DANGER_PROXIMITY_BLOCKS = 3; // 3ブロック以内で予兆発生
export const DANGER_COUNTDOWN_SECONDS = 10.0;
export const PROXIMITY_BRIGHTNESS_DROP = 0.9; // 明度90%

// EFFECT (雷・振動・演出)
export const SHAKE_INTENSITY_PHASE3 = 2;
export const SHAKE_INTENSITY_PHASE4 = 5;
export const SHAKE_PERIOD_PHASE3 = 0.1;
export const SHAKE_PERIOD_PHASE4 = 0.08;

export const THUNDER_INTERVAL_PHASE3 = 2.5;
export const THUNDER_INTERVAL_PHASE4 = 1.0;
export const THUNDER_FLASH_DURATION = 0.1;

// RAIN (雨量)
export const RAIN_COUNT_BASE = 50;
export const RAIN_MULTIPLIER_PHASE1 = 1.0;
export const RAIN_MULTIPLIER_PHASE2 = 1.5;
export const RAIN_MULTIPLIER_PHASE3 = 2.0;
export const RAIN_MULTIPLIER_PHASE4 = 2.5;

// =========================
// CONFIG (設定値)
// =========================

// UI (カウントダウン・色・スケール)
export const UI_COUNTDOWN_X = 65;
export const UI_COUNTDOWN_Y = 20;
export const UI_COUNTDOWN_NORMAL_COLOR = "#FFFFFF";
export const UI_COUNTDOWN_DANGER_COLOR = "#FF3B3B";
export const UI_COUNTDOWN_SCALE_MIN = 1.0;
export const UI_COUNTDOWN_SCALE_MAX = 1.1;
export const UI_COUNTDOWN_ANIM_PERIOD = 1.0;
export const UI_COUNTDOWN_TEXT_OUTLINE_WIDTH = 4;
export const UI_COUNTDOWN_TEXT_OUTLINE_COLOR = "rgba(0,0,0,0.85)";
export const UI_COUNTDOWN_FONT = "bold 20px sans-serif";
export const UI_COUNTDOWN_CENTER_OFFSET_X = 80;
export const UI_COUNTDOWN_CENTER_OFFSET_Y = 15;

export const SAFE_LINE_LERP = 0.15;

// RADAR (線・透明度・枠)
export const RADAR_LINE_WIDTH = 3;
export const RADAR_VIEW_BOX_COLOR = "rgba(255, 255, 255, 0.25)";
export const RADAR_VIEW_BOX_BORDER_COLOR = "#FFFFFF";
export const RADAR_HUMAN_SIZE_RATIO = 0.56;
// export const RADAR_VIEW_BOX_BORDER_WIDTH = 2;
// export const RADAR_VIEW_BOX_V_LINE_WIDTH = 1;

// =========================
// LEGACY / SYSTEM CONSTANTS
// =========================

/* ===== 爆弾パラメータ ===== */
export const BOMB_TIMER_MIN = 10;
export const BOMB_TIMER_MAX = 30;
export const BOMB_START_METERS = 0;
export const BOMB_PROB_STEP_METERS = 10;
export const BOMB_PROB_STEP_PERCENT = 50;
export const BOMB_PROB_MAX_PERCENT = 10;
export const BOMB_CHECK_INTERVAL = 5;
export const BOMB_FALL_SPEED = 3; //1秒間に進むブロック数（落下速度）

/* ===== ブロック設定 ===== */
export const BLOCK_TYPES = 4;
export const RANDOM_SHAPE = true;
export const BLOCK_SHAPE_SIZE = 2;

/* ===== フィールド設定 ===== */
export const COLS = 6;
export const ROWS = 12;
export const TOTAL_ROWS = 200;
export const SIZE = 40;

/* ===== 表示・カメラ設定 ===== */
export const LEFT_UI_WIDTH = 130;
export const OFFSET_X = LEFT_UI_WIDTH;
export const CAMERA_LERP = 0.05;
export const SAFE_LINE_SCREEN_Y = ROWS - 3;

/* ===== 操作・スピード設定 ===== */
export const FALL = 0.6;
export const FAST = 0.05;
export const WATER_SPEED = 0.15;
export const WATER_START_DELAY = 0;
export const WATER_START_METERS = -10;
export const PAIR_MOVE_LERP = 0.28;
export const PAIR_FALL_LERP = 0.18;
export const PAIR_ROT_LERP = 0.25;

// CLOUD
export const CLOUD_RANDOM_X_MAX = 340;
export const CLOUD_SIZE_MIN = 18;
export const CLOUD_SIZE_RANGE = 28;
export const CLOUD_Y_CLIP_MIN = -120;
export const CLOUD_Y_CLIP_MAX = 600;

// WATER_VISUAL
export const WATER_DANGER_WAVE_AMP = 10;
export const WATER_WAVE_X_DIV_1 = 80;
export const WATER_WAVE_X_DIV_2 = 50;

// UI_LAYOUT
export const WATER_LABEL_X = 15;
export const WATER_LABEL_Y_OFF = 15;
export const WATER_METERS_X = 18;
export const WATER_METERS_Y_OFF = 2;
export const RADAR_LABEL_EXT = 55;
export const RADAR_LABEL_Y_OFF = 5;
export const SURVIVAL_LIST_X = 15;
export const SURVIVAL_LIST_Y = 70;
export const SURVIVAL_LIST_SPACING_X = 22;
export const SURVIVAL_LIST_SPACING_Y = 22;
export const NEXT_BOX_X = 10;
export const NEXT_BOX_Y = 10;
export const NEXT_BOX_W = 80;
export const NEXT_BOX_H = 40;
export const NEXT_MINI_BLOCK_SIZE = 12;
export const CLEAR_UI_Y_START = 560;
export const CLEAR_UI_Y_TARGET = 230;
export const GAMEOVER_UI_Y_START = -120;
export const GAMEOVER_UI_Y_TARGET = 240;

export const EDITOR_PREVIEW_X_1X = 450;
export const EDITOR_PREVIEW_X_2X = 350;
export const EDITOR_PREVIEW_Y = 240;

// PHYSICS
export const GRAVITY_ACCEL = 9.8;
export const EXPLOSION_GRAVITY = 20;
export const DROWN_SINK_SPEED = 0.5;

// HUMAN_LOGIC
export const HUMAN_STANDING_CHECK_OFFSET = 5;
export const HUMAN_STANDING_SEARCH_OFFSET = 2;
export const HUMAN_TICK_DELTA = 0.1;
export const HUMAN_CELL_CENTER_THRESHOLD = 0.5;
export const HUMAN_WALL_SEARCH_RANGE = 2;
export const HUMAN_FALL_THRESHOLD_SIZE = 5;
export const HUMAN_BLOCK_CENTER_RANGE_RATIO = 0.25;
export const HUMAN_CANT_CLIMB_CHANCE = 0.05;
export const HUMAN_LOOK_AHEAD_RATIO = 0.4;
export const HUMAN_LEDGE_HEIGHT_THRESHOLD_SIZE = 5;
export const HUMAN_SLIP_CHANCE = 0.5;
export const HUMAN_FLOOD_NEAR_CHANCE = 0.02;
export const HUMAN_FELL_OVER_CHANCE = 0.05;
export const HUMAN_RANDOM_WALK_DIR_CHANCE = 0.1;
export const HUMAN_RANDOM_WALK_STOP_CHANCE = 0.2;

// GAME_LOGIC
export const FLOOD_PHASE1_REMAIN = 7.0;
export const FLOOD_PHASE2_REMAIN = 4.0;
export const FLOOD_PHASE3_REMAIN = 2.0;
export const CLEAR_RISE_SEC = 2.4;
export const GOAL_Y_OFFSET_BLOCKS = 1.5;
export const BOMB_SPAWN_Y_OFF_BLOCKS = 2;
export const BOMB_DAMAGE_RADIUS_BLOCKS = 1.5;

// BLOCK_TYPES
export const BLOCK_TYPE_BOMB = 9;
export const BLOCK_ERASE_THRESHOLD = 4;

// BLOCK_SPAWN
export const BLOCK_SIZE_PROB_2 = 0.6;
export const BLOCK_SIZE_PROB_3 = 0.9;
export const BLOCK_INITIAL_X = 2;
export const BLOCK_HIT_THRESHOLD = 0.01;

// EFFECTS_VISUAL
export const RAIN_START_Y = -10;
export const RAIN_SPEED_MIN = 10;
export const RAIN_SPEED_RANGE = 10;
export const RAIN_LEN_MIN = 10;
export const RAIN_LEN_RANGE = 10;
export const RAIN_SLANT = 1;

export const PARTICLE_RAND_VX = 0.012;
export const PARTICLE_RAND_VY_RATIO = 0.25;
export const PARTICLE_RAND_VY_ADD = 0.018;
export const PARTICLE_LIFE_RANGE = 18;

export const CLEAR_CELEB_Y = 220;
export const CONFETTI_COUNT = 140;
export const CONFETTI_SPEED_MIN = 2.4;
export const CONFETTI_SPEED_RANGE = 3.2;
export const CONFETTI_VY_OFFSET = -2.2;
export const CONFETTI_G_MIN = 0.11;
export const CONFETTI_G_RANGE = 0.06;
export const CONFETTI_VR_RANGE = 0.35;
export const CONFETTI_W_MIN = 8;
export const CONFETTI_W_RANGE = 7;
export const CONFETTI_H_MIN = 4;
export const CONFETTI_H_RANGE = 5;
export const CONFETTI_LIFE_MIN = 85;
export const CONFETTI_LIFE_RANGE = 45;
export const CONFETTI_FRICTION = 0.996;
export const CONFETTI_Y_LIMIT = 560;
export const DEBUG_MESSAGE_SEC = 1.0;

/* ===== 高度制限設定 ===== */
export const LIMIT_HEIGHT = 6;

/* ===== 高度・ゴール設定 ===== */
export const METERS_PER_ROW = 10;
export const GOAL_METERS = 200;

/* ===== アニメーション設定 ===== */
export const ANIM_GLOW_SEC = 0.5;
export const ANIM_CRACK_SEC = 1.0;
export const ANIM_TOTAL_SEC = ANIM_GLOW_SEC + ANIM_CRACK_SEC;
export const ANIM_FALL_DELAY = 0.1;
export const ANIM_FALL_SPEED = 20.0;

/* ===== エフェクト設定 ===== */
export const PARTICLE_DIV = 4;
export const PARTICLE_SIZE = SIZE / PARTICLE_DIV;
export const PARTICLE_LIFE = 55;
export const PARTICLE_SPEED = 0.055;
export const PARTICLE_GRAVITY = 0.006;
export const PARTICLE_FRICTION = 0.985;

/* ===== システム設定 ===== */
export const MAX_CASCADE_STEPS = 200;

/* ===== 色・スタイル設定 ===== */
/* ===== ブロック特性定義 ===== */
/* ===== ブロック特性定義 ===== */
// IDはCOLORSのインデックスに対応: 1=Red, 2=Green, 3=Blue, 4=Yellow, 5=Pink, 6=Grey, 9=Bomb
export const BLOCK_PROPERTIES = {
    1: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
    2: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
    3: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
    4: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
    5: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
    6: { weight: 1, hardness: 1, canClimb: 1, breakable: 1 },
    9: { weight: 1, hardness: 1, canClimb: 0, breakable: 1 }  // 爆弾も登れない
};

export const COLORS = [null, "#f55", "#5f5", "#55f", "#ff5", "#f5f"];
export const GROUND = "#6b4a2b";
// export const WATER_COLOR = "rgba(65,165,245,0.56)";
export const WATER_LINE = "#66d9ff";
export const GOAL_LINE = "#ffeb3b";
export const SAFE_LINE = "#fff";

// export const WATER_WAVE_AMP = 4;
// export const WATER_WAVE_LEN = 140;
// export const WATER_WAVE_SPEED = 2.2;

export const RADAR_INNER_W = 48;
export const RADAR_PAD = 10;
export const RADAR_V_PAD = 12;
// export const RADAR_GOAL_LABEL_TOP = 15;
// export const RADAR_LABEL_PAD_R = 4;

/* 背景（空・雲） */
export const SKY_TOP = "#2c6fff";
// export const SKY_BOTTOM = "#bfe9ff";
export const CLOUD_COUNT = 14;
export const CLOUD_PARALLAX = 0.6;
export const CLOUD_DRIFT_PX_PER_SEC = 6;
export const CLOUD_ALPHA = 0.9;
export const SKY_RECT_OFFSET = 50;
// export const TEST_EXTEND_WORLD_BG = true;

/* キャンバスサイズ */
export const MAIN_W = 400;
export const MAIN_H = 480;
export const RADAR_CANVAS_W = 190;
export const RADAR_CANVAS_H = 480;
export const RADAR_X = MAIN_W;
export const TOTAL_W = MAIN_W + RADAR_CANVAS_W;

/* 演出設定 */
export const GAMEOVER_FALL_SEC = 5;
export const GAMEOVER_WATER_MULT = 10;
export const GAMEOVER_GRAVITY_STEPS = 6;

// export const FLOOD_BLINKS = 3;
// export const FLOOD_BLINK_PERIOD = 0.35;
// export const FLOOD_GRACE_SEC = 10.0;
export const LIMIT_WARNING_SEC = 5;
export const UI_CAUTION_ANIM_DURATION = 1.0;
export const UI_CAUTION_FADE_OUT_DURATION = 0.5;
export const UI_CAUTION_FONT = "bold 40px sans-serif";
export const UI_CAUTION_STOKE_WIDTH = 8;

/* システム追加 */
export const FPS_LIMIT = 60;
export const WATER_ALPHA = 0.8; // 透明度 (0.0 to 1.0)

/* ポーズ設定 */
export const UI_PAUSE_FONT = "bold 40px sans-serif";

/* ===== 人間AI設定 ===== */
export const HUMAN_COUNT_INITIAL = 50;
export const HUMAN_VIP_COUNT = 1;
export const HUMAN_RADIUS = 0.26;
export const HUMAN_LOGICAL_SIZE = 26; // SIZE(40) * 2/3

export const HUMAN_SPEED_WALK = 0.4;
export const HUMAN_SPEED_CLIMB = 0.2;
export const HUMAN_SPEED_ESCAPE = 0.7;
export const HUMAN_SPEED_FAST_CLIMB = 1.25;

export const HUMAN_AI_TICK_MIN = 0.1;
export const HUMAN_AI_TICK_MAX = 1.0;

export const HUMAN_FALL_OVER_SEC = 2.0;
export const HUMAN_DROWN_SEC = 5.0;
export const HUMAN_SPEECH_SEC = 2.5;
export const HUMAN_LOST_SEC = 10.0; // 10秒登れないと迷子
export const HUMAN_SHOCK_SEC = 1.0; // ヒビを見てショックを受ける時間
export const HUMAN_GOAL_SUBSTATE_SEC = 2.0; // ゴール後の各モーションの持続時間

/* ===== 救済措置設定 ===== */
export const HUMAN_RESCUE_ENABLED = true;  // 横一列ヒビ埋まり時の救済
export const HUMAN_RESCUE_TIME = 15.0;    // 救済発動までの待機時間
export const HUMAN_DROWN_DEATH_SEC = 15.0; // 15秒溺れると死亡
export const HUMAN_FALL_DEATH_HEIGHT = 3.0; // 3ブロック以上で落下死
export const HUMAN_DEATH_FADE_SEC = 3.0; // 死亡演出の消滅時間
export const HUMAN_DEATH_SKULL_SEC = 2.0; // 髑髏が表示される時間
export const HUMAN_DEATH_REACTION_DIST = 2.0; // 死亡を目撃する距離（ブロック数）

/* ===== 人間描画・パーツオフセット設定 ===== */
export const HUMAN_RENDER_CONFIG = {
    BOUNCE_AMP: 2,     // 歩行時の跳ね
    SWAY_AMP: 1,       // 登攀時の揺れ
    FOOT_X_OFF: 6.8,   // 足の体からのX距離
    FOOT_Y_OFF: -6.5,    // 足のY基本位置
    HAND_X_OFF: 4,   // 手の体からのX距離
    HAND_Y_OFF_B: -1.2, // 手のY基本位置(BodyRに対する倍率)

    CLIMB_FOOT_X_OFF: 6.4,  // 登攀時の足のX距離
    CLIMB_FOOT_Y_OFF: -0.9, // 登攀時の足のY位置(BodyRに対する倍率)
    CLIMB_HAND_X_OFF: 4.1,  // 登攀時の手のX距離
    CLIMB_HAND_Y_OFF: -2,   // 登攀時の手のY位置(BodyRに対する倍率)

    BODY_SIZE_RATIO: 2.0,  // 胴体サイズ(BodyRに対する倍率)
    FOOT_W: 16,            // 足の幅
    FOOT_H: 8,             // 足の高さ
    HAND_SIZE: 12,         // 手のサイズ
    CLIMB_FOOT_W: 12,      // 登攀時の足の幅
    CLIMB_FOOT_H: 20,      // 登攀時の足の高さ

    SIGMA_OFFSET_X: -10,    // ΣのXオフセット
    SIGMA_OFFSET_Y: -10,    // ΣのYオフセット
    SIGMA_ROTATION: 45,     // Σの回転角度(度)
    SIGMA_SIZE: 14,         // Σの描画サイズ
    SPEECH_FONT_SIZE: 8,    // セリフのフォントサイズ

    SWEAT_TEXT: "💦",       // 汗の文字
    SWEAT_X_OFF: 1.0,       // 汗のXオフセット(BodyRに対する倍率)
    SWEAT_Y_OFF: -2.0,      // 汗のYオフセット(BodyRに対する倍率)
    SWEAT_ROTATION: -90,    // 汗の回転角度

    FALL_FOOT_X_OFF: 4.0,   // 落下時の足のX距離
    FALL_HAND_X_OFF: 10.0,  // 落下時の手のX距離
    FELL_OVER_FOOT_X_OFF: 6.0, // 転倒時の足のX距離
    FELL_OVER_HAND_X_OFF: 6.0, // 転倒時の手のX距離
};

export const HUMAN_DANGER_DIST = 2.5; // 少し広めに(2.5ブロック分)
export const HUMAN_DANGER_WATER_M = 30; // 3ブロック分(30m)

export const SCORE_HUMAN_NORMAL = 100;
export const SCORE_HUMAN_VIP = 500;


