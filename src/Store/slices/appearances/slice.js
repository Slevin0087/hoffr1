import { createSlice } from "@reduxjs/toolkit";
import {
  APPEARANCES_DEFAULT_STATE,
  APPEARANCES_SLICE_NAME,
} from "../../../Configs/AppearancesConfigs";
import { reducers } from "./reducers";

export const initialState = APPEARANCES_DEFAULT_STATE;

export const appearancesslice = createSlice({
  name: APPEARANCES_SLICE_NAME,
  initialState,
  reducers,
});

export const { setActiveIdAppearanceByType, addAppearanceIdToUnlockedsIds } =
  appearancesslice.actions;

export default appearancesslice.reducer;
