import {
  dealingCounts,
  directionsTypes,
  GAME_STATUSES,
  scoreOperations,
} from "../../../Configs/GameConfigs";
import { GAME_MODES_IDS } from "../../../Configs/GameModes";
import { COMBO_MAX_COUNT, COMBO_WINDOW } from "../../../Configs/ComboConfigs";

const TIME_COMBO_INITIAL = { current: 0, lastTimestamp: 0 };

export const setGameStatus = (state, action) => {
  console.log(
    "state.status === action.payload  ",
    state.status === action.payload,
  );
  if (state.status === action.payload) return;
  state.status = action.payload;

  if (action.payload === GAME_STATUSES.PLAYING) {
    state.isTimeStarted = true;
    state.isGameStarted = true;
    state.isFirstCardsEvent = true;
    return;
  }
  if (action.payload === GAME_STATUSES.PAUSED) {
    state.isTimeStarted = false;
    state.isGameStarted = false;
    state.isFirstCardsEvent = false;
    return;
  }
};

export const setPlayerName = (state, action) => {
  const { name } = action.payload;
  state.playerName = name;
};

export const setIsFirstCardsEvent = (state, action) => {
  state.isFirstCardsEvent = action.payload;
};

export const setIsEventsInDeck = (state, action) => {
  state.isEventsInDeck = action.payload;
};

export const setIsTimeStarted = (state, action) => {
  state.isTimeStarted = action.payload;
};

export const setIsGameStarted = (state, action) => {
  state.isGameStarted = action.payload;
  if (action.payload === true) {
    const currentDealing = state.modes[state.currentModeId].currentDealing;
    state.modes[state.currentModeId][currentDealing].played += 1;
    state.modes[state.currentModeId].played += 1;
    state.played += 1;
  }
};

export const setIsCollectingCards = (state, action) => {
  state.isCollectingCards = action.payload;
};

export const initGame = (state, action) => {
  const { currentModeId, currentDealing } = action.payload;
  state.currentModeId = currentModeId;
  state.isTimeStarted = false;
  state.isGameStarted = false;
  state.isFirstCardsEvent = false;
  const isTimedMode = currentModeId === GAME_MODES_IDS.TIMED;
  const timeCurrent = isTimedMode ? 180 : 0;
  state.modes[currentModeId].currentDealing = currentDealing;
  state.modes[currentModeId][currentDealing].undo.current = 0;
  state.modes[currentModeId][currentDealing].undo.stack = [];
  state.modes[currentModeId][currentDealing].moves.current = 0;
  state.modes[currentModeId][currentDealing].hints.current = 0;
  state.modes[currentModeId][currentDealing].redeals.current = 0;
  state.modes[currentModeId][currentDealing].shuffle.current = 0;
  state.modes[currentModeId][currentDealing].points.current = 0;
  state.modes[currentModeId][currentDealing].time.current = timeCurrent;

  if (isTimedMode) {
    state.modes[currentModeId][currentDealing].timeCombo = {
      ...TIME_COMBO_INITIAL,
    };
  }
};

export const endedGame = (state, action) => {
  const { status } = action.payload;
  const currentModeId = state.currentModeId;
  const currentDealing = state.modes[currentModeId].currentDealing;

  const currentMode = state.modes[currentModeId];
  const dealingStats = currentMode[currentDealing];

  state.isGameStarted = false;
  state.isTimeStarted = false;
  state.isFirstCardsEvent = false;

  if (status === GAME_STATUSES.WON) {
    state.wins += 1;
    currentMode.wins += 1;
    dealingStats.wins.total += 1;
    dealingStats.wins.time = dealingStats.time.current;

    const isTimedMode = currentModeId === GAME_MODES_IDS.TIMED;
    const hasBestTime = dealingStats.time.best !== null;

    if (!isTimedMode) {
      const isBestTime = dealingStats.time.current < dealingStats.time.best;
      if (!hasBestTime || isBestTime) {
        dealingStats.time.best = dealingStats.time.current;
      }
    } else {
      const currentSessionTime =
        dealingStats.time.current + dealingStats.time.bonus;
      const remainingTime = dealingStats.time.limit - currentSessionTime;
      const hasTimeLeft =
        remainingTime > 0 && remainingTime < dealingStats.time.limit;
      const isBestTime = hasTimeLeft && remainingTime > dealingStats.time.best;
      if (!hasBestTime || isBestTime) {
        dealingStats.time.best = remainingTime;
      }
    }

    if (dealingStats.undo.current === 0) {
      dealingStats.wins.no_undo += 1;
    }
    if (dealingStats.hints.current === 0) {
      dealingStats.wins.no_hints += 1;
    }
  } else if (status === GAME_STATUSES.GAME_OVER) {
    state.losses += 1;
    currentMode.losses += 1;
    dealingStats.losses += 1;
  }
};

export const updatePoints = (state, action) => {
  const { count, operation } = action.payload;
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  const pointsState = state.modes[state.currentModeId][currentDealing].points;
  pointsState.prevCurrent = pointsState.current;
  if (operation === scoreOperations.increment) {
    pointsState.current += count;
    pointsState.total += count;
    state.modes[state.currentModeId].points += count;
    state.points += count;
    if (pointsState.best === null || pointsState.current > pointsState.best) {
      pointsState.best = pointsState.current;
    }
  } else if (operation === scoreOperations.decrement) {
    pointsState.current -= count;
    pointsState.total -= count;
    state.modes[state.currentModeId].points -= count;
    state.points -= count;
  }
};

export const updateTime = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  const direction =
    state.modes[state.currentModeId][currentDealing].time.direction;
  if (direction === directionsTypes.increment) {
    state.modes[state.currentModeId][currentDealing].time.current += 1;
  } else if (direction === directionsTypes.decrement) {
    state.modes[state.currentModeId][currentDealing].time.current -= 1;
  }
  state.modes[state.currentModeId][currentDealing].time.total += 1;
  state.modes[state.currentModeId].time += 1;
  state.time += 1;
  // // Сохранение времени вместе со всем остальным состоянием при каждом тике может быть слишком частым, поэтому перенесено в middleware с оптимизацией по частоте сохранения
};

export const incrementMoves = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  state.modes[state.currentModeId][currentDealing].moves.current += 1;
  state.modes[state.currentModeId][currentDealing].moves.total += 1;
  state.modes[state.currentModeId].moves += 1;
  state.moves += 1;
};

export const incrementRedeals = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  state.modes[state.currentModeId][currentDealing].redeals.current += 1;
};

export const decrementRedeals = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  state.modes[state.currentModeId][currentDealing].redeals.current -= 1;
};

export const incrementShuffle = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  if (currentDealing === dealingCounts.one) return;
  state.modes[state.currentModeId][currentDealing].shuffle.current += 1;
};

export const decrementShuffle = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  if (currentDealing === dealingCounts.one) return;
  state.modes[state.currentModeId][currentDealing].shuffle.current -= 1;
};

export const resetCoins = (state) => {
  state.coins = 0;
};

export const removeUndo = (state, action) => {
  const { id } = action.payload;
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  const undoStack = state.modes[state.currentModeId][currentDealing].undo.stack;
  state.modes[state.currentModeId][currentDealing].undo.stack =
    undoStack.filter((undo) => undo.id !== id);
};

export const incrementUndoUsed = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  state.modes[state.currentModeId][currentDealing].undo.current += 1;
};

export const incrementHintsUsed = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  state.modes[state.currentModeId][currentDealing].hints.current += 1;
};

export const resetUndoUsed = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  state.modes[state.currentModeId][currentDealing].undo.current = 0;
};

export const resetHintsUsed = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  state.modes[state.currentModeId][currentDealing].hints.current = 0;
};

export const addUndo = (state, action) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  const undoStack = state.modes[state.currentModeId][currentDealing].undo.stack;
  const id = `undo-${undoStack.length}`;
  const { type, data } = action.payload;
  console.log("addUndo: ", action.payload);
  const undo = { id, type, data };
  state.modes[state.currentModeId][currentDealing].undo.stack.push(undo);
};

export const updateCombo = (state, action) => {
  const { count = 0 } = action.payload;
  const currentModeId = state.currentModeId;
  const isTimedMode = currentModeId === GAME_MODES_IDS.TIMED;
  if (count === 0 || !isTimedMode) return;
  const currentDealing = state.modes[currentModeId].currentDealing;
  const comboState = state.modes[currentModeId][currentDealing].timeCombo;

  // Сбросом combo управляет middleware через setTimeout (comboTimeoutId)
  comboState.current = Math.min(comboState.current + count, COMBO_MAX_COUNT);
  comboState.lastTimestamp = Date.now();
};

export const addComboBonusTime = (state, action) => {
  const { seconds = 0 } = action.payload;
  const currentModeId = state.currentModeId;
  const isTimedMode = currentModeId === GAME_MODES_IDS.TIMED;
  if (seconds === 0 || !isTimedMode) return;
  const currentDealing = state.modes[currentModeId].currentDealing;
  const direction = state.modes[currentModeId][currentDealing].time.direction;
  if (direction === directionsTypes.decrement) {
    state.modes[currentModeId][currentDealing].time.bonus += seconds;
    state.modes[currentModeId][currentDealing].time.current += seconds;
  }
};

export const resetCombo = (state) => {
  if (state.currentModeId !== GAME_MODES_IDS.TIMED) return;
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  const comboState = state.modes[state.currentModeId][currentDealing].timeCombo;
  comboState.current = 0;
  comboState.lastTimestamp = 0;
};

export const reducers = {
  setGameStatus,
  setPlayerName,
  setIsFirstCardsEvent,
  setIsEventsInDeck,
  setIsTimeStarted,
  setIsGameStarted,
  setIsCollectingCards,
  initGame,
  endedGame,
  updatePoints,
  updateTime,
  incrementMoves,
  incrementRedeals,
  decrementRedeals,
  incrementShuffle,
  decrementShuffle,
  resetCoins,
  addUndo,
  removeUndo,
  incrementUndoUsed,
  incrementHintsUsed,
  resetUndoUsed,
  resetHintsUsed,
  updateCombo,
  addComboBonusTime,
  resetCombo,
};
