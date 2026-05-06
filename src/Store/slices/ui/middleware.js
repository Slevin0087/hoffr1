import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { endedGame, setIsFirstCardsEvent, updatePoints } from "../game/slice";
import {
  clearCurrentNotification,
  removeUpPointsByCardId,
  setActiveNotification,
  setIsCollectCardsBtnVisible,
  showPFModalById,
} from "./slice";
import { getAnimationFlipDuration } from "../../../utils/playingCardUtils";
import { animationsTypes } from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { dealingCounts, GAME_STATUSES } from "../../../Configs/GameConfigs";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import {
  selectActiveNotification,
  selectIsCollectCardsBtnVisible,
} from "./selectors";
import { handleGameInit, handleShuffle, standartMove } from "../game/thunks";
import { notifications_ids } from "../../../Configs/NotificationsConfigs";
import { removeTabsShirtCardIdOne } from "../decks/slice";
import {
  selectStockAndWasteEmpty,
  selectTableausShirtCardsIds,
} from "../decks/selectors";
import { selectGameCurrentDealing } from "../game/selectors";
import { field_components_type_ids } from "../../../Configs/FieldComponentsConfigs";

export const uiListeners = createListenerMiddleware();

const updatePointsTimers = new Map();

uiListeners.startListening({
  actionCreator: updatePoints,
  effect: async (action, listenerApi) => {
    const cardId = action.payload.cardId;
    const dispatch = listenerApi.dispatch;

    if (updatePointsTimers.has(cardId)) {
      clearTimeout(updatePointsTimers.get(cardId));
    }

    const timer = setTimeout(
      () => {
        dispatch(removeUpPointsByCardId({ cardId }));
        updatePointsTimers.delete(cardId);
      },
      getAnimationFlipDuration(animationsTypes.standart) * 2,
    );

    updatePointsTimers.set(cardId, timer);
  },
});

uiListeners.startListening({
  actionCreator: standartMove.fulfilled,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    const isCollectCardsBtnVisible = selectIsCollectCardsBtnVisible(
      listenerApi.getState(),
    );
    if (isCollectCardsBtnVisible) {
      dispatch(setIsCollectCardsBtnVisible(false));
    }
  },
});

uiListeners.startListening({
  matcher: isAnyOf(removeTabsShirtCardIdOne, standartMove.fulfilled),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const tableausShirtCardsIds = selectTableausShirtCardsIds(state);
    if (tableausShirtCardsIds.length === 0) {
      const gameCurrentDealing = selectGameCurrentDealing(state);
      if (gameCurrentDealing === dealingCounts.three) {
        if (standartMove.fulfilled.match(action)) {
          const fromPileId = action.payload.data.fromPileId;
          const isFropmPileWaste =
            field_components_type_ids.wastes.includes(fromPileId);
          if (isFropmPileWaste && !selectStockAndWasteEmpty(state)) return;
        }
        if (!selectStockAndWasteEmpty(state)) return;
      }
      dispatch(setIsCollectCardsBtnVisible(true));
    }
  },
});

uiListeners.startListening({
  actionCreator: endedGame,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const isCollectCardsBtnVisible = selectIsCollectCardsBtnVisible(state);
    if (isCollectCardsBtnVisible) {
      dispatch(setIsCollectCardsBtnVisible(false));
    }
    dispatch(showPFModalById({ id: P_F_MODALS_IDS.GAME_OVER_AND_WIN }));
  },
});

uiListeners.startListening({
  actionCreator: handleGameInit.pending,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    const payload = { id: notifications_ids.game_initing, params: {} };
    dispatch(setActiveNotification(payload));
  },
});

uiListeners.startListening({
  actionCreator: handleGameInit.fulfilled,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    const payload = { id: notifications_ids.game_is_ready, params: {} };
    dispatch(setActiveNotification(payload));
  },
});

uiListeners.startListening({
  actionCreator: setIsFirstCardsEvent,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    // const bestPoints = selectCurrentBestPoints(state);
    const activeNotification = selectActiveNotification(state);

    if (activeNotification?.id === notifications_ids.game_is_ready) {
      // const value = bestPoints === null ? 0 : bestPoints;
      // const payload = { id: notifications_ids.best_points, params: { value } };
      dispatch(clearCurrentNotification());
    }
  },
});

uiListeners.startListening({
  actionCreator: handleShuffle.fulfilled,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    const payload = { id: notifications_ids.cards_shuffled, params: {} };
    dispatch(setActiveNotification(payload));
  },
});
