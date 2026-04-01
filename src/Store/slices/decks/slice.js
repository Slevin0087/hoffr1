import storage from "../../../utils/Storage";
import {
  DECKS_SLICE_NAME,
  DECKS_DEFAULT_STATE,
  DECK_STORAGE_KEYS,
} from "../../../Configs/PlayingCardsConfigs/DecksConfigs";
import { reducers } from "./reducers";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { dealCardsFromStockToTableaus } from "./thunks";

const deckAdapter = createEntityAdapter({
  selectId: (deck) => deck.id,
});

const defaultState =
  storage.getItem(DECK_STORAGE_KEYS.DECK) || DECKS_DEFAULT_STATE;

export const initialState = deckAdapter.getInitialState(defaultState);

const decksSlice = createSlice({
  name: DECKS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(dealCardsFromStockToTableaus.fulfilled, (state) => {
      storage.setItem(DECK_STORAGE_KEYS.DECK, state);
    });
  },
});

export const {
  initStockCards,
  incrementRedeals,
  addCardOne,
  updateCardOne,
  cleaningCurrentDeck,
  setDraggedCards,
  clearDraggedCards,
  setIsEventsInDeck,
} = decksSlice.actions;

export default decksSlice.reducer;
