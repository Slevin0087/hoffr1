import { createListenerMiddleware } from "@reduxjs/toolkit";
import { updatePoints } from "../game/slice";
import { selectlifetimePoints } from "../game/selectors/points";
import { getUnlockedsAppearancesIds } from "../../../utils/appearancesUtils";
import { selectApperancesAllLockedsIds } from "./selectors";
import { addAppearanceIdToUnlockedsIds } from "./slice";

export const apperancesListeners = createListenerMiddleware();

apperancesListeners.startListening({
  actionCreator: updatePoints,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const apperancesAllLockedsIds = selectApperancesAllLockedsIds(state);
    const lifetimePoints = selectlifetimePoints(state);
    const newApperancesUnlockeds = getUnlockedsAppearancesIds(
      apperancesAllLockedsIds,
      lifetimePoints,
    );
    if (newApperancesUnlockeds.length === 0) return;
    for (const { id, type } of newApperancesUnlockeds) {
      dispatch(addAppearanceIdToUnlockedsIds({ id, type }));
    }
  },
});
