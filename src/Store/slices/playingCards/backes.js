import { createSlice } from "@reduxjs/toolkit";
import {
  BACKES_SLICE_NAME,
  BACKE_DEFAULT_STATE,
  BACKE_STORAGE_KEYS,
} from "../../../Configs/PlayingCardsConfigs/ShirtsConfigs";
import storage from "../../../utils/Storage";

const initialState =
  storage.getItem(BACKE_STORAGE_KEYS.BACKES) || BACKE_DEFAULT_STATE;

const backesSlice = createSlice({
  name: BACKES_SLICE_NAME,
  initialState,
  reducers: {
    setActiveBackes: (state, action) => {
      state.activeBackId = action.payload;
      storage.setItem(BACKE_STORAGE_KEYS.BACKES, state);
    },
  },
});

export const { setActiveBackes } = backesSlice.actions;

export default backesSlice.reducer;
