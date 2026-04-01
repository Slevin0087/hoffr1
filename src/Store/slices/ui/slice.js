import storage from "../../../utils/Storage.js";
import { createSlice } from "@reduxjs/toolkit";
import {
  UI_DEFAULTS_STATE,
  UI_SLICE_NAME,
  UI_STORE_KEYS,
} from "../../../Configs/UIConfigs.js";
import { flipTopCardOne } from "../decks/thunks.js";
import { reducers } from "./reducers.js";

const initialState = storage.getItem(UI_STORE_KEYS.UI) || UI_DEFAULTS_STATE;

const uiSlice = createSlice({
  name: UI_SLICE_NAME,
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(flipTopCardOne.pending, (state, action) => {
      // storage.setItem(UI_STORE_KEYS.UI, state);
    });
  },
});

export const { setActivePageId, setReducedMotion } = uiSlice.actions;

export default uiSlice.reducer;
