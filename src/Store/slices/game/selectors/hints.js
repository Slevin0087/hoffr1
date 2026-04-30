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
    const hintsLimit = hintsState.limit;
    const hintsPenalty = hintsState.penalty;
    const pointsCounter = pointsState.current;
    const hintsUsedCounter = hintsState.current;
    
    if (pointsCounter < hintsPenalty) return false;
    console.log('selectIsCanUseHint', hintsLimit, hintsUsedCounter);
    if (hintsLimit === null) return true;
    return hintsUsedCounter < hintsLimit;
  }
  ,
);

export const selectHintsPenalty = createSelector(
  [(state) => selectHintsState(state)],
  (hintsState) => hintsState.penalty,
);