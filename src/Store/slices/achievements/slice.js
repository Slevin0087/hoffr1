import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers.js";
import {
  ACHIEVEMENTS_DEFAULT_STATE,
  ACHIEVEMENTS_SLICE_NAME,
} from "../../../Configs/AchievementsConfigs.js";

const initialState = ACHIEVEMENTS_DEFAULT_STATE;

const achievementsSlice = createSlice({
  name: ACHIEVEMENTS_SLICE_NAME,
  initialState,
  reducers,
});

export const { setActiveAchievement, addAchInUnlocked } =
  achievementsSlice.actions;

export default achievementsSlice.reducer;
