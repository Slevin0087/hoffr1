import storage from "../../../utils/Storage";
import {
  GAME_NAME,
  GAME_DEFAULT_STATE,
  GAME_STORAGE_KEYS,
  GAME_STATUSES,
  sessionState,
} from "../../../Configs/GameConfigs";
import { createSlice } from "@reduxjs/toolkit";
import {
  clickCard,
  clickStock,
  dealCards,
  dealCardsFromStockToTableaus,
} from "../decks/thunks";
import { reducers } from "./reducers";
import { cleaningCurrentDeck } from "../decks/slice";
import {
  calculatePoints,
  incrementMoves,
  updatePoints,
} from "../../../utils/gameSliceUtils";

const initialState =
  storage.getItem(GAME_STORAGE_KEYS.GAME) || GAME_DEFAULT_STATE;

const gamesSlice = createSlice({
  name: GAME_NAME,
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(dealCardsFromStockToTableaus.fulfilled, (state) => {
      state.entities[state.currentId].status = GAME_STATUSES.INIT;
      storage.setItem(GAME_STORAGE_KEYS.GAME, state);
    });
    builder.addCase(cleaningCurrentDeck, (state) => {
      const currentGame = state.entities[state.currentId];
      currentGame.sessionState = sessionState;
      storage.setItem(GAME_STORAGE_KEYS.GAME, state);
    });
    // builder.addCase(clickCard.fulfilled, (state, action) => {
    //   const { points } = action.payload;
    //   if (points.dealing?.count > 0) {
    //     updatePoints(state, points.dealing);
    //   }
    //   if (points.flipping?.count > 0) {
    //     updatePoints(state, points.flipping);
    //   }
    //   incrementMoves(state);
    //   storage.setItem(GAME_STORAGE_KEYS.GAME, state);
    // });
    builder.addCase(clickStock.fulfilled, (state) => {
      incrementMoves(state);
      storage.setItem(GAME_STORAGE_KEYS.GAME, state);
    });
    builder.addCase(dealCards.fulfilled, (state, action) => {
      const { isMoveUp } = action.payload;
      if (isMoveUp) {
        incrementMoves(state);
        storage.setItem(GAME_STORAGE_KEYS.GAME, state);
      }
    });
  },
});

export const {
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
} = gamesSlice.actions;

export default gamesSlice.reducer;
