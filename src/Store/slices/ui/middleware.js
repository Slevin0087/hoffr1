import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { setGameStatus, updatePoints } from "../game/slice";
import {
  clearCurrentNotification,
  removeUpPointsByCardId,
  setActiveNotification,
  setIsCollectCardsBtnVisible,
  setIsNeedByRedealsShowing,
  showPFModalById,
} from "./slice";
import { getAnimationFlipDuration } from "../../../utils/playingCardUtils";
import { animationsTypes } from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { dealingCounts, GAME_STATUSES } from "../../../Configs/GameConfigs";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import {
  selectIsCollectCardsBtnVisible,
  selectIsNeedByRedealsShowing,
} from "./selectors";
import { handleShuffle, moveStockWaste, standartMove } from "../game/thunks";
import { notifications_ids } from "../../../Configs/NotificationsConfigs";
import {
  addTabsShirtCardIdOne,
  removeTabsShirtCardIdOne,
} from "../decks/slice";
import {
  selectHasWasteMoreOneCardId,
  selectIsPileEmpty,
  selectStockId,
  selectIsTableausShirtCardsEmpty,
  selectWasteId,
} from "../decks/selectors";
import {
  selectGameCurrentDealing,
  selectIsCanRedeals,
  selectIsCollectingCards,
} from "../game/selectors";
import { addAppearanceIdToUnlockedsIds } from "../appearances/slice";

export const uiListeners = createListenerMiddleware();

const updatePointsTimers = new Map();

uiListeners.startListening({
  actionCreator: setGameStatus,
  effect: (action, listenerApi) => {
    const status = action.payload;
    const dispatch = listenerApi.dispatch;

    if (status === GAME_STATUSES.PLAYING) {
      const dispatch = listenerApi.dispatch;
      dispatch(clearCurrentNotification());
      return;
    }

    if (status === GAME_STATUSES.INIT) {
      const payload = { id: notifications_ids.game_initing, params: {} };
      dispatch(setActiveNotification(payload));
      return;
    }

    if (status === GAME_STATUSES.PAUSED) {
      const payload = { id: notifications_ids.paused, params: {} };
      dispatch(setActiveNotification(payload));
      return;
    }

    if (status === GAME_STATUSES.READY) {
      const payload = { id: notifications_ids.game_is_ready, params: {} };
      dispatch(setActiveNotification(payload));
      return;
    }
  },
});

uiListeners.startListening({
  matcher: isAnyOf(moveStockWaste.fulfilled, standartMove.fulfilled),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;

    const stockId = selectStockId(state);
    const isStockEmpty = selectIsPileEmpty(state, stockId);
    const isCanRedeals = selectIsCanRedeals(state);
    const hasWasteMoreOneCardId = selectHasWasteMoreOneCardId(state);
    
    if (selectIsCollectingCards(state)) return;

    if (standartMove.fulfilled.match(action)) {
      const fromPileId = action.payload.data.fromPileId;
      if (fromPileId !== selectWasteId(state)) return;
    }

    if (isStockEmpty && !hasWasteMoreOneCardId) {
      if (selectIsNeedByRedealsShowing(state)) {
        dispatch(setIsNeedByRedealsShowing(false));
      }
      return;
    }

    const shouldShow = isStockEmpty && !isCanRedeals && hasWasteMoreOneCardId;
    const isNeedByRedealsShowing = selectIsNeedByRedealsShowing(state);

    if (shouldShow !== isNeedByRedealsShowing) {
      dispatch(setIsNeedByRedealsShowing(shouldShow));
    }
  },
});

uiListeners.startListening({
  matcher: isAnyOf(moveStockWaste.fulfilled, standartMove.fulfilled),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const gameCurrentDealing = selectGameCurrentDealing(state);
    const isDealingThree = gameCurrentDealing === dealingCounts.three;

    if (!isDealingThree) return;

    const stockId = selectStockId(state);
    const isStockEmpty = selectIsPileEmpty(state, stockId);
    const noShirtCards = selectIsTableausShirtCardsEmpty(state);
    const isCollectCardsBtnVisible = selectIsCollectCardsBtnVisible(state);
    const hasWasteMoreOneCardId = selectHasWasteMoreOneCardId(state);

    const shouldShow1 = isStockEmpty && !hasWasteMoreOneCardId;
    const shouldShow2 = isDealingThree && noShirtCards;
    const shouldShow = shouldShow1 && shouldShow2;
    if (shouldShow !== isCollectCardsBtnVisible) {
      dispatch(setIsCollectCardsBtnVisible(shouldShow));
    }
  },
});

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
  actionCreator: addTabsShirtCardIdOne,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;

    if (!selectIsCollectCardsBtnVisible(state)) return;

    dispatch(setIsCollectCardsBtnVisible(false));
  },
});

uiListeners.startListening({
  actionCreator: removeTabsShirtCardIdOne,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;

    if (!selectIsTableausShirtCardsEmpty(state)) return;

    const gameCurrentDealing = selectGameCurrentDealing(state);
    const isDealingOne = gameCurrentDealing === dealingCounts.one;
    const isCollectCardsBtnVisible = selectIsCollectCardsBtnVisible(state);

    if (isDealingOne && !isCollectCardsBtnVisible) {
      dispatch(setIsCollectCardsBtnVisible(true));
    }
  },
});

uiListeners.startListening({
  actionCreator: setGameStatus,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const isWinStatus = action.payload === GAME_STATUSES.WON;
    const isGameOverStatus = action.payload === GAME_STATUSES.GAME_OVER;

    if (isWinStatus || isGameOverStatus) {
      if (selectIsNeedByRedealsShowing(state)) {
        dispatch(setIsNeedByRedealsShowing(false));
      }

      if (selectIsCollectCardsBtnVisible(state)) {
        dispatch(setIsCollectCardsBtnVisible(false));
      }
      dispatch(showPFModalById({ id: P_F_MODALS_IDS.GAME_OVER_AND_WIN }));
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

uiListeners.startListening({
  actionCreator: addAppearanceIdToUnlockedsIds,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    const payload = { id: notifications_ids.new_appearance, params: {} };
    dispatch(setActiveNotification(payload));
  },
});
