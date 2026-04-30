import { createSelector } from "@reduxjs/toolkit";
import { selectActiveDealing, selectGame } from "../selectors";

export const selectlifetimePoints = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.points,
);

export const selectPointsState = createSelector(
  [(state) => selectActiveDealing(state)],
  (activeDealing) => activeDealing?.points,
);

export const selectCurrentPoints = createSelector(
  [(state) => selectPointsState(state)],
  (pointsState) => pointsState?.current,
);

export const selectPrevCurrentPoints = createSelector(
  [(state) => selectPointsState(state)],
  (pointsState) => pointsState?.prevCurrent,
);

export const selectCurrentBestPoints = createSelector(
  [(state) => selectPointsState(state)],
  (pointsState) => pointsState?.best,
);

export const selectIsBestPoints = createSelector(
  [(state) => selectPointsState(state)],
  (pointsState) => pointsState?.current > pointsState?.best,
);
