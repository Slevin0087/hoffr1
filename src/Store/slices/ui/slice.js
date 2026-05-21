import { createSlice } from "@reduxjs/toolkit";
import {
  UI_DEFAULTS_STATE,
  UI_SLICE_NAME,
} from "../../../Configs/UIConfigs.js";
import { reducers } from "./reducers.js";
import { extraReducers } from "./extraReducers.js";

const initialState = UI_DEFAULTS_STATE;

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
  clearCurrentNotification,
  updateActiveNotification,
  setActiveNotification,
  setIsNeedByRedealsShowing,
} = uiSlice.actions;

export default uiSlice.reducer;
