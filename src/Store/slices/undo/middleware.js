import { createListenerMiddleware } from "@reduxjs/toolkit";
import { undoUse } from "./thunks";
import {
  selectAnimationsEnabled,
  selectSettingsByType,
} from "../settings/selectors";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import { delay, getAnimationMoveDuration } from "../../../utils/helpers";
import { animationsTypes } from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { setIsEventsInDeck } from "../decks/slice";

const undoListeners = createListenerMiddleware();

undoListeners.startListening({
  actionCreator: undoUse.pending,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setIsEventsInDeck(true));
  },
});

undoListeners.startListening({
  actionCreator: undoUse.fulfilled,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const isAnimationsEnabled = selectAnimationsEnabled(state);
    const activeGameModeState = selectSettingsByType(
      state,
      gameSettingsTypes.gameMode,
    );
    console.log("activeGameModeState: ", activeGameModeState);
    if (isAnimationsEnabled) {
      await delay(getAnimationMoveDuration(animationsTypes.move) / 2);
    }
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});

export default undoListeners;
