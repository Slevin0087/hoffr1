import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import {
  SETTINGS_DEFAULT_STATE,
  SETTINGS_SLICE_NAME,
} from "../../../Configs/SettingsConfigs";

export const initialState = SETTINGS_DEFAULT_STATE;

export const settingsSlice = createSlice({
  name: SETTINGS_SLICE_NAME,
  initialState,
  reducers,
});

export const { updateSettingByType } = settingsSlice.actions;
export default settingsSlice.reducer;
