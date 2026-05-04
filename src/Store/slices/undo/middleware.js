import storage from "../../../utils/Storage";
import { undoMoveStockWaste, handleUndo } from "../game/thunks/undo";
import { addUndo } from "./slice";
import { setIsEventsInDeck } from "../game/slice";
import { UNDO_STORAGE_KEYS } from "../../../Configs/UndoConfigs";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { moveStockWaste, standartMove } from "../game/thunks";
import { moveEventsTypes } from "../../../Configs/GameConfigs";
import { decrementRedeals } from "../decks/slice";
import { resetCombo } from "../game/slice";
import {
  selectPileCardsIds,
  selectStockRedeals,
  selectWasteId,
} from "../decks/selectors";
import { notifications_ids } from "../../../Configs/NotificationsConfigs";
import { setActiveNotification } from "../ui/slice";

export const undoListeners = createListenerMiddleware();

undoListeners.startListening({
  actionCreator: handleUndo.pending,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setIsEventsInDeck(true));
  },
});

undoListeners.startListening({
  actionCreator: handleUndo.fulfilled,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    listenerApi.dispatch(setIsEventsInDeck(false));
    // Сбрасываем комбо при undo, показываем сколько секунд было добавлено
    if (state.game.combo.count > 0 && state.game.combo.bonusSeconds > 0) {
      listenerApi.dispatch(
        setActiveNotification({
          id: notifications_ids.combo_bonus_time,
          params: { seconds: state.game.combo.bonusSeconds },
        })
      );
    }
    listenerApi.dispatch(resetCombo());
    storage.setItem(UNDO_STORAGE_KEYS.UNDO, state.undo);
  },
});

undoListeners.startListening({
  actionCreator: moveStockWaste.fulfilled,
  effect: async (action, listenerApi) => {
    const args = action.meta.arg;
    const payload = {
      type: args.type,
      data: {
        fromPileId: args.fromPileId,
        toPileId: args.toPileId,
        cardsIds: args.cardsIds,
      },
    };
    console.log("undoListeners.moveStockWaste.fulfilled: ", args, action);
    listenerApi.dispatch(addUndo(payload));
  },
});

undoListeners.startListening({
  actionCreator: standartMove.fulfilled,
  effect: async (action, listenerApi) => {
    const payload = action.payload;
    console.log("undoListeners.standartMove.fulfilled: ", action);
    listenerApi.dispatch(addUndo(payload));
  },
});

undoListeners.startListening({
  actionCreator: undoMoveStockWaste.fulfilled,
  effect: async (action, listenerApi) => {
    const { type } = action.meta.arg;
    if (type === moveEventsTypes.stockToWaste) {
      const state = listenerApi.getState();
      const wasteId = selectWasteId(state);
      const wasteCards = selectPileCardsIds(state, wasteId);
      if (wasteCards.length === 0) {
        if (selectStockRedeals(state) === 0) return;
        listenerApi.dispatch(decrementRedeals());
      }
    }
    // Сбрасываем комбо при undo отката stock->waste
    const state = listenerApi.getState();
    if (state.game.combo.count > 0 && state.game.combo.bonusSeconds > 0) {
      listenerApi.dispatch(
        setActiveNotification({
          id: notifications_ids.combo_bonus_time,
          params: { seconds: state.game.combo.bonusSeconds },
        })
      );
    }
    listenerApi.dispatch(resetCombo());
  },
});
