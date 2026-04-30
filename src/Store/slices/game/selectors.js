import { createSelector } from "@reduxjs/toolkit";

export const selectGame = (state) => state.game;

export const selectGamesPlayed = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.played,
);

export const selectGameModes = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.modes,
);

export const selectGameCurrentModeId = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.currentModeId,
);

export const selectGameCurrentMode = createSelector(
  [
    (state) => selectGameModes(state),
    (state) => selectGameCurrentModeId(state),
  ],
  (gameModes, currentModeId) => gameModes[currentModeId],
);

export const selectIsFirstCardsEvent = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.isFirstCardsEvent,
);

export const selectIsEventsInDeck = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.isEventsInDeck,
);

export const selectIsTimeStarted = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.isTimeStarted,
);

export const selectIsGameStarted = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.isStarted,
);

export const selectGameStatus = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.status,
);

export const selectPlayerName = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.playerName,
);

export const selectGameCoins = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.coins,
);

export const selectGameCurrentDealing = createSelector(
  [(state) => selectGameCurrentMode(state)],
  (currentMode) => currentMode.currentDealing,
);

export const selectActiveDealing = createSelector(
  [(state) => selectGameCurrentMode(state)],
  (currentMode) => currentMode?.[currentMode?.currentDealing],
);

export const selectIsCanRedeals = createSelector(
  [(state) => selectActiveDealing(state)],
  (activeDealing) => {
    if (activeDealing.redeals.limit === null) return true;
    return activeDealing.redeals.limit > activeDealing.redeals.current;
  },
);

export const selectGameStatusByType = createSelector(
  [(state) => selectGameStatus(state), (_, statusType) => statusType],
  (gameStatus, statusType) => gameStatus === statusType,
);
