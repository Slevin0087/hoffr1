export const GAME_NAME = "game";

export const GAME_STORAGE_KEYS = {
  GAME: "game",
};

export const GAME_STATUSES = {
  IDLE: "idle",
  PLAYING: "playing",
  LOADING: "loading",
  NEW: "new",
  INIT: "init",
  START: "start",
  PAUSED: "paused",
  WON: "won",
  LOST: "lost",
  ENDED: "ended",
};

export const gameLifetimeStateTypes = {
  moves: "moves",
  points: "points",
  time: "time",
  wins: "wins",
  deallingCardsCount: "deallingCardsCount",
};

export const gameSessionStateTypes = {
  moves: "moves",
  points: "points",
  time: "time",
  dealStock: "deallStock",
};

export const gameStateTypesValuesKeys = {
  count: "count",
  data: "data",
};

export const lifetimeState = {
  [gameLifetimeStateTypes.moves]: {
    [gameStateTypesValuesKeys.count]: 0,
    data: { changing: false },
  },
  [gameLifetimeStateTypes.points]: {
    [gameStateTypesValuesKeys.count]: 0,
    data: { changing: false },
  },
  [gameLifetimeStateTypes.time]: {
    [gameStateTypesValuesKeys.count]: "00:00",
    data: { changing: false },
  },
  [gameLifetimeStateTypes.wins]: {
    [gameStateTypesValuesKeys.count]: 0,
    data: { changing: false },
  },
  [gameLifetimeStateTypes.deallingCardsCount]: {
    [gameStateTypesValuesKeys.count]: 1,
    data: { changing: false },
  },
};

export const sessionState = {
  [gameSessionStateTypes.moves]: {
    [gameStateTypesValuesKeys.count]: 0,
    data: {
      changing: false,
      cardId: null,
      operation: "",
      value: 0,
    },
  },
  [gameSessionStateTypes.points]: {
    [gameStateTypesValuesKeys.count]: 0,
    data: {
      changing: false,
      cardId: null,
      operation: "",
      value: 0,
    },
  },
  [gameSessionStateTypes.time]: {
    [gameStateTypesValuesKeys.count]: "00:00",
    data: {
      changing: false,
      cardId: null,
      operation: "",
      value: 0,
    },
  },
  [gameSessionStateTypes.dealStock]: {
    [gameStateTypesValuesKeys.count]: 0,
    data: {
      changing: false,
      cardId: null,
      operation: "",
      value: 0,
    },
  },
};

export const GAME_DEFAULT_STATE = {
  ids: ["game-0"],
  entities: {
    "game-0": {
      id: "game-0",
      coins: 0,
      lifetimeState,
      sessionState,
      status: GAME_STATUSES.IDLE,
    },
  },
  currentId: "game-0",
};

export const GAME_THUNKS_TYPES = {
  SET_NEW_GAME: "setNewGame",
  SET_GAME_STATE: "setGameState",
  MOVE_CARD: "moveCard",
  MOVE_CARDS: "moveCards",
  SET_GAME_STATUS: "setGameStatus",
  MOVE_FROM_STOCK_TO_WASTE: "moveFromStockToWaste",
  SET_INITIAL_BOARD_STATE: "setInitialBoardState",
  DEAL_CARDS: "dealingCards",
};

export const GAME_THUNKS = {
  SET_NEW_GAME: `${GAME_NAME}/${GAME_THUNKS_TYPES.SET_NEW_GAME}`,
  SET_GAME_STATE: `${GAME_NAME}/${GAME_THUNKS_TYPES.SET_GAME_STATE}`,
  MOVE_CARD: `${GAME_NAME}/${GAME_THUNKS_TYPES.MOVE_CARD}`,
  MOVE_CARDS: `${GAME_NAME}/${GAME_THUNKS_TYPES.MOVE_CARDS}`,
  SET_GAME_STATUS: `${GAME_NAME}/${GAME_THUNKS_TYPES.SET_GAME_STATUS}`,
  MOVE_FROM_STOCK_TO_WASTE: `${GAME_NAME}/${GAME_THUNKS_TYPES.MOVE_FROM_STOCK_TO_WASTE}`,
  SET_INITIAL_BOARD_STATE: `${GAME_NAME}/${GAME_THUNKS_TYPES.SET_INITIAL_BOARD_STATE}`,
  DEAL_CARDS: `${GAME_NAME}/${GAME_THUNKS_TYPES.DEAL_CARDS}`,
};
