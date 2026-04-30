import { createSelector } from "@reduxjs/toolkit";
import { selectActiveDealing, selectGame } from "../selectors";

export const selectlifetimeMoves = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.moves,
);

export const selectMovesState = createSelector(
  [(state) => selectActiveDealing(state)],
  (activeDealing) => activeDealing?.moves,
);

export const selectCurrentMoves = createSelector(
  [(state) => selectMovesState(state)],
  (movesState) => movesState?.current || 0,
);
