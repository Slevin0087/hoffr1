import { createSelector } from "@reduxjs/toolkit";

export const selectAppearances = (state) => state.appearances;

export const selectTypeAppearancesByType = createSelector(
  [(state) => selectAppearances(state), (_, type) => type],
  (appearances, type) => appearances[type],
);

export const selectAppearancesActiveIdByType = createSelector(
  [(state, type) => selectTypeAppearancesByType(state, type)],
  (appearancesByType) => appearancesByType.activeId,
);

export const selectAppearancesUnlockedsIdsByType = createSelector(
  [(state, type) => selectTypeAppearancesByType(state, type)],
  (appearancesByType) => appearancesByType.unlockedsIds,
);

export const selectApperancesAllLockedsIds = createSelector(
  [(state) => selectAppearances(state)],
  (appearances) =>
    Object.values(appearances).flatMap(({ lockedsIds }) => lockedsIds),
);
