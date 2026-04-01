import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "../../../Configs/LocalStorageKeys.js";
import storage from "../../../utils/Storage.js";

const defaultPlayerName = storage.getItem(LOCAL_STORAGE_KEYS.PLAYER_NAME) || "";
const defaultInputedPlayerName =
  storage.getItem(LOCAL_STORAGE_KEYS.INPUTED_PLAYER_NAME) || false;

const initialState = {
  playerName: defaultPlayerName,
  inputedPlayerName: defaultInputedPlayerName,
};

const ipnSlice = createSlice({
  name: "input-player-name",
  initialState,
  reducers: {
    setPlayerName: (state, action) => {
      state.inputedPlayerName = true;
      state.playerName = action.payload;
      storage.setItem(LOCAL_STORAGE_KEYS.INPUTED_PLAYER_NAME, true);
      storage.setItem(LOCAL_STORAGE_KEYS.PLAYER_NAME, action.payload);
    },
    skipPlayerName: (state) => {
      state.inputedPlayerName = false;
      storage.setItem(LOCAL_STORAGE_KEYS.INPUTED_PLAYER_NAME, false);
    },
  },
});

export const { setPlayerName, skipPlayerName } = ipnSlice.actions;

export default ipnSlice.reducer;
