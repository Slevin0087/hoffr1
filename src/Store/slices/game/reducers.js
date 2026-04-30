import storage from "../../../utils/Storage";
import {
  directionsTypes,
  GAME_STATUSES,
  GAME_STORAGE_KEYS,
  scoreOperations,
} from "../../../Configs/GameConfigs";
import { GAME_MODES_IDS } from "../../../Configs/GameModes";
import { current } from "@reduxjs/toolkit";

export const setGameStatus = (state, action) => {
  state.status = action.payload;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const setPlayerName = (state, action) => {
  const { name } = action.payload;
  state.playerName = name;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const setIsFirstCardsEvent = (state, action) => {
  state.isFirstCardsEvent = action.payload;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const setIsEventsInDeck = (state, action) => {
  state.isEventsInDeck = action.payload;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const setIsTimeStarted = (state, action) => {
  state.isTimeStarted = action.payload;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const setIsGameStarted = (state, action) => {
  console.log("setIsGameStarted", action.payload);
  state.isStarted = action.payload;
  if (action.payload === true) {
    const currentDealing = state.modes[state.currentModeId].currentDealing;
    state.modes[state.currentModeId][currentDealing].played += 1;
    state.modes[state.currentModeId].played += 1;
    state.played += 1;
  }
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const initGame = (state, action) => {
  const { currentModeId, currentDealing } = action.payload;
  state.currentModeId = currentModeId;
  state.isTimeStarted = false;
  state.isGameStarted = false;
  state.isStarted = false;
  state.isFirstCardsEvent = false;
  state.modes[currentModeId].currentDealing = currentDealing;
  state.modes[currentModeId][currentDealing].undo.current = 0;
  state.modes[currentModeId][currentDealing].undo.stack = [];
  state.modes[currentModeId][currentDealing].moves.current = 0;
  state.modes[currentModeId][currentDealing].hints.current = 0;
  state.modes[currentModeId][currentDealing].redeals.current = 0;
  state.modes[currentModeId][currentDealing].points.current = 0;
  state.modes[currentModeId][currentDealing].time.current =
    currentModeId === GAME_MODES_IDS.TIMED ? 180 : 0;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const endedGame = (state, action) => {
  const { status } = action.payload;
  const currentModeId = state.currentModeId;
  const currentDealing = state.modes[currentModeId].currentDealing;
  const mode = state.modes[currentModeId];
  const dealingStats = mode[currentDealing];
  const time = dealingStats.time;
  const undo = dealingStats.undo;
  const hints = dealingStats.hints;

  state.status = status;
  state.isStarted = false;
  state.isGameStarted = false;
  state.isTimeStarted = false;

  if (status === GAME_STATUSES.WON) {
    state.wins += 1;
    mode.wins += 1;
    dealingStats.wins.total += 1;
    dealingStats.wins.time = time.current;
    console.log("endedGame time.current", time.current);
    const winTime =
      time.limit === null ? time.current : time.limit - time.current;

    if (dealingStats.time.best === null || winTime < dealingStats.time.best) {
      dealingStats.time.best = winTime;
    }
    if (undo.current === 0) {
      dealingStats.wins.no_undo += 1;
    }
    if (hints.current === 0) {
      dealingStats.wins.no_hints += 1;
    }
  } else if (status === GAME_STATUSES.GAME_OVER) {
    state.losses += 1;
    mode.losses += 1;
    dealingStats.losses += 1;
  }

  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
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
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
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
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const incrementMoves = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  state.modes[state.currentModeId][currentDealing].moves.current += 1;
  state.modes[state.currentModeId][currentDealing].moves.total += 1;
  state.modes[state.currentModeId].moves += 1;
  state.moves += 1;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const incrementRedeals = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  state.modes[state.currentModeId][currentDealing].redeals.current += 1;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const resetCoins = (state) => {
  state.coins = 0;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const removeUndo = (state, action) => {
  const { id } = action.payload;
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  const undoStack = state.modes[state.currentModeId][currentDealing].undo.stack;
  state.modes[state.currentModeId][currentDealing].undo.stack =
    undoStack.filter((undo) => undo.id !== id);
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const incrementUndoUsed = (state) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  state.modes[state.currentModeId][currentDealing].undo.current += 1;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const addUndo = (state, action) => {
  const currentDealing = state.modes[state.currentModeId].currentDealing;
  const undoStack = state.modes[state.currentModeId][currentDealing].undo.stack;
  const id = `undo-${undoStack.length}`;
  const { type, data } = action.payload;
  console.log("addUndo: ", action.payload);
  const undo = { id, type, data };
  state.modes[state.currentModeId][currentDealing].undo.stack.push(undo);
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const reducers = {
  setGameStatus,
  setPlayerName,
  setIsFirstCardsEvent,
  setIsEventsInDeck,
  setIsTimeStarted,
  setIsGameStarted,
  initGame,
  endedGame,
  updatePoints,
  updateTime,
  incrementMoves,
  incrementRedeals,
  resetCoins,
  addUndo,
  removeUndo,
  incrementUndoUsed,
};
