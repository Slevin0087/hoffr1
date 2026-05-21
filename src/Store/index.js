import storage from "../utils/Storage.js";
import uiReducer from "./slices/ui/slice.js";
import animationsReducer from "./slices/animations/slice.js";
import decksReducer from "./slices/decks/slice.js";
import gameReducer from "./slices/game/slice.js";
import achieventsReducer from "./slices/achievements/slice.js";
import shopReducer from "./slices/shop/slice.js";
import appearancesReducer from "./slices/appearances/slice.js";
import settingsReducer from "./slices/settings/slice.js";
import { uiListeners } from "./slices/ui/middleware.js";
import { gameListeners } from "./slices/game/middleware.js";
import { achsListeners } from "./slices/achievements/middleware.js";
import { configureStore } from "@reduxjs/toolkit";
import { settingsListeners } from "./slices/settings/middleware.js";
import { apperancesListeners } from "./slices/appearances/middleware.js";

// storage.clear();

const preloadedState = storage.getFullState();

console.log("preloadedState: ", preloadedState);

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    game: gameReducer,
    ui: uiReducer,
    animations: animationsReducer,
    decks: decksReducer,
    achievements: achieventsReducer,
    shop: shopReducer,
    appearances: appearancesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(
      uiListeners.middleware,
      settingsListeners.middleware,
      gameListeners.middleware,
      achsListeners.middleware,
      apperancesListeners.middleware,
    );
  },
  preloadedState,
});

console.log(store);
