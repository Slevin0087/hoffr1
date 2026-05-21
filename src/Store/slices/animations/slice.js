import { createSlice } from "@reduxjs/toolkit";
import {
  ANIMATIONS_DEFAULT_STATE,
  ANIMATIONS_SLICE_NAME,
} from "../../../Configs/AnimationsConfigs";
import { reducers } from "./reducers";

const initialState = ANIMATIONS_DEFAULT_STATE;

const animationsSlice = createSlice({
  name: ANIMATIONS_SLICE_NAME,
  initialState,
  reducers,
});

export const { toggleAnimationsOn, setIsAnimatingCards } =
  animationsSlice.actions;

export default animationsSlice.reducer;
