import storage from "../../../utils/Storage";
import {
  DECKS_SLICE_NAME,
  DECKS_DEFAULT_STATE,
  DECK_STORAGE_KEYS,
} from "../../../Configs/PlayingCardsConfigs/DecksConfigs";
import { reducers } from "./reducers";
import { createSlice } from "@reduxjs/toolkit";

export const initialState =
  storage.getItem(DECK_STORAGE_KEYS.DECK) || DECKS_DEFAULT_STATE;

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
  shuffleStockCardsIds,
  setIsDraggingCardsByCardId,
  setHintShowColorPileById,
  setHintShowColor,
} = decksSlice.actions;

export default decksSlice.reducer;
