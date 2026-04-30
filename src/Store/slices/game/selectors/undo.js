import { createSelector } from "@reduxjs/toolkit";
import { selectActiveDealing } from "../selectors";
import { selectPointsState } from "./points";

export const selectUndoState = createSelector(
  [(state) => selectActiveDealing(state)],
  (activeDealing) => activeDealing.undo,
);

export const selectIsCanUseUndo = createSelector(
  [(state) => selectUndoState(state), (state) => selectPointsState(state)],
  (undoState, pointsState) => {
    const undoLimit = undoState.limit;
    const undoPenalty = undoState.penalty;
    const pointsCounter = pointsState.current;
    const undoUsedCounter = undoState.current;

    if (pointsCounter < undoPenalty) return false;
    if (undoLimit === null) return true;
    return undoUsedCounter < undoLimit;
  },
);

export const selectUndoStack = createSelector(
  [(state) => selectUndoState(state)],
  (undoState) => undoState.stack,
);

export const selectUndo = createSelector(
  [(state) => selectUndoState(state)],
  (undoState) => undoState.stack[undoState.stack.length - 1],
);

export const selectUndoStackLength = createSelector(
  [(state) => selectUndoStack(state)],
  (undoStack) => undoStack.length,
);
