import storage from "../../../utils/Storage";
import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import {
  SETTINGS_DEFAULT_STATE,
  SETTINGS_SLICE_NAME,
  SETTINGS_STORAGE_KEYS,
} from "../../../Configs/SettingsConfigs";

export const initialState =
  storage.getItem(SETTINGS_STORAGE_KEYS.SETTINGS) || SETTINGS_DEFAULT_STATE;

export const settingsSlice = createSlice({
  name: SETTINGS_SLICE_NAME,
  initialState,
  reducers,
});

export const { updateSettingByType } = settingsSlice.actions;
export default settingsSlice.reducer;
