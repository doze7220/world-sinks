import * as CONST from '../data/constants.js';
import * as STATE from '../core/stateManager.js';
import { Human } from '../entities/human.js';
import { initHumanAtlas } from '../render/humanRenderer.js';

export const EDITOR_BUTTONS = [];
export const PAGES = [
  { name: "Common", params: ["BODY_SIZE_RATIO", "FOOT_W", "FOOT_H", "HAND_SIZE", "SPEECH_FONT_SIZE", "SIGMA_SIZE", "SIGMA_OFFSET_X", "SIGMA_OFFSET_Y", "SIGMA_ROTATION"] },
  { name: "Walk/Esc", params: ["BOUNCE_AMP", "FOOT_X_OFF", "FOOT_Y_OFF", "HAND_X_OFF", "HAND_Y_OFF_B", "SWEAT_X_OFF", "SWEAT_Y_OFF", "SWEAT_ROTATION"] },
  { name: "Climb", params: ["SWAY_AMP", "CLIMB_FOOT_X_OFF", "CLIMB_FOOT_Y_OFF", "CLIMB_HAND_X_OFF", "CLIMB_HAND_Y_OFF", "CLIMB_FOOT_W", "CLIMB_FOOT_H"] },
  { name: "Fall/Drown", params: ["FALL_FOOT_X_OFF", "FALL_HAND_X_OFF"] },
  { name: "Fell Over", params: ["FELL_OVER_FOOT_X_OFF", "FELL_OVER_HAND_X_OFF"] }
];

export function initEditor() {
  STATE.setState("human_edit");
  const h = new Human(999, 0, 0);
  h.state = STATE.editorState;
  STATE.setEditorHuman(h);
  refreshButtons();
}

export function refreshButtons() {
  EDITOR_BUTTONS.length = 0;
  
  // Page Navigation
  EDITOR_BUTTONS.push({
    type: 'page_nav',
    dir: -1,
    rect: { x: 10, y: 10, w: 30, h: 25 }
  });
  EDITOR_BUTTONS.push({
    type: 'page_nav',
    dir: 1,
    rect: { x: 180, y: 10, w: 30, h: 25 }
  });

  const currentPage = PAGES[STATE.editorPage];
  if (currentPage) {
    currentPage.params.forEach((p, i) => {
      EDITOR_BUTTONS.push({
        type: 'param',
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
      type: 'state',
      name: s,
      rect: { x: 420, y: 60 + i * 35, w: 80, h: 30 }
    });
  });
}

export function handleEditorClick(mx, my) {
  for (let btn of EDITOR_BUTTONS) {
    if (btn.type === 'page_nav') {
      if (mx >= btn.rect.x && mx <= btn.rect.x + btn.rect.w &&
          my >= btn.rect.y && my <= btn.rect.y + btn.rect.h) {
        let next = STATE.editorPage + btn.dir;
        if (next < 0) next = PAGES.length - 1;
        if (next >= PAGES.length) next = 0;
        STATE.setEditorPage(next);
        refreshButtons();
        return true;
      }
    } else if (btn.type === 'param') {
      if (mx >= btn.minusRect.x && mx <= btn.minusRect.x + btn.minusRect.w &&
          my >= btn.minusRect.y && my <= btn.minusRect.y + btn.minusRect.h) {
        CONST.HUMAN_RENDER_CONFIG[btn.name] = Math.round((CONST.HUMAN_RENDER_CONFIG[btn.name] - 0.1) * 10) / 10;
        if (btn.name === 'SPEECH_FONT_SIZE' || btn.name === 'SIGMA_ROTATION' || btn.name === 'SIGMA_SIZE') initHumanAtlas();
        return true;
      }
      if (mx >= btn.plusRect.x && mx <= btn.plusRect.x + btn.plusRect.w &&
          my >= btn.plusRect.y && my <= btn.plusRect.y + btn.plusRect.h) {
        CONST.HUMAN_RENDER_CONFIG[btn.name] = Math.round((CONST.HUMAN_RENDER_CONFIG[btn.name] + 0.1) * 10) / 10;
        if (btn.name === 'SPEECH_FONT_SIZE' || btn.name === 'SIGMA_ROTATION' || btn.name === 'SIGMA_SIZE') initHumanAtlas();
        return true;
      }
    } else if (btn.type === 'state') {
      if (mx >= btn.rect.x && mx <= btn.rect.x + btn.rect.w &&
          my >= btn.rect.y && my <= btn.rect.y + btn.rect.h) {
        STATE.setEditorState(btn.name);
        STATE.editorHuman.state = btn.name;
        return true;
      }
    }
  }
  return false;
}

function forceSpeech() {
  const keys = Object.keys(CONST.HUMAN_SPEECH_DICT);
  const key = keys[Math.floor(Math.random() * keys.length)];
  const texts = CONST.HUMAN_SPEECH_DICT[key];
  STATE.editorHuman.speechText = texts[Math.floor(Math.random() * texts.length)];
  STATE.editorHuman.speechTimer = 3.0;
}

export function updateEditor(dt) {
  if (!STATE.editorHuman) return;
  STATE.editorHuman.animTime += dt;
  if (STATE.editorHuman.speechTimer > 0) STATE.editorHuman.speechTimer -= dt;
  
  if (STATE.elapsed - STATE.editorLastSpeech >= 10.0) {
    forceSpeech();
    STATE.setEditorLastSpeech(STATE.elapsed);
  }
}
