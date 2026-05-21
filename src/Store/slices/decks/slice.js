import {
  DECKS_SLICE_NAME,
  DECKS_DEFAULT_STATE,
} from "../../../Configs/DecksConfigs";
import { reducers } from "./reducers";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = DECKS_DEFAULT_STATE;

const decksSlice = createSlice({
  name: DECKS_SLICE_NAME,
  initialState,
  reducers,
});

export const {
  initStockCards,
  addCardOne,
  updateCardOne,
  resetIsDraggingCardsByPileId,
  resetDeck,
  setDraggingCards,
  clearDraggingCards,
  setTabsShirtCardsIds,
  addTabsShirtCardIdOne,
  removeTabsShirtCardsIds,
  removeTabsShirtCardIdOne,
  shuffleCardsByPileId,
  setIsDraggingCardsByCardId,
  setIsHintShowPileById,
  setIsHintShowing,
} = decksSlice.actions;

export default decksSlice.reducer;
