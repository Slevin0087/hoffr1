import { createSelector } from "@reduxjs/toolkit";
import { selectActiveDealing, selectGame } from "../selectors";
import { GAME_STATUSES } from "../../../../Configs/GameConfigs";

export const selectlifetimeTime = createSelector(
  [(state) => selectGame(state)],
  (game) => game?.time,
);

export const selectTimeState = createSelector(
  [(state) => selectActiveDealing(state)],
  (activeDealing) => activeDealing?.time,
);

export const selectCurrentTime = createSelector(
  [(state) => selectTimeState(state)],
  (timeState) => timeState.current,
);

export const selectBestTime = createSelector(
  [(state) => selectTimeState(state)],
  (timeState) => timeState.best,
);

export const selectIsCanUpTime = createSelector(
  [(state) => selectTimeState(state)],
  (timeState) => {
    if (timeState.limit === null) return true;
    return timeState.current > 0;
  },
);
