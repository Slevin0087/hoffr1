import { joinPath } from "../utils/helpers";

export const UNDO_SLICE_NAME = "undo";

export const UNDO_STORAGE_KEYS = {
  UNDO: UNDO_SLICE_NAME,
};

export const UNDO_DEFAULT_STATE = {
  canUndo: false,
  stack: [],
  usedCounter: 0,
};

const UNDO_THUNKS_TYPES = {
  USE: "use",
  UNDO_CLICK_CARD: "undoClickCard",
  UNDO_MOVE_STOCK_WASTE: "undoMoveStockWaste",
};

export const UNDO_THUNKS = {
  USE: joinPath([UNDO_SLICE_NAME, UNDO_THUNKS_TYPES.USE]),
  UNDO_CLICK_CARD: joinPath([
    UNDO_SLICE_NAME,
    UNDO_THUNKS_TYPES.UNDO_CLICK_CARD,
  ]),
  UNDO_MOVE_STOCK_WASTE: joinPath([
    UNDO_SLICE_NAME,
    UNDO_THUNKS_TYPES.UNDO_MOVE_STOCK_WASTE,
  ]),
};
