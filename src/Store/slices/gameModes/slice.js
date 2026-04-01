import {
  GAME_MODES_DEFAULT_STATE,
  GAME_MODES_SLICE_NAME,
  GAME_MODES_STORAGE_KEYS,
} from "../../../Configs/GameModes.js";
import { createSlice } from "@reduxjs/toolkit";
import storage from "../../../utils/Storage.js";
import { reducers } from "./reducers.js";

const initialState =
  storage.getItem(GAME_MODES_STORAGE_KEYS.GAME_MODES) ||
  GAME_MODES_DEFAULT_STATE;

const gameModesSlice = createSlice({
  name: GAME_MODES_SLICE_NAME,
  initialState,
  reducers,
});

export const { setGameModeActiveId } = gameModesSlice.actions;

export default gameModesSlice.reducer;
