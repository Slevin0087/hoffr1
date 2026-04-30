import storage from "../../../utils/Storage";
import { SETTINGS_STORAGE_KEYS } from "../../../Configs/SettingsConfigs";

export const updateSettingByType = (state, action) => {
  const { type, changes } = action.payload;
  const currentSetting = state[type];
  state[type] = { ...currentSetting, ...changes };
  storage.setItem(SETTINGS_STORAGE_KEYS.SETTINGS, state);
};

export const reducers = { updateSettingByType };
