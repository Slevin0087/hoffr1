import { createEntityAdapter } from "@reduxjs/toolkit";
import { createComponentSlice } from "./createComponentSlice";
import {
  field_components_slice_names,
  field_components_default_state,
} from "../../../../Configs/FieldComponentsConfigs";

const foundationsAdapter = createEntityAdapter({
  selectId: (foundation) => foundation.id,
});

const initialState = foundationsAdapter.getInitialState(
  field_components_default_state.foundations,
);

const foundationsSlice = createComponentSlice({
  name: field_components_slice_names.foundations,
  initialState,
});

export const {
  addPlayingCardOne: addPlayingCardFoundationsOne,
  addPlayingCardsMany: addPlayingCardFoundationsMany,
  removePlayingCardOne: removePlayingCardFoundationsOne,
  removePlayingCardsAll: removePlayingCardsFoundationsAll,
} = foundationsSlice.actions;

export default foundationsSlice.reducer;
