import { createAsyncThunk } from "@reduxjs/toolkit";
import { HINTS_THUNKS } from "../../../../Configs/HintsConfigs";
import { field_components_type_ids } from "../../../../Configs/FieldComponentsConfigs";
import {
  selectMoveStockCardsToFoundations,
  selectMoveTopCardFromPileToFoundationPile,
  selectMoveTopCardFromPileToTableauPile,
  selectMoveTopCardsTableauToTableau,
  selectPileCardsIds,
  selectStockId,
  selectWasteId,
} from "../../decks/selectors";
import { updatePoints } from "../slice";
import { scoreOperations } from "../../../../Configs/GameConfigs";
import { selectIsEventsInDeck } from "../selectors";
import {
  setHintShowColor,
  setHintShowColorPileById,
  updateCardOne,
} from "../../decks/slice";
import { selectHintsPenalty, selectIsCanUseHint } from "../selectors/hints";
import { showPFModalById } from "../../ui/slice";
import { P_F_MODALS_IDS } from "../../../../Configs/UIConfigs";

export const handleHints = createAsyncThunk(
  HINTS_THUNKS.USE,
  async (args, { dispatch, getState }) => {
    console.log("HANDLE_HINTS");
    const state = getState();
    const stockId = selectStockId(state);
    const wasteId = selectWasteId(state);
    const tableausIds = field_components_type_ids.tableaus;
    const foundationsIds = field_components_type_ids.foundations;

    // --- ПРИОРИТЕТ 1: Tableau -> Foundation ---
    for (const tableauId of tableausIds) {
      for (const foundationId of foundationsIds) {
        const { isCanMove, data } = selectMoveTopCardFromPileToFoundationPile(
          state,
          tableauId,
          foundationId,
        );
        if (!isCanMove) continue;
        console.log(
          "handleHints НАЙДЕН ЛУЧШИЙ ХОД, ПРИОРИТЕТ 1, из tableau в foundation",
        );
        dispatch(
          updateCardOne({
            cardId: data.fromCardId,
            pileId: data.fromPileId,
            changes: { hintShowColor: "green" },
          }),
        );
        if (data.toPileTopCardId === null) {
          dispatch(
            setHintShowColorPileById({
              pileId: data.toPileId,
              value: "yellow",
            }),
          );
        } else {
          dispatch(
            updateCardOne({
              cardId: data.toPileTopCardId,
              pileId: data.toPileId,
              changes: { hintShowColor: "yellow" },
            }),
          );
        }
        const operation = scoreOperations.decrement;
        const penaltyCount = selectHintsPenalty(state);
        dispatch(updatePoints({ count: penaltyCount, operation }));
        return;
      }
    }

    // --- ПРИОРИТЕТ 2: Waste -> Foundation ---
    for (const foundationId of foundationsIds) {
      const { isCanMove, data } = selectMoveTopCardFromPileToFoundationPile(
        state,
        wasteId,
        foundationId,
      );
      if (!isCanMove) continue;
      console.log("handleHints НАЙДЕН ХОД, ПРИОРИТЕТ 2, из waste в foundation");
      dispatch(
        updateCardOne({
          cardId: data.fromCardId,
          pileId: data.fromPileId,
          changes: { hintShowColor: "green" },
        }),
      );
      if (data.toPileTopCardId === null) {
        dispatch(
          setHintShowColorPileById({
            pileId: data.toPileId,
            value: "yellow",
          }),
        );
      } else {
        dispatch(
          updateCardOne({
            cardId: data.toPileTopCardId,
            pileId: data.toPileId,
            changes: { hintShowColor: "yellow" },
          }),
        );
      }
      const operation = scoreOperations.decrement;
      const penaltyCount = selectHintsPenalty(state);
      dispatch(updatePoints({ count: penaltyCount, operation }));
      return;
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
        console.log("handleHints НАЙДЕН ХОД, ПРИОРИТЕТ 3");
        dispatch(setHintShowColor({ ...data }));
        const operation = scoreOperations.decrement;
        const penaltyCount = selectHintsPenalty(state);
        dispatch(updatePoints({ count: penaltyCount, operation }));
        return;
      }
    }

    // --- ПРИОРИТЕТ 4: Waste -> Tableau ---

    for (const toTableauId of tableausIds) {
      const { isCanMove, data } = selectMoveTopCardFromPileToTableauPile(
        state,
        wasteId,
        toTableauId,
      );
      if (!isCanMove) continue;
      console.log("handleHints НАЙДЕН ХОД, ПРИОРИТЕТ 4, из waste в tableau");
      dispatch(
        updateCardOne({
          cardId: data.fromCardId,
          pileId: data.fromPileId,
          changes: { hintShowColor: "green" },
        }),
      );
      if (data.toPileTopCardId === null) {
        dispatch(
          setHintShowColorPileById({
            pileId: data.toPileId,
            value: "yellow",
          }),
        );
      } else {
        dispatch(
          updateCardOne({
            cardId: data.toPileTopCardId,
            pileId: data.toPileId,
            changes: { hintShowColor: "yellow" },
          }),
        );
      }
      const operation = scoreOperations.decrement;
      const penaltyCount = selectHintsPenalty(state);
      dispatch(updatePoints({ count: penaltyCount, operation }));
      return;
    }

    // --- ПРИОРИТЕТ 5: Stock to Foundations ---
    const { isCanMove, data } = selectMoveStockCardsToFoundations(
      state,
      stockId,
      wasteId,
    );
    console.log("ПРИОРИТЕТ 5: Stock to Foundations: ", isCanMove, data);
    if (isCanMove) {
      console.log("handleHints НАЙДЕН ХОД, ПРИОРИТЕТ 5: Stock to Foundations");
      dispatch(
        setHintShowColorPileById({
          pileId: data.fromPileId,
          value: "green",
        }),
      );
      const operation = scoreOperations.decrement;
      const penaltyCount = selectHintsPenalty(state);
      dispatch(updatePoints({ count: penaltyCount, operation }));
      return;
    }

    // // --- ПОСЛЕДНИЙ ВАРИАНТ: Взять карту из колоды ---
    // const stockCardsIds = selectPileCardsIds(state, stockId);
    // if (stockCardsIds.length > 0) {
    //   console.log("Hint: Draw card from stock");
    //   dispatch(
    //     setHintShowColorPileById({
    //       pileId: stockId,
    //       value: "green",
    //     }),
    //   );
    //   const operation = scoreOperations.decrement;
    //   const penaltyCount = selectHintsPenalty(state);
    //   dispatch(updatePoints({ count: penaltyCount, operation }));
    //   return;
    // }

    // Если мы дошли сюда, то ходов нет
    console.log("No moves available.");
    dispatch(showPFModalById({ id: P_F_MODALS_IDS.GAME_OVER_AND_WIN }));
    return { noHintAvailable: true };
  },
  {
    condition: (_, { getState }) => {
      if (selectIsEventsInDeck(getState())) return false;
      if (!selectIsCanUseHint(getState())) return false;
      return true;
    },
  },
);
