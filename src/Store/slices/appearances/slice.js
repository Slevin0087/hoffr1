import { createSlice } from "@reduxjs/toolkit";
import {
  APPEARANCES_DEFAULT_STATE,
  APPEARANCES_SLICE_NAME,
  APPEARANCES_STORAGE_KEYS,
} from "../../../Configs/AppearancesConfigs";
import storage from "../../../utils/Storage";
import { reducers } from "./reducers";

export const initialState =
  storage.getItem(APPEARANCES_STORAGE_KEYS.APPEARANCES) ||
  APPEARANCES_DEFAULT_STATE;

export const appearancesslice = createSlice({
  name: APPEARANCES_SLICE_NAME,
  initialState,
  reducers,
});

export const { setSelectedIdAppearanceByType, addAppearanceIdToOwnedsIds } =
  appearancesslice.actions;

export default appearancesslice.reducer;
