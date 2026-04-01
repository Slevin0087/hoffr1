import { joinPath } from "../utils/helpers";

export const UNDO_SLICE_NAME = "undo";

export const UNDO_STORAGE_KEYS = {
  UNDO: UNDO_SLICE_NAME,
};

export const UNDO_DEFAULT_STATE = {
  canUndo: true,
  canRedo: false,
  stack: [],
};

const UNDO_THUNKS_TYPES = {
  USE: "use",
};

export const UNDO_THUNKS = {
  USE: joinPath([UNDO_SLICE_NAME, UNDO_THUNKS_TYPES.USE]),
};
