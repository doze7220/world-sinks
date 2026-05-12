export const SYSTEM_TEXT = {
  TITLE: "世界沈没",
  PUSH_SPACE: "PUSH SPACE KEY",
  INTRO_LINES: [
    "ある日、突如として",
    "世界中の水位が上昇しはじめた。",
    "このままでは世界は沈没してしまう！",
    "",
    "神である貴方の力で「大地」を作り出し",
    "人類を沈没から救うのだ！"
  ],
  INTRO_CONTROLS: [
    "【操作】",
    "← → : ブロック移動",
    "↑ : 回転　↓ : 高速落下",
    "",
    "【ルール】",
    "地面は4つ以上繋がると消える",
    "横一列が地面で埋まった高さが安全高度",
    "水位が安全高度を超えると世界沈没の危機",
    "人間は「ヒビ入りブロック」を登れない！",
    "ゴールまで人間を導こう！"
  ],
  LIMIT_WARNING_LINES: [
    "地面は安全高度から",
    "6ブロック上までしか",
    "積めません！"
  ],
  CAUTION: "!!! CAUTION !!!",
  CAUTION_TEXT: "CAUTION!",
  FLOOD_WARNING_1: "水位が安全高度を越えました！",
  FLOOD_WARNING_2: "速やかに脱出してください！",
  FLOOD_COUNTDOWN_PREFIX: "水没まで",
  FLOOD_COUNTDOWN_SUFFIX: "秒",
  WATER_LEVEL: "水位",
  GOAL: "ゴール",
  SAFE_HEIGHT: "安全高度",
  GAME_OVER: "GAME OVER",
  CONGRATULATIONS: "congratulations！",
  GOAL_TEXT: "GOOL!!",
  PAUSE_TEXT: "＜ PAUSE ＞",
  PAUSE_OVERLAY_COLOR: "rgba(0, 0, 0, 0.5)",
  PAUSE_TEXT_COLOR: "#FFFFFF",
  UI_CAUTION_COLOR: "#FF3B3B",
  UI_CAUTION_STOKE_COLOR: "#FFFFFF",
  UI_SIDE_LINE_COLOR: "#FFFFFF",
  DEBUG_BOMB_SPAWNED: "BOMB SPAWNED!",
  DEBUG_CRACK_PAUSED: "CRACK & BOMB TIMER PAUSED",
  DEBUG_CRACK_RESUMED: "CRACK & BOMB TIMER RESUMED",
  DEBUG_WATER_PAUSED: "WATER PAUSED",
  DEBUG_WATER_RESUMED: "WATER RESUMED",
  DEBUG_WATER_MINUS: "WATER -50m",
  DEBUG_WATER_PLUS: "WATER +50m",
  DEBUG_HUMAN_DIED: "DEBUG: Random Human Died",
  DEBUG_SPAWN_PREFIX: "SPAWN: ",
  NEXT_LABEL: "NEXT",
  RETURN_TO_TITLE: "Press SPACE to return Title"
};

let currentDictionary = SYSTEM_TEXT;

export function setLanguage(dict) {
  currentDictionary = dict;
}

export function getText(key) {
  return currentDictionary[key] || key;
}
