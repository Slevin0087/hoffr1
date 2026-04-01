import { GAME_MODES_IDS } from "./GameModes";
import { LANGUAGES } from "./TranslationConfigs";

export const SETTINGS_SLICE_NAME = "settings";

export const dealingCardsCounts = {
  one: "1",
  three: "3",
};

export const gameSettingsTypes = {
  gameMode: "gameMode",
  language: "language",
  soundEffects: "soundEffects",
  music: "music",
  volume: "volume",
  animations: "animations",
  dealingCards: "dealingCards",
  assistanceInCollection: "assistanceInCollection",
  assistanceInCardClick: "assistanceInCardClick",
};

export const SETTINGS_STORAGE_KEYS = {
  SETTINGS: "settings",
};

export const defaultSettingsGameModes = {
  value: GAME_MODES_IDS.CLASSIC,
};

export const defaultSettingsLanguage = {
  value: LANGUAGES.ABAZA,
};

export const defaultSettingsSoundEffects = {
  value: true,
};

export const defaultSettingsMusic = {
  value: true,
};

export const defaultSettingsVolume = {
  value: 0.5,
};

export const defaultSettingsAnimations = {
  value: true,
};

export const defaultSettingDealingCards = {
  value: dealingCardsCounts.one,
};

export const defaultSettingsAssistanceInCollection = {
  value: false,
};

export const defaultSettingsAssistanceInCardClick = {
  value: false,
};

export const SETTINGS_DEFAULT_STATE = {
  [gameSettingsTypes.gameMode]: defaultSettingsGameModes,
  [gameSettingsTypes.language]: defaultSettingsLanguage,
  [gameSettingsTypes.soundEffects]: defaultSettingsSoundEffects,
  [gameSettingsTypes.music]: defaultSettingsMusic,
  [gameSettingsTypes.volume]: defaultSettingsVolume,
  [gameSettingsTypes.animations]: defaultSettingsAnimations,
  [gameSettingsTypes.dealingCards]: defaultSettingDealingCards,
  [gameSettingsTypes.assistanceInCollection]:
    defaultSettingsAssistanceInCollection,
  [gameSettingsTypes.assistanceInCardClick]:
    defaultSettingsAssistanceInCardClick,
};
