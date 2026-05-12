import * as CONST from '../data/constants.js';
import * as STATE from '../core/stateManager.js';
import { Human } from '../entities/human.js';
import { initHumanAtlas } from '../render/humanRenderer.js';
import { HUMAN_TEXT_JP } from '../text/human_text_jp.js';

export const EDITOR_BUTTONS = [];
export const PAGES = [
  { name: "Common", state: "walk", params: ["BODY_SIZE_RATIO", "FOOT_W", "FOOT_H", "HAND_SIZE", "SPEECH_FONT_SIZE", "SIGMA_SIZE", "SIGMA_OFFSET_X", "SIGMA_OFFSET_Y", "SIGMA_ROTATION"] },
  { name: "Walk/Escape", state: "walk", params: ["BOUNCE_AMP", "FOOT_X_OFF", "FOOT_Y_OFF", "HAND_X_OFF", "HAND_Y_OFF_B", "SWEAT_X_OFF", "SWEAT_Y_OFF", "SWEAT_ROTATION"] },
  { name: "Climb", state: "climb", params: ["SWAY_AMP", "CLIMB_FOOT_X_OFF", "CLIMB_FOOT_Y_OFF", "CLIMB_HAND_X_OFF", "CLIMB_HAND_Y_OFF", "CLIMB_FOOT_W", "CLIMB_FOOT_H"] },
  { name: "Fall/Drown", state: "fall", params: ["FALL_FOOT_X_OFF", "FALL_HAND_X_OFF"] },
  { name: "Fell Over", state: "fell_over", params: ["FELL_OVER_FOOT_X_OFF", "FELL_OVER_HAND_X_OFF"] },
  { name: "Goal", state: "goal", params: [] },
  { name: "Shock", state: "shock", params: [] }
];

export function initEditor() {
  STATE.setState("human_edit");
  const h = new Human(999, 0, 0);
  STATE.setEditorPage(0);
  h.state = PAGES[0].state;
  STATE.setEditorHuman(h);
  refreshButtons();
}

export function refreshButtons() {
  EDITOR_BUTTONS.length = 0;
  
  // Page Navigation ( Header ≪ Pattern ≫ )
  EDITOR_BUTTONS.push({
    type: 'page_nav',
    dir: -1,
    rect: { x: 10, y: 15, w: 30, h: 30 }
  });
  EDITOR_BUTTONS.push({
    type: 'page_nav',
    dir: 1,
    rect: { x: 230, y: 15, w: 30, h: 30 }
  });

  const currentPage = PAGES[STATE.editorPage];
  if (currentPage) {
    currentPage.params.forEach((p, i) => {
      EDITOR_BUTTONS.push({
        type: 'param',
        name: p,
        y: 80 + i * 25,
        minusRect: { x: 160, y: 80 + i * 25 - 15, w: 25, h: 25 },
        plusRect: { x: 240, y: 80 + i * 25 - 15, w: 25, h: 25 }
      });
    });
  }

  const states = ["walk", "climb", "fall", "escape", "fell_over", "drown", "goal", "shock"];
  states.forEach((s, i) => {
    EDITOR_BUTTONS.push({
      type: 'state',
      name: s,
      rect: { x: 480, y: 50 + i * 35, w: 90, h: 30 }
    });
  });
}

export function prevPage() {
  let next = STATE.editorPage - 1;
  if (next < 0) next = PAGES.length - 1;
  STATE.setEditorPage(next);
  if (STATE.editorHuman) {
    STATE.editorHuman.state = PAGES[next].state;
    STATE.setEditorState(PAGES[next].state);
  }
  refreshButtons();
}

export function nextPage() {
  let next = STATE.editorPage + 1;
  if (next >= PAGES.length) next = 0;
  STATE.setEditorPage(next);
  if (STATE.editorHuman) {
    STATE.editorHuman.state = PAGES[next].state;
    STATE.setEditorState(PAGES[next].state);
  }
  refreshButtons();
}

export function handleEditorClick(mx, my) {
  for (let btn of EDITOR_BUTTONS) {
    if (btn.type === 'page_nav') {
      if (mx >= btn.rect.x && mx <= btn.rect.x + btn.rect.w &&
          my >= btn.rect.y && my <= btn.rect.y + btn.rect.h) {
        if (btn.dir === -1) prevPage();
        else nextPage();
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
        if (STATE.editorHuman) STATE.editorHuman.state = btn.name;
        // Sync page if exists
        const pageIdx = PAGES.findIndex(p => p.state === btn.name);
        if (pageIdx !== -1) STATE.setEditorPage(pageIdx);
        refreshButtons();
        return true;
      }
    }
  }
  return false;
}

function forceSpeech() {
  const keys = Object.keys(HUMAN_TEXT_JP.SPEECH);
  const key = keys[Math.floor(Math.random() * keys.length)];
  const texts = HUMAN_TEXT_JP.SPEECH[key];
  STATE.editorHuman.speechText = texts[Math.floor(Math.random() * texts.length)];
  STATE.editorHuman.speechTimer = CONST.HUMAN_SPEECH_SEC;
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
