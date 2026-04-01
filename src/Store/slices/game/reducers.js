import { current } from "@reduxjs/toolkit";
import { GAME_STATUSES, GAME_STORAGE_KEYS } from "../../../Configs/GameConfigs";
import storage from "../../../utils/Storage";

export const setGameStatus = (state, action) => {
  state.entities[state.currentId].status = action.payload;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const incrementCoins = (state, action) => {
  state.entities[state.currentId].coins += action.payload;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const decrementCoins = (state, action) => {
  state.entities[state.currentId].coins -= action.payload;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const resetCoins = (state) => {
  state.entities[state.currentId].coins = 0;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const incrementLifetimeStateByType = (state, action) => {
  const { type, key, value } = action.payload;
  state.entities[state.currentId].lifetimeState[type][key] += value;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const decrementLifetimeStateByType = (state, action) => {
  const { type, key, value } = action.payload;
  state.entities[state.currentId].lifetimeState[type][key] -= value;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const incrementSessionStateByType = (state, action) => {
  const { type, key, value, changesData } = action.payload;
  const sessionState = state.entities[state.currentId].sessionState;
  sessionState[type][key] += value;
  sessionState[type].data = {
    ...sessionState[type].data,
    ...changesData,
  };
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const decrementSessionStateByType = (state, action) => {
  const { type, key, value, changesData } = action.payload;
  const sessionState = state.entities[state.currentId].sessionState;
  sessionState[type][key] -= value;
  sessionState[type].data = {
    ...sessionState[type].data,
    ...changesData,
  };
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const setLifetimeState = (state, action) => {
  state.entities[state.currentId].lifetimeState = action.payload;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const setSessionState = (state, action) => {
  state.entities[state.currentId].sessionState = action.payload;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const resetSessionState = (state) => {
  state.entities[state.currentId].sessionState = {};
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const resetLifetimeState = (state) => {
  state.entities[state.currentId].lifetimeState = {};
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const resetGame = (state) => {
  state.entities[state.currentId].status = GAME_STATUSES.INIT;
  state.entities[state.currentId].coins = 0;
  state.entities[state.currentId].lifetimeState = {};
  state.entities[state.currentId].sessionState = {};
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const incrementSessionState = (state, action) => {
  const { type, key } = action.payload;
  state.entities[state.currentId].sessionState[type][key] += 1;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const resetSessionByType = (state, action) => {
  const { type, key } = action.payload;
  state.entities[state.currentId].sessionState[type][key] = 0;
};

export const incrementLifetimeState = (state, action) => {
  const { type, key } = action.payload;
  state.entities[state.currentId].lifetimeState[type][key] += 1;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const decrementSessionState = (state, action) => {
  const { type, key } = action.payload;
  state.entities[state.currentId].sessionState[type][key] -= 1;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const decrementLifetimeState = (state, action) => {
  const { type, key } = action.payload;
  state.entities[state.currentId].lifetimeState[type][key] -= 1;
  storage.setItem(GAME_STORAGE_KEYS.GAME, state);
};

export const reducers = {
  setGameStatus,
  incrementCoins,
  decrementCoins,
  resetCoins,
  incrementLifetimeStateByType,
  decrementLifetimeStateByType,
  incrementSessionStateByType,
  decrementSessionStateByType,
  setLifetimeState,
  setSessionState,
  resetSessionState,
  resetLifetimeState,
  resetGame,
  resetSessionByType,
  incrementSessionState,
  incrementLifetimeState,
  decrementSessionState,
  decrementLifetimeState,
};
