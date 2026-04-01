import { createListenerMiddleware } from "@reduxjs/toolkit";
import { clickCard } from "../decks/thunks";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import { selectSettingsByType } from "../settings/selectors";
import { getActiveGameModeScoring } from "../../../utils/gameModes";

const gameModesListeners = createListenerMiddleware();

gameModesListeners.startListening({
  actionCreator: clickCard.fulfilled,
  effect: async (action, listenerApi) => {
    console.log("gameModesListeners.clickCard.fulfilled: ", action);
    const state = listenerApi.getState();
    const gameModeState = selectSettingsByType(
      state,
      gameSettingsTypes.gameMode,
    );
    console.log("gameModeState: ", gameModeState);
    const activeGameModeScoring = getActiveGameModeScoring(gameModeState.value);
    console.log("activeGameModeScoring: ", activeGameModeScoring);
  },
});

export default gameModesListeners;
