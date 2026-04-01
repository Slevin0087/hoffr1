import { createSelector } from "@reduxjs/toolkit";

export const selectGame = (state) => {
  return state.game.entities[state.game.currentId];
};

export const selectGameStatus = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.status,
);

export const selectGameCoins = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.coins,
);

export const selectGameLifetimeState = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.lifetimeState,
);

export const selectGameSessionState = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.sessionState,
);

export const selectGameSettingsState = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.settingsState,
);

export const selectSessionByType = createSelector(
  [(state) => selectGameSessionState(state), (_, stateType) => stateType],
  (sessionState, stateType) => sessionState?.[stateType],
);

export const selectLifetimeByType = createSelector(
  [(state) => selectGameLifetimeState(state), (_, stateType) => stateType],
  (lifetimeState, stateType) => lifetimeState?.[stateType],
);

export const selectSessionDataByType = createSelector(
  [(state, stateType) => selectSessionByType(state, stateType)],
  (sessionState) => sessionState?.data,
);
