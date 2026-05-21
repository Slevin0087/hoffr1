export const addUndo = (state, action) => {
  const id = `undo-${state.stack.length}`;
  const { type, data } = action.payload;
  console.log("addUndo: ", action.payload);
  const undo = { id, type, data };
  state.stack.push(undo);
  state.canUndo = state.stack.length > 0;
};

export const clearUndo = (state) => {
  state.stack = [];
};

export const removeUndo = (state, action) => {
  const { id } = action.payload;
  state.stack = state.stack.filter((undo) => undo.id !== id);
  state.canUndo = state.stack.length > 0;
};

export const updateUndoUsedCounter = (state) => {
  state.undoUsedCounter += 1;
};

export const reducers = {
  addUndo,
  removeUndo,
  updateUndoUsedCounter,
};
