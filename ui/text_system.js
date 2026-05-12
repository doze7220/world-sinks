import { TEXT_JP } from '../text/human_text_jp.js';

let currentDictionary = TEXT_JP;

export function setLanguage(dict) {
  currentDictionary = dict;
}

export function getText(key) {
  return currentDictionary[key] || key;
}
