import storage from "../../../utils/Storage";
import {
  GAME_NAME,
  GAME_DEFAULT_STATE,
  GAME_STORAGE_KEYS,
} from "../../../Configs/GameConfigs";
import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { extraReducers } from "./exrtaReducers";

const initialState =
  storage.getItem(GAME_STORAGE_KEYS.GAME) || GAME_DEFAULT_STATE;

const gamesSlice = createSlice({
  name: GAME_NAME,
  initialState,
  reducers,
  extraReducers,
});

export const {
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
  updateCombo,
  addComboBonusTime,
  resetCombo,
} = gamesSlice.actions;

export default gamesSlice.reducer;
