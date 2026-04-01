import { createComponentSlice } from "./createComponentSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";
import {
  field_components_slice_names,
  field_components_default_state,
} from "../../../../Configs/FieldComponentsConfigs";

const stocksAdapter = createEntityAdapter({
  selectId: (stock) => stock.id,
});

const initialState = stocksAdapter.getInitialState(
  field_components_default_state.stocks,
);

const stocksSlice = createComponentSlice({
  name: field_components_slice_names.stocks,
  initialState,
});

export const {
  addPlayingCardOne: addPlayingCardStocksOne,
  addPlayingCardsMany: addPlayingCardsStocksMany,
  removePlayingCardOne: removePlayingCardStocksOne,
  removePlayingCardsAll: removePlayingCardsStocksAll,
  shufflePile: shuffleStocksPile,
} = stocksSlice.actions;

export default stocksSlice.reducer;
