import { createSlice } from "@reduxjs/toolkit";
import {
  UNDO_DEFAULT_STATE,
  UNDO_SLICE_NAME,
  UNDO_STORAGE_KEYS,
} from "../../../Configs/UndoConfigs";
import storage from "../../../utils/Storage";
import { reducers } from "./reducers";
import { cleaningCurrentDeck } from "../decks/slice";
import { clickCard, clickStock } from "../decks/thunks";
import { addUndoUtil } from "../../../utils/undoSliceUtils";

const initialState =
  storage.getItem(UNDO_STORAGE_KEYS.UNDO) || UNDO_DEFAULT_STATE;

const undoSlice = createSlice({
  name: UNDO_SLICE_NAME,
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(cleaningCurrentDeck, (state) => {
      state.stack = [];
      storage.setItem(UNDO_STORAGE_KEYS.UNDO, state);
    });
    builder.addCase(clickCard.fulfilled, (state, action) => {
      addUndoUtil(state, action, "clickCard");
      storage.setItem(UNDO_STORAGE_KEYS.UNDO, state);
    });
    builder.addCase(clickStock.fulfilled, (state, action) => {
      addUndoUtil(state, action, "clickStock");
      storage.setItem(UNDO_STORAGE_KEYS.UNDO, state);
    });
  },
});

export const { addUndo, removeUndo } = undoSlice.actions;
export default undoSlice.reducer;
