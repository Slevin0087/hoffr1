import { createEntityAdapter } from "@reduxjs/toolkit";
import { createComponentSlice } from "./createComponentSlice";
import {
  field_components_slice_names,
  field_components_default_state,
} from "../../../../Configs/FieldComponentsConfigs";

const wastesAdapter = createEntityAdapter({
  selectId: (waste) => waste.id,
});

const initialState = wastesAdapter.getInitialState(
  field_components_default_state.wastes,
);

const wastesSlice = createComponentSlice({
  name: field_components_slice_names.wastes,
  initialState,
});

export const {
  addPlayingCardOne: addPlayingCardWastesOne,
  addPlayingCardsMany: addPlayingCardsWastesMany,
  removePlayingCardOne: removePlayingCardWastesOne,
  removePlayingCardsAll: removePlayingCardsWastesAll,
} = wastesSlice.actions;

export default wastesSlice.reducer;
