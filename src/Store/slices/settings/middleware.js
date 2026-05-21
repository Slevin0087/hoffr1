import i18next from "i18next";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import { updateSettingByType } from "./slice";
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const settingsListeners = createListenerMiddleware();

settingsListeners.startListening({
  actionCreator: updateSettingByType,
  effect: async (action) => {
    const { type, changes } = action.payload;
    if (type === gameSettingsTypes.language) {
      await i18next.changeLanguage(changes.value);
    }
  },
});
