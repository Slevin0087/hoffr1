import { createSelector } from "@reduxjs/toolkit";
import { selectActiveDealing } from "../selectors";
import { selectPointsState } from "./points";

export const selectHintsState = createSelector(
  [(state) => selectActiveDealing(state)],
  (activeDealing) => activeDealing.hints,
);

export const selectIsCanUseHint = createSelector(
  [(state) => selectHintsState(state), (state) => selectPointsState(state)],
  (hintsState, pointsState) => {
    console.log('selectIsCanUseHint');
    const hintsLimit = hintsState.limit;
    const hintsPenalty = hintsState.penalty;
    const pointsCounter = pointsState.current;
    const hintsUsedCounter = hintsState.current;

    console.log("selectIsCanUseHint", hintsLimit, hintsUsedCounter);
    if (hintsLimit === null) return true;
    if (pointsCounter < hintsPenalty) return false;
    return hintsUsedCounter < hintsLimit;
  },
);

export const selectHintsLimit = createSelector(
  [(state) => selectHintsState(state)],
  (hintsState) => hintsState.limit,
);

export const selectRemainingHints = createSelector(
  [(state) => selectHintsState(state)],
  (hintsState) => {
    return hintsState.limit === null
      ? null
      : hintsState.limit - hintsState.current;
  },
);

export const selectHintsPenalty = createSelector(
  [(state) => selectHintsState(state)],
  (hintsState) => hintsState.penalty,
);
