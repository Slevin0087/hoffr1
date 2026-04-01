import { createSlice } from "@reduxjs/toolkit";
import {
  FONS_SLICE_NAME,
  FON_DEFAULT_STATE,
  FON_STORAGE_KEYS,
} from "../../../../Configs/FonsConfigs";
import storage from "../../../../utils/Storage";

const initialState =
  storage.getItem(FON_STORAGE_KEYS.FONS) || FON_DEFAULT_STATE;

const fonsSlice = createSlice({
  name: FONS_SLICE_NAME,
  initialState,
  reducers: {
    setActiveFon: (state, action) => {
      state.activeId = action.payload;
      storage.setItem(FON_STORAGE_KEYS.FONS, state);
    },
  },
});

export const { setActiveFon } = fonsSlice.actions;

export default fonsSlice.reducer;
