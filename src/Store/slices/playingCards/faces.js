import { createSlice } from "@reduxjs/toolkit";
import storage from "../../../utils/Storage";
import {
  FACES_SLICE_NAME,
  FACES_DEFAULT_STATE,
  FACES_STORAGE_KEYS,
} from "../../../Configs/PlayingCardsConfigs/FacesConfigs";

const initialState =
  storage.getItem(FACES_STORAGE_KEYS.FACES) || FACES_DEFAULT_STATE;

const facesSlice = createSlice({
  name: FACES_SLICE_NAME,
  initialState,
  reducers: {
    setActiveFaces: (state, action) => {
      state.activeId = action.payload;
      storage.setItem(FACES_STORAGE_KEYS.FACES, state);
    },
  },
});

export const { setActiveFaces } = facesSlice.actions;

export default facesSlice.reducer;
