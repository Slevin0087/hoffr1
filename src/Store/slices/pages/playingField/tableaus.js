import { createComponentSlice } from "./createComponentSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";
import {
  field_components_slice_names,
  field_components_default_state,
} from "../../../../Configs/FieldComponentsConfigs";

const tableausAdapter = createEntityAdapter({
  selectId: (tableau) => tableau.id,
});

const initialState = tableausAdapter.getInitialState(
  field_components_default_state.tableaus,
);

const tableausSlice = createComponentSlice({
  name: field_components_slice_names.tableaus,
  initialState,
});

export const {
  addPlayingCardOne: addPlayingCardTableausOne,
  addPlayingCardsMany: addPlayingCardsTableausMany,
  removePlayingCardOne: removePlayingCardTableausOne,
  removePlayingCardsAll: removePlayingCardsTableausAll,
  updatePlayingCardOne: updatePlayingCardTableausOne,
  updatePlayingCardsMany: updatePlayingCardsTableausMany,
} = tableausSlice.actions;

export default tableausSlice.reducer;
