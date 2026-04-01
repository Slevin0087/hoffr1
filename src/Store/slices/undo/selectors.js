export const selectUndoStack = (state) => state.undo.stack;

export const selectUndoStackLength = (state) => state.undo.stack.length;

export const selectCanUndo = (state) => state.undo.canUndo;

export const selectCanRedo = (state) => state.undo.canRedo;

export const selectUndo = (state) => state.undo.stack[state.undo.stack.length - 1];
