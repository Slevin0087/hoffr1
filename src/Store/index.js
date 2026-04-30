import { configureStore } from "@reduxjs/toolkit";
import ipnReducer from "./slices/pages/ipnStore.js";
import uiReducer from "./slices/ui/slice.js";
import animationsReducer from "./slices/animations/slice.js";
import decksReducer from "./slices/decks/slice.js";
import facesReducer from "./slices/playingCards/faces.js";
import backesReducer from "./slices/playingCards/backes.js";
import fonsReducer from "./slices/pages/playingField/fons.js";
import gameReducer from "./slices/game/slice.js";
import achieventsReducer from "./slices/achievements/slice.js";
import shopReducer from "./slices/pages/shop/slice.js";
import appearancesReducer from "./slices/appearances/slice.js";
import settingsReducer from "./slices/settings/slice.js";
import { settingsListeners } from "./slices/settings/middleware.js";
import { gameListeners } from "./slices/game/middleware.js";
import { uiListeners } from "./slices/ui/middleware.js";
import { achsListeners } from "./slices/achievements/middleware.js";
// import { undoListeners } from "./slices/undo/middleware.js";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    game: gameReducer,
    inputPlayerName: ipnReducer,
    ui: uiReducer,
    animations: animationsReducer,
    decks: decksReducer,
    faces: facesReducer,
    backes: backesReducer,
    fons: fonsReducer,
    achievements: achieventsReducer,
    shop: shopReducer,
    appearances: appearancesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(
      uiListeners.middleware,
      settingsListeners.middleware,
      // undoListeners.middleware,
      gameListeners.middleware,
      // gameModesListeners.middleware,
      achsListeners.middleware,
    );
  },
});
