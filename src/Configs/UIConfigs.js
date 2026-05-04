////////////////////////// I_P_N - INPUT_PLAYER_NAME ///////////////////

//////////////////////////// P_F - PLAYING_FIELD ////////////////////////
export const UI_SLICE_NAME = "ui";

export const orientations = {
  portrait: "portrait",
  landscape: "landscape",
};

export const PAGES_IDS = {
  I_P_N: "input-player-name",
  GREETINGS: "greetings",
  PLAYING_FIELD: "playing-field",
  MENU: "menu",
  SETTINGS: "settings",
  SHOP: "shop",
  PLAYER_STATS: "player-stats",
};

export const P_F_MODALS_IDS = {
  RESTART: "restart-modal",
  GAME_RULES: "game-rules-modal",
  MENU: "menu-modal",
  SETTINGS: "settings-modal",
  PLAYER_STATS: "player-stats",
  SHOP: "shop-modal",
  GAME_OVER_AND_WIN: "game-over-and-win-modal",
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
  upPoints: {},
  activePFModalId: P_F_MODALS_IDS.MENU,
  p_f_modalsIds: {
    [P_F_MODALS_IDS.RESTART]: false,
    [P_F_MODALS_IDS.MENU]: false,
    [P_F_MODALS_IDS.GAME_OVER_AND_WIN]: true,
  },
  isCollectCardsBtnVisible: false,
  notifications: {
    // active: null,
    active: null,
    queue: [],
  },
};
