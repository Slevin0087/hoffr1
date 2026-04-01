import { createSelector } from "@reduxjs/toolkit";

export const selectAchievements = (state) => state.achievements;

export const selectAchieventActiveId = createSelector(
  [(state) => selectAchievements(state)],
  (achievements) => achievements?.activeId,
);
