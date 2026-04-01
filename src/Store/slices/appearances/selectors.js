import { createSelector } from "@reduxjs/toolkit";

export const selectAppearances = (state) => state.appearances;

export const selectTypeAppearancesByType = createSelector(
  [(state) => selectAppearances(state), (_, type) => type],
  (appearances, type) => appearances[type],
);

export const selectAppearancesSelectedIdByType = createSelector(
  [(state, type) => selectTypeAppearancesByType(state, type)],
  (appearancesByType) => appearancesByType.selectedId,
);

export const selectAppearancesOwnedsIdsByType = createSelector(
  [(state, type) => selectTypeAppearancesByType(state, type)],
  (appearancesByType) => appearancesByType.ownedsIds,
);
