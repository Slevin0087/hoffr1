import i18next from "i18next";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import { updateSettingByType } from "./slice";
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const settingsListeners = createListenerMiddleware();

// settingsListeners.startListening({
//   actionCreator: updateSettingByType.pending,
//   effect: async (action, listenerApi) => {
//     console.log("updateSettingByType.pending: ", action);
//     const { settingType, value } = action.payload;
//   },
// });

settingsListeners.startListening({
  actionCreator: updateSettingByType,
  effect: async (action) => {
    const { type, changes } = action.payload;
    if (type === gameSettingsTypes.language) {
      await i18next.changeLanguage(changes.value);
    }
  },
});
