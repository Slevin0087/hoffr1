export const addUndoUtil = (state, action, type) => {
  const undoData = {
    type,
    payload: action.payload,
  };
  const undoId = `undo-${state.stack.length}`;
  state.stack.push({ ...undoData, id: undoId });
};
