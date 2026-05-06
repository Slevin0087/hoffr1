import { joinPath } from "../utils/helpers";
import {
  GAME_MODE_CLASSIC,
  GAME_MODE_RELAXED,
  GAME_MODE_TIMED,
  GAME_MODES_IDS,
} from "./GameModes";

export const directionsTypes = {
  increment: "increment",
  decrement: "decrement",
};

export const GAME_NAME = "game";

export const gameIds = {
  game_0: `${GAME_NAME}-0`,
};

export const GAME_STORAGE_KEYS = {
  GAME: GAME_NAME,
};

export const GAME_STATUSES = {
  NEW: "new",
  WON: "won",
  IDLE: "idle",
  INIT: "init",
  LOST: "lost",
  READY: "ready",
  START: "start",
  ENDED: "ended",
  PAUSED: "paused",
  PLAYING: "playing",
  GAME_OVER: "gameOver",
};

export const gameStateTypes = {
  time: "time",
  wins: "wins",
  moves: "moves",
  points: "points",
  modeId: "modeId",
  redeals: "redeals",
  dealStock: "deallStock",
  gamesPlayed: "gamesPlayed",
  deallingCardsCount: "deallingCardsCount",
};

export const gameStateTypesValuesKeys = {
  data: "data",
  limit: "limit",
  total: "total",
  value: "value",
  count: "count",
  no_undo: "no_undo",
  no_hints: "no_hints",
  with_timed_mode: "with_timed_mode",
  with_relax_mode: "with_relax_mode",
  with_classic_mode: "with_classic_mode",
};

export const scoreOperations = {
  increment: "increment",
  decrement: "decrement",
};

export const dealingCounts = { one: "1", three: "3" };

export const stateData = {
  changing: false,
  data: {
    value: 0,
    cardId: null,
    operation: "",
  },
};

export const moveEventsTypes = {
  standart: "standart",
  wasteToStock: "wasteToStock",
  stockToWaste: "stockToWaste",
  dealsStockToTableaus: "dealsStockToTableaus",
};

export const gameSessionsTypes = {
  all: "all",
  session: "session",
  lifetime: "lifetime",
};

export const lifetimeState = {
  [gameStateTypes.modeId]: GAME_MODES_IDS.CLASSIC,
  [gameStateTypes.moves]: {
    [gameStateTypesValuesKeys.count]: 0,
  },
  [gameStateTypes.points]: {
    [gameStateTypesValuesKeys.count]: 0,
  },
  [gameStateTypes.time]: {
    [gameStateTypesValuesKeys.count]: 0,
  },
  [gameStateTypes.wins]: {
    [gameStateTypesValuesKeys.count]: 0,
    [gameStateTypesValuesKeys.no_hints]: 0,
    [gameStateTypesValuesKeys.no_undo]: 0,
  },
  [gameStateTypes.redeals]: {
    [gameStateTypesValuesKeys.limit]: GAME_MODE_CLASSIC,
  },
  [gameStateTypes.deallingCardsCount]: {
    [gameStateTypesValuesKeys.count]: dealingCounts.one,
  },
  [gameStateTypes.gamesPlayed]: {
    [gameStateTypesValuesKeys.count]: 0,
  },
};

export const sessionState = {
  [gameStateTypes.modeId]: GAME_MODES_IDS.CLASSIC,
  [gameStateTypes.moves]: {
    [gameStateTypesValuesKeys.count]: 0,
    ...stateData,
  },
  [gameStateTypes.points]: {
    [gameStateTypesValuesKeys.count]: 0,
    ...stateData,
  },
  [gameStateTypes.time]: {
    [gameStateTypesValuesKeys.count]: GAME_MODE_CLASSIC,
    limit: GAME_MODE_CLASSIC,
    direction: GAME_MODE_CLASSIC,
    ...stateData,
  },
  [gameStateTypes.dealStock]: {
    [gameStateTypesValuesKeys.count]: 0,
    ...stateData,
  },
};

export const GAME_DEFAULT_STATE = {
  id: gameIds.game_0,
  time: 0,
  coins: 0,
  moves: 0,
  wins: 0,
  losses: 0,
  status: GAME_STATUSES.IDLE,
  played: 0,
  points: 0,
  isStarted: false,
  playerName: "",
  isTimeStarted: false,
  isEventsInDeck: false,
  isFirstCardsEvent: false,
  currentModeId: GAME_MODES_IDS.CLASSIC,
  modes: {
    [GAME_MODES_IDS.CLASSIC]: {
      id: GAME_MODES_IDS.CLASSIC,
      currentDealing: dealingCounts.one,
      time: 0,
      wins: 0,
      moves: 0,
      played: 0,
      losses: 0,
      points: 0,
      [dealingCounts.one]: {
        wins: { time: 0, total: 0, no_hints: 0, no_undo: 0 },
        undo: { current: 0, limit: 3, penalty: 10, stack: [] },
        moves: { total: 0, current: 0 },
        hints: { current: 0, limit: 3, penalty: 0 }, // для теста pinalty сейчас равна 0, потом нужно изменить на 10
        played: 0,
        losses: 0,
        points: { best: null, total: 0, current: 0, prevCurrent: 0 },
        redeals: { current: 0, limit: 5 },
        time: {
          best: null,
          total: 0,
          limit: null,
          current: 0,
          penalty: 0,
          direction: directionsTypes.increment,
        },
      },
      [dealingCounts.three]: {
        wins: { time: 0, total: 0, no_hints: 0, no_undo: 0 },
        undo: { current: 0, limit: 3, penalty: 10, stack: [] },
        moves: { total: 0, current: 0 },
        hints: { current: 0, limit: 3, penalty: 10 },
        played: 0,
        losses: 0,
        points: { best: null, total: 0, current: 0, prevCurrent: 0 },
        redeals: { current: 0, limit: 5 },
        time: {
          best: null,
          total: 0,
          limit: null,
          current: 0,
          penalty: 0,
          direction: directionsTypes.increment,
        },
      },
    },
    [GAME_MODES_IDS.TIMED]: {
      id: GAME_MODES_IDS.TIMED,
      currentDealing: dealingCounts.one,
      time: 0,
      wins: 0,
      moves: 0,
      played: 0,
      losses: 0,
      points: 0,
      [dealingCounts.one]: {
        wins: { time: 0, total: 0, no_hints: 0, no_undo: 0 },
        undo: { current: 0, limit: 3, penalty: 15, stack: [] },
        combo: { current: 0, lastTimestamp: 0 },
        moves: { total: 0, current: 0 },
        hints: { current: 0, limit: 3, penalty: 10 },
        played: 0,
        losses: 0,
        points: { best: null, total: 0, current: 0, prevCurrent: 0 },
        redeals: { current: 0, limit: 3 },
        time: {
          best: null,
          total: 0,
          limit: 0,
          current: 180,
          penalty: 0,
          direction: directionsTypes.decrement,
        },
      },
      [dealingCounts.three]: {
        wins: { time: 0, total: 0, no_hints: 0, no_undo: 0 },
        undo: { current: 0, limit: 3, penalty: 15, stack: [] },
        combo: { current: 0, lastTimestamp: 0 },
        moves: { total: 0, current: 0 },
        hints: { current: 0, limit: 3, penalty: 10 },
        played: 0,
        losses: 0,
        points: { best: null, total: 0, current: 0, prevCurrent: 0 },
        redeals: { current: 0, limit: 3 },
        time: {
          best: null,
          total: 0,
          limit: 0,
          current: 180,
          penalty: 0,
          direction: directionsTypes.decrement,
        },
      },
    },
    [GAME_MODES_IDS.RELAXED]: {
      id: GAME_MODES_IDS.RELAXED,
      currentDealing: dealingCounts.one,
      time: 0,
      wins: 0,
      moves: 0,
      played: 0,
      losses: 0,
      points: 0,
      [dealingCounts.one]: {
        wins: { time: 0, total: 0, no_hints: 0, no_undo: 0 },
        undo: { current: 0, limit: null, penalty: null, stack: [] },
        moves: { total: 0, current: 0 },
        hints: { current: 0, limit: null, penalty: null },
        played: 0,
        losses: 0,
        points: { best: null, total: 0, current: 0, prevCurrent: 0 },
        redeals: { current: 0, limit: null },
        time: {
          best: null,
          total: 0,
          current: 0,
          limit: null,
          penalty: 0,
          direction: directionsTypes.increment,
        },
      },
      [dealingCounts.three]: {
        wins: { time: 0, total: 0, no_hints: 0, no_undo: 0 },
        undo: { current: 0, limit: null, penalty: null, stack: [] },
        moves: { total: 0, current: 0 },
        hints: { current: 0, limit: null, penalty: null },
        played: 0,
        losses: 0,
        points: { best: null, total: 0, current: 0, prevCurrent: 0 },
        redeals: { current: 0, limit: null },
        time: {
          best: null,
          total: 0,
          limit: null,
          current: 0,
          penalty: 0,
          direction: directionsTypes.increment,
        },
      },
    },
  },
};

export const payloadUpTime = {
  type: gameStateTypes.time,
  key: gameStateTypesValuesKeys.count,
};

export const payloadUpMoves = {
  type: gameStateTypes.moves,
  key: gameStateTypesValuesKeys.count,
};

export const GAME_THUNKS_TYPES = {
  GAME_INIT: "gameInit",
  SET_NEW_GAME: "setNewGame",
  SET_GAME_STATE: "setGameState",
  SET_GAME_STATUS: "setGameStatus",
  HANDLE_STOCK_CLICK: "handleStockClick",
  HANDLE_CARD_CLICK: "handleCardClick",
  HANDLE_COLLECT_CARDS: "handleCollectCards",
  HANDLE_SHUFFLE: "handleShuffle",
  HANDLE_DROP: "handleDrop",
  DEAL_STOCK_TO_TABLEAUS: "dealStockToTableaus",
  MOVE_STOCK_WASTE: "moveStockWaste",
  MOVE_TO_FOUNDATIONS: "moveToFoundations",
  STANDART_MOVE: "standartMove",
};

export const GAME_THUNKS = {
  GAME_INIT: joinPath([GAME_NAME, GAME_THUNKS_TYPES.GAME_INIT]),
  SET_NEW_GAME: joinPath([GAME_NAME, GAME_THUNKS_TYPES.SET_NEW_GAME]),
  SET_GAME_STATE: joinPath([GAME_NAME, GAME_THUNKS_TYPES.SET_GAME_STATE]),
  SET_GAME_STATUS: joinPath([GAME_NAME, GAME_THUNKS_TYPES.SET_GAME_STATUS]),
  HANDLE_STOCK_CLICK: joinPath([
    GAME_NAME,
    GAME_THUNKS_TYPES.HANDLE_STOCK_CLICK,
  ]),
  HANDLE_CARD_CLICK: joinPath([GAME_NAME, GAME_THUNKS_TYPES.HANDLE_CARD_CLICK]),
  DEAL_STOCK_TO_TABLEAUS: joinPath([
    GAME_NAME,
    GAME_THUNKS_TYPES.DEAL_STOCK_TO_TABLEAUS,
  ]),
  HANDLE_COLLECT_CARDS: joinPath([
    GAME_NAME,
    GAME_THUNKS_TYPES.HANDLE_COLLECT_CARDS,
  ]),
  HANDLE_SHUFFLE: joinPath([GAME_NAME, GAME_THUNKS_TYPES.HANDLE_SHUFFLE]),
  HANDLE_DROP: joinPath([GAME_NAME, GAME_THUNKS_TYPES.HANDLE_DROP]),
  MOVE_STOCK_WASTE: joinPath([GAME_NAME, GAME_THUNKS_TYPES.MOVE_STOCK_WASTE]),
  MOVE_TO_FOUNDATIONS: joinPath([
    GAME_NAME,
    GAME_THUNKS_TYPES.MOVE_TO_FOUNDATIONS,
  ]),
  STANDART_MOVE: joinPath([GAME_NAME, GAME_THUNKS_TYPES.STANDART_MOVE]),
};
