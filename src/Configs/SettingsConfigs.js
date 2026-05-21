import { dealingCounts } from "./GameConfigs";
import { GAME_MODES_IDS } from "./GameModes";
import { LANGUAGES } from "./TranslationConfigs";

export const SETTINGS_SLICE_NAME = "settings";

export const gameSettingsTypes = {
  gameMode: "gameMode",
  language: "language",
  soundsEffects: "soundsEffects",
  music: "music",
  volume: "volume",
  animations: "animations",
  dealingCards: "dealingCards",
  fastGame: "fastGame",
  canCardClick: "canCardClick",
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

export const defaultSettingsSoundsEffects = {
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
  value: dealingCounts.one,
};

export const defaultSettingsFastGame = {
  value: false,
};

export const defaultSettingsCanCardClick = {
  value: false,
};

export const SETTINGS_DEFAULT_STATE = {
  [gameSettingsTypes.gameMode]: defaultSettingsGameModes,
  [gameSettingsTypes.language]: defaultSettingsLanguage,
  [gameSettingsTypes.soundsEffects]: defaultSettingsSoundsEffects,
  [gameSettingsTypes.music]: defaultSettingsMusic,
  [gameSettingsTypes.volume]: defaultSettingsVolume,
  [gameSettingsTypes.animations]: defaultSettingsAnimations,
  [gameSettingsTypes.dealingCards]: defaultSettingDealingCards,
  [gameSettingsTypes.fastGame]: defaultSettingsFastGame,
  [gameSettingsTypes.canCardClick]: defaultSettingsCanCardClick,
};
