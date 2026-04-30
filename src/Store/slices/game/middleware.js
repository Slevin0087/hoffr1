import {
  addUndo,
  endedGame,
  incrementMoves,
  incrementRedeals,
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
import {
  selectIsFirstCardsEvent,
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
import { setIsCollectCardsBtnVisible } from "../ui/slice";
import { handleHints } from "./thunks/hints";
import { selectIsCanUpTime } from "./selectors/time";

let intervalId = null;

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
    console.log('gameListeners selectIsFirstCardsEvent(state)', selectIsFirstCardsEvent(state));
    // if (selectIsFirstCardsEvent(state)) return;
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
    console.log("undoListeners.moveStockWaste.fulfilled: ", action);
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
