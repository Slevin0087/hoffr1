import { current } from "@reduxjs/toolkit";
import { SETTINGS_STORAGE_KEYS } from "../../../Configs/SettingsConfigs";
import storage from "../../../utils/Storage";

export const updateSettingByType = (state, action) => {
  const { type, changes } = action.payload;
  console.log("type, changes: ", type, changes, current(state));
  const currentSetting = state[type];
  state[type] = {
    ...currentSetting,
    ...changes,
  };
  storage.setItem(SETTINGS_STORAGE_KEYS.SETTINGS, state);
};

export const reducers = { updateSettingByType };
