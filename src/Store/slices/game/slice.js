import { GAME_NAME, GAME_DEFAULT_STATE } from "../../../Configs/GameConfigs";
import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";

const initialState = GAME_DEFAULT_STATE;

const gamesSlice = createSlice({
  name: GAME_NAME,
  initialState,
  reducers,
});

export const {
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
} = gamesSlice.actions;

export default gamesSlice.reducer;
