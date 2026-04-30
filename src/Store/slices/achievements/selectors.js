import { createSelector } from "@reduxjs/toolkit";

export const selectAchievements = (state) => state.achievements;

export const selectAchieventActiveId = createSelector(
  [(state) => selectAchievements(state)],
  (achievements) => achievements?.activeId,
);

export const selectAchUnlockedIds = createSelector(
  [(state) => selectAchievements(state)],
  (achievements) => achievements?.unlockedIds,
);

export const selectAchLockedIds = createSelector(
  [(state) => selectAchievements(state)],
  (achievements) => achievements?.lockedIds,
);
