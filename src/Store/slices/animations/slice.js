import storage from "../../../utils/Storage";
import { createSlice } from "@reduxjs/toolkit";
import {
  ANIMATIONS_DEFAULT_STATE,
  ANIMATIONS_SLICE_NAME,
  ANIMATIONS_STORAGE_KEYS,
} from "../../../Configs/AnimationsConfigs";
import { reducers } from "./reducers";

const initialState =
  storage.getItem(ANIMATIONS_STORAGE_KEYS.ANIMATIONS) ||
  ANIMATIONS_DEFAULT_STATE;

const animationsSlice = createSlice({
  name: ANIMATIONS_SLICE_NAME,
  initialState,
  reducers,
});

export const { toggleAnimationsOn, setIsAnimatingCards } = animationsSlice.actions;

export default animationsSlice.reducer;
