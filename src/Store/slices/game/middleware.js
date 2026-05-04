import {
  addComboBonusTime,
  addUndo,
  endedGame,
  incrementMoves,
  incrementRedeals,
  resetCombo,
  setGameStatus,
  setIsEventsInDeck,
  setIsFirstCardsEvent,
  setIsGameStarted,
  setIsTimeStarted,
  updateTime,
} from "./slice";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  handleCardClick,
  handleCollectCards,
  handleStockClick,
  handleGameInit,
  moveStockWaste,
  standartMove,
  moveToFoundations,
  handleShuffle,
  handleDrop,
} from "./thunks";
import {
  GAME_STATUSES,
  GAME_STORAGE_KEYS,
  moveEventsTypes,
} from "../../../Configs/GameConfigs";
import { GAME_MODES_IDS } from "../../../Configs/GameModes";
import {
  COMBO_WINDOW,
  COMBO_BONUS_TIMES,
  COMBO_MAX_COUNT,
} from "../../../Configs/ComboConfigs";
import { notifications_ids } from "../../../Configs/NotificationsConfigs";
import {
  // selectIsFirstCardsEvent,
  selectIsGameStarted,
  selectIsTimeStarted,
} from "./selectors";
import { field_components_type_ids } from "../../../Configs/FieldComponentsConfigs";
import {
  selectIsFoundationsCompleted,
  selectPileCardsIds,
  selectStockId,
  selectTableausShirtCardsIds,
  selectWasteId,
} from "../decks/selectors";
import { removeTabsShirtCardIdOne } from "../decks/slice";
import {
  setIsCollectCardsBtnVisible,
  setActiveNotification,
} from "../ui/slice";
import { handleHints } from "./thunks/hints";
import { selectIsCanUpTime } from "./selectors/time";

let intervalId = null;
let comboTimeoutId = null;
let startTimeForCombo = 0;
let fastMovesCountForCombo = 0;

export const gameListeners = createListenerMiddleware();

gameListeners.startListening({
  matcher: isAnyOf(
    handleCardClick.fulfilled,
    handleStockClick.fulfilled,
    handleShuffle.fulfilled,
    handleDrop.fulfilled,
    handleHints.fulfilled,
  ),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const isGameStarted = selectIsGameStarted(state);
    if (!isGameStarted) dispatch(setIsGameStarted(true));
    dispatch(setIsFirstCardsEvent(true));
    dispatch(setIsTimeStarted(true));
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      const state = listenerApi.getState();
      const isTimeStarted = selectIsTimeStarted(state);
      if (isTimeStarted) {
        const isCanUpTime = selectIsCanUpTime(state);
        if (!isCanUpTime) {
          clearInterval(intervalId);
          dispatch(setIsTimeStarted(false));
          dispatch(endedGame({ status: GAME_STATUSES.GAME_OVER }));
          return;
        }
        dispatch(updateTime());
      }
    }, 1000);

    dispatch(setGameStatus(GAME_STATUSES.PLAYING));
  },
});

gameListeners.startListening({
  actionCreator: moveStockWaste.fulfilled,
  effect: (action, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    const { type, fromPileId, toPileId, cardsIds } = action.meta.arg;
    const payload = {
      type,
      data: { fromPileId, toPileId, cardsIds },
    };
    dispatch(addUndo(payload));
    if (type === moveEventsTypes.stockToWaste) {
      const state = listenerApi.getState();
      const stockId = selectStockId(state);
      const stockCards = selectPileCardsIds(state, stockId);
      if (stockCards.length === 0) dispatch(incrementRedeals());
    }
  },
});

gameListeners.startListening({
  matcher: isAnyOf(
    moveStockWaste.fulfilled,
    standartMove.fulfilled,
    handleShuffle.fulfilled,
  ),
  effect: (_, listenerApi) => listenerApi.dispatch(incrementMoves()),
});

// ===== COMBO LOGIC =====
// combo считаются только пользовательские ходы: handleCardClick и handleDrop
gameListeners.startListening({
  actionCreator: standartMove.fulfilled,
  effect: async (action, listenerApi) => {
    console.log("gameListeners action.payload: ", action.payload.data);
    const { moveData, isDropping, isUserMove } = action.payload.data;
    if (!moveData.isMoves || (!isUserMove && !isDropping)) return;
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const { currentModeId } = state.game;
    if (currentModeId !== GAME_MODES_IDS.TIMED) return;

    const currentTime = Date.now();
    console.log("gameListeners: ", currentTime, startTimeForCombo);
    if (startTimeForCombo === 0) {
      startTimeForCombo = currentTime;
      return;
    }

    const timeSinceLastMove = currentTime - startTimeForCombo;
    if (timeSinceLastMove < COMBO_WINDOW) {
      fastMovesCountForCombo += 1;
      startTimeForCombo = currentTime;

      // Сразу устанавливаем уведомление combo_increment с актуальным значением
      dispatch(
        setActiveNotification({
          id: notifications_ids.combo_increment,
          params: { value: fastMovesCountForCombo },
        }),
      );

      // Сбросить предыдущий таймер сброса комбо
      if (comboTimeoutId) clearTimeout(comboTimeoutId);
      // Через COMBO_WINDOW сбросить комбо, если не было нового хода
      comboTimeoutId = setTimeout(() => {
        const bonusSec = COMBO_BONUS_TIMES[fastMovesCountForCombo] || 0;
        dispatch(
          setActiveNotification({
            id: notifications_ids.combo_bonus_time,
            params: { seconds: bonusSec },
          }),
        );
        dispatch(addComboBonusTime({ seconds: bonusSec }));
        comboTimeoutId = null;
        startTimeForCombo = 0;
        fastMovesCountForCombo = 0;
      }, COMBO_WINDOW);
    } else {
      if (fastMovesCountForCombo > 0) {
        const bonusSec = COMBO_BONUS_TIMES[fastMovesCountForCombo] || 0;
        dispatch(addComboBonusTime({ seconds: bonusSec }));
        dispatch(
          setActiveNotification({
            id: notifications_ids.combo_bonus_time,
            params: { seconds: bonusSec },
          }),
        );
        fastMovesCountForCombo = 0;
      }
      startTimeForCombo = currentTime;
    }
  },
});

// handleCollectCards сбрасывает combo (не считая его за пользовательский ход)
gameListeners.startListening({
  actionCreator: handleCollectCards.fulfilled,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    const state = listenerApi.getState();

    if (comboTimeoutId) {
      clearTimeout(comboTimeoutId);
      comboTimeoutId = null;
    }

    const prevComboCount = state.game?.combo?.current || 0;
    const bonusSeconds = COMBO_BONUS_TIMES[prevComboCount] || 0;
    if (prevComboCount > 0) {
      dispatch(
        setActiveNotification({
          id: notifications_ids.combo_bonus_time,
          params: { seconds: bonusSeconds },
        }),
      );
    }
    dispatch(resetCombo());
  },
});

// Сброс комбо при перезапуске/инициализации игры
gameListeners.startListening({
  actionCreator: handleGameInit.pending,
  effect: async (action, listenerApi) => {
    if (comboTimeoutId) {
      clearTimeout(comboTimeoutId);
      comboTimeoutId = null;
    }
    listenerApi.dispatch(resetCombo());
  },
});

gameListeners.startListening({
  actionCreator: standartMove.fulfilled,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    const { toPileId } = action.meta.arg;
    dispatch(addUndo(action.payload));
    const foundationsIds = field_components_type_ids.foundations;
    const isPileFromFoundation = foundationsIds.includes(toPileId);
    if (isPileFromFoundation) {
      const state = listenerApi.getState();
      const isFoundationsCompleted = selectIsFoundationsCompleted(state);
      if (isFoundationsCompleted) {
        console.log("WIIIIIIIIIIIIIIIIIIN: FoundationsCompleted");
        dispatch(endedGame({ status: GAME_STATUSES.WON }));
        return;
      } else {
        const tableausIds = field_components_type_ids.tableaus;
        for (const tableauId of tableausIds) {
          await dispatch(moveToFoundations({ fromPileId: tableauId }));
        }
        const wasteId = selectWasteId(listenerApi.getState());
        await dispatch(moveToFoundations({ fromPileId: wasteId }));
      }
    }
  },
});

gameListeners.startListening({
  actionCreator: removeTabsShirtCardIdOne,
  effect: (_, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const tableausShirtCardsIds = selectTableausShirtCardsIds(state);
    if (tableausShirtCardsIds.length === 0) {
      dispatch(setIsCollectCardsBtnVisible(true));
    }
  },
});

gameListeners.startListening({
  matcher: isAnyOf(
    handleGameInit.pending,
    handleCardClick.pending,
    handleStockClick.pending,
    handleCollectCards.pending,
    handleShuffle.pending,
    handleDrop.pending,
  ),
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(setIsEventsInDeck(true));
  },
});

gameListeners.startListening({
  matcher: isAnyOf(
    handleGameInit.fulfilled,
    handleCardClick.fulfilled,
    handleStockClick.fulfilled,
    handleCollectCards.fulfilled,
    handleShuffle.fulfilled,
    handleDrop.fulfilled,
    handleGameInit.rejected,
    handleCardClick.rejected,
    handleStockClick.rejected,
    handleCollectCards.rejected,
    handleShuffle.rejected,
    handleDrop.rejected,
  ),
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});
