////////////////////////// I_P_N - INPUT_PLAYER_NAME ///////////////////

export const UI_SLICE_NAME = "ui";

export const PAGES_IDS = {
  I_P_N: "input-player-name",
  GREETINGS: "greetings",
  PLAYING_FIELD: "playing-field",
  MENU: "menu",
  SETTINGS: "settings",
  SHOP: "shop",
};

export const PAGES_STORAGE_KEYS = {
  ACTIVE_PAGE_ID: "active-page-id",
};

export const UI_STORE_KEYS = {
  UI: UI_SLICE_NAME,
  ACTIVE_PAGE_ID: "activePageId",
};

export const ANIMATIONS_ON = {
  FALSE: false,
  TRUE: true,
};

export const UI_DEFAULTS_STATE = {
  activePageId: PAGES_IDS.I_P_N,
  reducedMotion: false,
};
