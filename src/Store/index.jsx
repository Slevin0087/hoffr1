import { configureStore } from "@reduxjs/toolkit";
import ipnReduser from "./ipnStore.jsx";

export const store = configureStore({
  reducer: {
    inputPlayerName: ipnReduser,
  },
});
