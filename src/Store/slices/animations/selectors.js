import { createSelector } from "@reduxjs/toolkit";
import { selectReducedMotion } from "../ui/selectors";

export const selectAnimationsOn = (state) => state.animations.on;
export const selectCardsIsAnimation = (state) =>
  state.animations.entities.cards.isAnimating;
export const selectAnimationsEnabled = createSelector(
  [(state) => selectReducedMotion(state), (state) => selectAnimationsOn(state)],
  (reducedMotion, animationsOn) => !reducedMotion && animationsOn,
);
