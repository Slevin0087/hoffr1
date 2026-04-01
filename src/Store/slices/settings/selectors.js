import { createSelector } from "@reduxjs/toolkit";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import { selectReducedMotion } from "../ui/selectors";

export const selectSettings = (state) => state.settings;

export const selectSettingsByType = createSelector(
  [(state) => selectSettings(state), (_, stateType) => stateType],
  (settingsState, stateType) => settingsState?.[stateType],
);

export const selectAnimationsEnabled = createSelector(
  [
    (state) => selectReducedMotion(state),
    (state) => selectSettingsByType(state, gameSettingsTypes.animations),
  ],
  (isReducedMotion, animationsSetting) =>
    !isReducedMotion && animationsSetting?.value,
);
