import { isEqual } from "lodash";
import { UI_STORE_KEYS } from "../Configs/UIConfigs";
import { SHOP_STORAGE_KEYS } from "../Configs/ShopConfigs";
import { GAME_STORAGE_KEYS } from "../Configs/GameConfigs";
import { DECK_STORAGE_KEYS } from "../Configs/DecksConfigs";
import { SETTINGS_STORAGE_KEYS } from "../Configs/SettingsConfigs";
import { ANIMATIONS_STORAGE_KEYS } from "../Configs/AnimationsConfigs";
import { APPEARANCES_STORAGE_KEYS } from "../Configs/AppearancesConfigs";
import { ACHIEVEMENTS_STORAGE_KEYS } from "../Configs/AchievementsConfigs";

export const STORAGE_ALL_KEYS = [
  UI_STORE_KEYS.UI,
  SHOP_STORAGE_KEYS.SHOP,
  GAME_STORAGE_KEYS.GAME,
  DECK_STORAGE_KEYS.DECKS,
  SETTINGS_STORAGE_KEYS.SETTINGS,
  ANIMATIONS_STORAGE_KEYS.ANIMATIONS,
  APPEARANCES_STORAGE_KEYS.APPEARANCES,
  ACHIEVEMENTS_STORAGE_KEYS.ACHIEVEMENTS,
];

class LocalStorage {
  getItem(key) {
    return JSON.parse(localStorage.getItem(key)) || undefined;
  }

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  getAllKeys() {
    return STORAGE_ALL_KEYS;
  }

  getFullState() {
    const fullState = {};
    for (const key of this.getAllKeys()) {
      fullState[key] = this.getItem(key);
    }
    return fullState;
  }

  setFullState(state) {
    for (const key of this.getAllKeys()) {
      if (state[key] === undefined) continue;
      if (isEqual(this.getItem(key), state[key])) continue;
      console.log('ПОСЛЕ ПРОВЕРКИ в setFullState');
      this.setItem(key, state[key]);
    }
  }
}

const storage = new LocalStorage();

export default storage;
