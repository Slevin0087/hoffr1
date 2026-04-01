import { UNDO_STORAGE_KEYS } from "../../../Configs/UndoConfigs";
import storage from "../../../utils/Storage";

export const addUndo = (state, action) => {
  const undoId = `undo-${state.stack.length}`;
  console.log("addUndo: ", action.payload);
  const undo = { ...action.payload, undoId };
  state.stack.push(undo);
  storage.setItem(UNDO_STORAGE_KEYS.UNDO, state);
};

export const clearUndo = (state) => {
  state.stack = [];
  storage.setItem(UNDO_STORAGE_KEYS.UNDO, state);
};

export const removeUndo = (state, action) => {
  const { undoId } = action.payload;
  state.stack = state.stack.filter((undo) => undo.undoId !== undoId);
  storage.setItem(UNDO_STORAGE_KEYS.UNDO, state);
};

export const reducers = {
  addUndo,
  removeUndo,
};
