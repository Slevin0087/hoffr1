import { createSelector } from "@reduxjs/toolkit";
import { selectActiveDealing } from "../selectors";

export const selectShuffleState = createSelector(
  [(state) => selectActiveDealing(state)],
  (activeDealing) => activeDealing.shuffle,
);

export const selectisCanShuffle = createSelector(
  [(state) => selectShuffleState(state)],
  (shuffleState) => {
    if (shuffleState.limit === null) return true;
    return shuffleState.limit > shuffleState.current;
  },
);
