import storage from "../../../utils/Storage.js";
import { createSlice } from "@reduxjs/toolkit";
import {
  UI_DEFAULTS_STATE,
  UI_SLICE_NAME,
  UI_STORE_KEYS,
} from "../../../Configs/UIConfigs.js";
import { reducers } from "./reducers.js";
import { extraReducers } from "./extraReducers.js";

const initialState = storage.getItem(UI_STORE_KEYS.UI) || UI_DEFAULTS_STATE;

const uiSlice = createSlice({
  name: UI_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

export const {
  setActivePageId,
  setReducedMotion,
  addUpPointsByCardId,
  removeUpPointsByCardId,
  openRestartModal,
  closeRestartModal,
  openGameRulesModal,
  closeGameRulesModal,
  setActivePFModalId,
  resetActivePFModalId,
  showPFModalById,
  hidePFModalById,
  setIsCollectCardsBtnVisible,
  addNotification,
  showNextNotification,
  clearCurrentNotification,
  clearNotificationsQueue,
} = uiSlice.actions;

export default uiSlice.reducer;
