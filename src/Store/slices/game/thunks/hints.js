import { createAsyncThunk } from "@reduxjs/toolkit";
import { HINTS_THUNKS } from "../../../../Configs/HintsConfigs";
import { field_components_type_ids } from "../../../../Configs/FieldComponentsConfigs";
import {
  selectCanMoveTableauToFoundation,
  selectMoveStockCardsToFoundations,
  selectMoveTopCardsTableauToTableau,
  selectMoveWasteTopCard,
  selectPile,
  selectStockId,
  selectWasteId,
} from "../../decks/selectors";
import { endedGame, updatePoints } from "../slice";
import {
  dealingCounts,
  GAME_STATUSES,
  scoreOperations,
} from "../../../../Configs/GameConfigs";
import {
  selectGameCurrentDealing,
  selectIsCanRedeals,
  selectIsEventsInDeck,
} from "../selectors";
import { setIsHintShowPileById, updateCardOne } from "../../decks/slice";
import { selectHintsPenalty, selectIsCanUseHint } from "../selectors/hints";
import { P_F_MODALS_IDS } from "../../../../Configs/UIConfigs";
import { selectIsNeedByRedealsShowing } from "../../ui/selectors";
import { showPFModalById } from "../../ui/slice";
import { selectSettingsByType } from "../../settings/selectors";
import { gameSettingsTypes } from "../../../../Configs/SettingsConfigs";
import { AudioName, playSound } from "../../../../Services/soundService";

export const handleHints = createAsyncThunk(
  HINTS_THUNKS.USE,
  async (args, { dispatch, getState }) => {
    console.log("HANDLE_HINTS");
    const state = getState();
    const stockId = selectStockId(state);
    const wasteId = selectWasteId(state);
    const penaltyCount = selectHintsPenalty(state);
    const tableausIds = field_components_type_ids.tableaus;
    const foundationsIds = field_components_type_ids.foundations;
    const isSoundsEnabled = selectSettingsByType(
      state,
      gameSettingsTypes.soundsEffects,
    ).value;

    // --- ПРИОРИТЕТ 1: Tableau -> Foundation ---
    for (const tableauId of tableausIds) {
      for (const foundationId of foundationsIds) {
        const { isCanMove, data } = selectCanMoveTableauToFoundation(
          state,
          tableauId,
          foundationId,
        );
        if (!isCanMove) continue;
        console.log("handleHints, ПРИОРИТЕТ 1, из tableau в foundation");
        dispatch(
          updateCardOne({
            cardId: data.fromCardId,
            pileId: data.fromPileId,
            changes: { isHintShowing: true },
          }),
        );
        if (data.toPileTopCardId === null) {
          dispatch(
            setIsHintShowPileById({
              pileId: data.toPileId,
              value: true,
            }),
          );
        } else {
          dispatch(
            updateCardOne({
              cardId: data.toPileTopCardId,
              pileId: data.toPileId,
              changes: { isHintShowing: true },
            }),
          );
        }
        if (penaltyCount === null) return;
        const operation = scoreOperations.decrement;
        dispatch(updatePoints({ count: penaltyCount, operation }));
        return;
      }
    }
    // --- ПРИОРИТЕТ 3: Освобождение скрытой карты, нахождение ходов короля и другие(Tableau -> Tableau) ---
    for (const fromTableauId of tableausIds) {
      for (const toTableauId of tableausIds) {
        const { isCanMove, data } = selectMoveTopCardsTableauToTableau(
          state,
          fromTableauId,
          toTableauId,
        );
        if (!isCanMove) continue;
        console.log("handleHints, ПРИОРИТЕТ 3, Tableau -> Tableau");
        for (const fromCardsId of data.fromCardsIds) {
          dispatch(
            updateCardOne({
              cardId: fromCardsId,
              pileId: data.fromPileId,
              changes: { isHintShowing: true },
            }),
          );
        }
        if (data.toPileTopCardId === null) {
          dispatch(
            setIsHintShowPileById({
              pileId: data.toPileId,
              value: true,
            }),
          );
        } else {
          dispatch(
            updateCardOne({
              cardId: data.toPileTopCardId,
              pileId: data.toPileId,
              changes: { isHintShowing: true },
            }),
          );
        }
        if (penaltyCount === null) return;
        const operation = scoreOperations.decrement;
        dispatch(updatePoints({ count: penaltyCount, operation }));
        return;
      }
    }

    // --- ПРИОРИТЕТ: Waste -> Tableaus и Foundations ---

    const { isCanMove, data } = selectMoveWasteTopCard(state, wasteId);

    console.log(
      "ПЕРЕД ПРИОРИТЕТ Waste -> Tableaus и Foundations ---: ",
      isCanMove,
    );
    if (isCanMove) {
      console.log("handleHints, ПРИОРИТЕТ: Waste -> Tableaus и Foundations");
      dispatch(
        updateCardOne({
          cardId: data.fromCardId,
          pileId: data.fromPileId,
          changes: { isHintShowing: true },
        }),
      );
      if (data.toPileTopCardId === null) {
        dispatch(
          setIsHintShowPileById({
            pileId: data.toPileId,
            value: true,
          }),
        );
      } else {
        dispatch(
          updateCardOne({
            cardId: data.toPileTopCardId,
            pileId: data.toPileId,
            changes: { isHintShowing: true },
          }),
        );
      }
      if (penaltyCount === null) return;
      const operation = scoreOperations.decrement;
      dispatch(updatePoints({ count: penaltyCount, operation }));
      return;
    }

    // // --- ПОСЛЕДНИЙ ВАРИАНТ: Взять карту из колоды ---
    const isCanRedeals = selectIsCanRedeals(state);
    const isNeedByRedealsShowing = selectIsNeedByRedealsShowing(state);
    const gameCurrentDealing = selectGameCurrentDealing(state);

    if (isCanRedeals || isNeedByRedealsShowing) {
      console.log("if (isCanRedeals || isNeedByRedealsShowing)");
      // --- ПРИОРИТЕТ 5: Stock to Foundations ---
      const { isCanMove, data } = selectMoveStockCardsToFoundations(
        state,
        stockId,
        wasteId,
        gameCurrentDealing,
      );
      if (isCanMove) {
        console.log("handleHints, ПРИОРИТЕТ 5: Stock to Foundations");
        if (isNeedByRedealsShowing) {
          dispatch(showPFModalById({ id: P_F_MODALS_IDS.NEED_BY_REDEALS }));
          return;
        }
        dispatch(
          setIsHintShowPileById({
            pileId: data.fromPileId,
            value: true,
          }),
        );
        if (penaltyCount === null) return;
        const operation = scoreOperations.decrement;
        dispatch(updatePoints({ count: penaltyCount, operation }));
        return;
      }
      if (gameCurrentDealing === dealingCounts.three) {
        const stockPile = selectPile(state, stockId);
        const wastePile = selectPile(state, wasteId);
        const allCardIds = [...stockPile.cardsIds, ...wastePile.cardsIds];
        if (allCardIds.length > 1) {
          dispatch(showPFModalById({ id: P_F_MODALS_IDS.NEED_BY_SHUFFLE }));
          return;
        }
      }
    }

    // Если мы дошли сюда, то ходов нет
    console.log("handleHints, НЕТ ХОДОВ!");
    playSound(AudioName.GAME_OVER, isSoundsEnabled);
    dispatch(endedGame({ status: GAME_STATUSES.GAME_OVER }));
    return { noHintAvailable: true };
  },
  {
    condition: (_, { getState }) => {
      if (selectIsEventsInDeck(getState())) return false;
      console.log('condition "handleHints": ', !selectIsCanUseHint(getState()));
      if (!selectIsCanUseHint(getState())) return false;
      return true;
    },
  },
);
