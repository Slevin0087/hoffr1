import {
  addComboBonusTime,
  addUndo,
  endedGame,
  incrementHintsUsed,
  incrementMoves,
  incrementRedeals,
  setGameStatus,
  setIsEventsInDeck,
  updatePoints,
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
  moveEventsTypes,
  scoreOperations,
} from "../../../Configs/GameConfigs";
import { GAME_MODES_IDS } from "../../../Configs/GameModes";
import {
  COMBO_WINDOW,
  COMBO_BONUS_TIMES,
  COMBO_MAX_COUNT,
} from "../../../Configs/ComboConfigs";
import { notifications_ids } from "../../../Configs/NotificationsConfigs";
import {
  selectGameCurrentModeId,
  selectGameStatus,
  selectIsCollectingCards,
} from "./selectors";
import { field_components_type_ids } from "../../../Configs/FieldComponentsConfigs";
import {
  selectIsFoundationsCompleted,
  selectIsPileEmpty,
  selectStockId,
  selectWasteId,
} from "../decks/selectors";
import { setActiveNotification, showPFModalById } from "../ui/slice";
import { handleHints } from "./thunks/hints";
import { selectIsCanUpTime } from "./selectors/time";
import { selectSettingsByType } from "../settings/selectors";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import { getAchPropertyById } from "../../../utils/achievementsUtils";
import { addAchInUnlocked } from "../achievements/slice";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import { AudioName, playSound } from "../../../Services/soundService";

let intervalId = null;
let comboTimeoutId = null;
let startTimeForCombo = 0;
let fastMovesCountForCombo = 0;

let tickCounter = 0;
const SAVE_INTERVAL_TICKS = 10;

export const gameListeners = createListenerMiddleware();

gameListeners.startListening({
  matcher: isAnyOf(
    handleCardClick.fulfilled,
    handleStockClick.fulfilled,
    handleShuffle.fulfilled,
    handleDrop.fulfilled,
    handleHints.fulfilled,
  ),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;

    if (handleHints.fulfilled.match(action)) {
      dispatch(incrementHintsUsed());
      if (action.payload?.noHintAvailable) return;
    }
    if (selectGameStatus(state) === GAME_STATUSES.PLAYING) return;
    dispatch(setGameStatus(GAME_STATUSES.PLAYING));
  },
});

gameListeners.startListening({
  actionCreator: moveStockWaste.fulfilled,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const { type, fromPileId, toPileId, cardsIds } = action.meta.arg;
    const payload = {
      type,
      data: { fromPileId, toPileId, cardsIds },
    };
    dispatch(addUndo(payload));
    if (selectIsCollectingCards(state)) {
      return;
    }
    if (type === moveEventsTypes.stockToWaste) {
      if (selectIsPileEmpty(state, selectStockId(state))) {
        dispatch(incrementRedeals());
      }
    }
  },
});

gameListeners.startListening({
  matcher: isAnyOf(
    moveStockWaste.fulfilled,
    standartMove.fulfilled,
    handleShuffle.fulfilled,
  ),
  effect: (_, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    dispatch(incrementMoves());
  },
});

gameListeners.startListening({
  actionCreator: endedGame,
  effect: (action, listenerApi) => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    listenerApi.dispatch(setGameStatus(action.payload.status));
  },
});

gameListeners.startListening({
  actionCreator: setGameStatus,
  effect: (action, listenerApi) => {
    if (action.payload !== GAME_STATUSES.PLAYING) {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      return;
    }

    const dispatch = listenerApi.dispatch;
    tickCounter = 0;

    if (!intervalId) {
      intervalId = setInterval(() => {
        const state = listenerApi.getState();
        const isCanUpTime = selectIsCanUpTime(state);

        if (!isCanUpTime) {
          clearInterval(intervalId);
          const isSoundsEnabled = selectSettingsByType(
            state,
            gameSettingsTypes.soundsEffects,
          ).value;
          playSound(AudioName.GAME_OVER, isSoundsEnabled);
          dispatch(endedGame({ status: GAME_STATUSES.GAME_OVER }));
          return;
        }

        dispatch(updateTime());

        tickCounter++;

        if (tickCounter >= SAVE_INTERVAL_TICKS) {
          tickCounter = 0;
        }
      }, 1000);
    }
  },
});

// ===== COMBO LOGIC =====
// combo считаются только пользовательские ходы: handleCardClick и handleDrop
gameListeners.startListening({
  actionCreator: standartMove.fulfilled,
  effect: async (action, listenerApi) => {
    const { moveData, isDropping, isUserMove } = action.payload.data;

    if (!moveData.isMoves || (!isUserMove && !isDropping)) return;

    const state = listenerApi.getState();
    const dispatch = listenerApi.dispatch;
    const currentModeId = selectGameCurrentModeId(state);

    if (currentModeId !== GAME_MODES_IDS.TIMED) return;

    const currentTime = Date.now();

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
        ); // РАССКОМЕНТИТЬ
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
        ); // РАССКОМЕНТИТЬ
        fastMovesCountForCombo = 0;
      }
      startTimeForCombo = currentTime;
    }
  },
});

// Сброс комбо при перезапуске/инициализации игры
gameListeners.startListening({
  matcher: isAnyOf(handleGameInit.pending, handleCollectCards.pending),
  effect: async () => {
    if (comboTimeoutId) {
      clearTimeout(comboTimeoutId);
      comboTimeoutId = null;
    }
  },
});

gameListeners.startListening({
  matcher: isAnyOf(showPFModalById, handleGameInit.pending),
  effect: async () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
});

gameListeners.startListening({
  actionCreator: standartMove.fulfilled,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    dispatch(addUndo(action.payload));
    const toPileId = action.payload.data.toPileId;
    const foundationsIds = field_components_type_ids.foundations;
    const isToPileFoundation = foundationsIds.includes(toPileId);
    if (isToPileFoundation) {
      const state = listenerApi.getState();
      const isFoundationsCompleted = selectIsFoundationsCompleted(state);
      if (isFoundationsCompleted) {
        const isSoundsEnabled = selectSettingsByType(
          state,
          gameSettingsTypes.soundsEffects,
        ).value;
        playSound(AudioName.WIN, isSoundsEnabled);
        dispatch(endedGame({ status: GAME_STATUSES.WON }));
        return;
      } else {
        const type = gameSettingsTypes.fastGame;
        const isFastGameEnabled = selectSettingsByType(
          listenerApi.getState(),
          type,
        );
        if (!isFastGameEnabled.value) return;
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

gameListeners.startListening({
  actionCreator: addAchInUnlocked,
  effect: async (action, listenerApi) => {
    const { id } = action.payload;
    const dispatch = listenerApi.dispatch;
    const reward = getAchPropertyById(id, "reward");
    const operation = scoreOperations.increment;
    if (reward) dispatch(updatePoints({ count: reward, operation }));
  },
});
