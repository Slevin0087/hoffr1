import { LOCAL_STORAGE_KEYS } from "../../../Configs/LocalStorageKeys.js";
import { createSlice } from "@reduxjs/toolkit";
import storage from "../../../utils/Storage.js";

const defaultShowed =
  storage.getItem(LOCAL_STORAGE_KEYS.GREETINGS_SHOWED) || false;

const initialState = {
  showed: defaultShowed,
};

const greetingsSlice = createSlice({
  name: "greetings",
  initialState,
  reducers: {
    setShowed: (state) => {
      state.showed = true;
      storage.setItem(LOCAL_STORAGE_KEYS.GREETINGS_SHOWED, true);
    },
  },
});

export const { setShowed } = greetingsSlice.actions;

export default greetingsSlice.reducer;
