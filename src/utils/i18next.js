import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import {
  DEFAULT_LANGUAGE,
  FALLBACK_LNG,
} from "../Configs/TranslationConfigs.js";
import ru from "../locales/ru.js";
import en from "../locales/en.js";
import tr from "../locales/tr.js";
import abaza from "../locales/abaza.js";
import { store } from "../Store/index.js";
import { gameSettingsTypes } from "../Configs/SettingsConfigs.js";
import { selectSettingsByType } from "../Store/slices/settings/selectors.js";

const getInitialLanguage = () => {
  try {
    const state = store.getState();
    const language = selectSettingsByType(state, gameSettingsTypes.language);
    if (language) return language.value;
  } catch (e) {
    // Store еще не готов
    console.error(e);
  }
  return DEFAULT_LANGUAGE;
};

i18next.use(initReactI18next).init({
  lng: getInitialLanguage(),
  fallbackLng: FALLBACK_LNG,
  debug: true,
  interpolation: {
    escapeValue: false, // Экранирование уже есть в React, поэтому отключаем
  },
  resources: {
    ru,
    en,
    tr,
    abaza,
  },
});

export const changeLanguage = async (lang) => {
  try {
    await i18next.changeLanguage(lang);
    return true;
  } catch (error) {
    console.error("Failed to change language:", error);
    return false;
  }
};

export default i18next;
