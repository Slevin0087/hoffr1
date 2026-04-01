import storage from "../../../utils/Storage";
import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers.js";
import {
  ACHIEVEMENTS_DEFAULT_STATE,
  ACHIEVEMENTS_SLICE_NAME,
  ACHIEVEMENTS_STORAGE_KEYS,
} from "../../../Configs/AchievementsConfigs.js";
const initialState =
  storage.getItem(ACHIEVEMENTS_STORAGE_KEYS.ACHIEVEMENTS) ||
  ACHIEVEMENTS_DEFAULT_STATE;

const achievementsSlice = createSlice({
  name: ACHIEVEMENTS_SLICE_NAME,
  initialState,
  reducers,
});

export const { setActiveAchievement } = achievementsSlice.actions;

export default achievementsSlice.reducer;
