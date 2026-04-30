import { createListenerMiddleware } from "@reduxjs/toolkit";
import { updatePoints } from "../game/slice";
import { getAchPropertyById } from "../../../utils/achievementsUtils";
import { selectAchLockedIds } from "./selectors";
import { addAchInUnlocked } from "./slice";

export const achsListeners = createListenerMiddleware();

achsListeners.startListening({
  actionCreator: updatePoints,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const lockedAchsIds = selectAchLockedIds(state);
    for (const id of lockedAchsIds) {
      const condition = getAchPropertyById(id, "condition");
      const isCondition = condition(state.game);
      if (isCondition) dispatch(addAchInUnlocked({ id }));
    }
  },
});
