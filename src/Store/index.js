import { configureStore } from "@reduxjs/toolkit";
import ipnReducer from "./slices/pages/ipnStore.js";
import uiReducer from "./slices/ui/slice.js";
import animationsReducer from "./slices/animations/slice.js";
import gameModeReduser from "./slices/gameModes/slice.js";
import greetingsReduser from "./slices/pages/greetings.js";
import decksReducer from "./slices/decks/slice.js";
import facesReducer from "./slices/playingCards/faces.js";
import backesReducer from "./slices/playingCards/backes.js";
import fonsReducer from "./slices/pages/playingField/fons.js";
import gameReducer from "./slices/game/slice.js";
import achieventsReducer from "./slices/achievements/slice.js";
import shopReducer from "./slices/pages/shop/slice.js";
import undoReducer from "./slices/undo/slice.js";
import appearancesReducer from "./slices/appearances/slice.js";
import settingsReducer from "./slices/settings/slice.js";
import {
  storageMiddleware,
  loadState,
} from "./middleware/storageMiddleware.js";
import pilesCoordinatesReducer from "./slices/pages/playingField/piles.js";
import deckListeners from "./slices/decks/middleware.js";
import settingsListeners from "./slices/settings/middleware.js";
// import gameModesListeners from "./slices/gameModes/middleware.js";
import undoListeners from "./slices/undo/middleware.js";
import { gameListeners } from "./slices/game/middleware.js";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    game: gameReducer,
    inputPlayerName: ipnReducer,
    ui: uiReducer,
    animations: animationsReducer,
    gameModes: gameModeReduser,
    greetings: greetingsReduser,
    decks: decksReducer,
    undo: undoReducer,
    pilesCoordinates: pilesCoordinatesReducer,
    faces: facesReducer,
    backes: backesReducer,
    fons: fonsReducer,
    achievements: achieventsReducer,
    shop: shopReducer,
    appearances: appearancesReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(
        deckListeners.middleware,
        settingsListeners.middleware,
        undoListeners.middleware,
        gameListeners.middleware,
        // gameModesListeners.middleware,
      )
      .concat(storageMiddleware);
  },
  preloadedState,
});
