import { createAsyncThunk } from "@reduxjs/toolkit";
import { UNDO_THUNKS } from "../../../Configs/UndoConfigs";
import { selectCanUndo, selectUndo, selectUndoStackLength } from "./selectors";
import { dealCards, flipCards } from "../decks/thunks";
import { removeUndo } from "./slice";
import { sides } from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";

export const undoUse = createAsyncThunk(
  UNDO_THUNKS.USE,
  async (_, { dispatch, getState, rejectWithValue }) => {
    const result = {
      isUndoUsed: false,
      undoRemoved: false,
      score: {},
    };
    try {
      const state = getState();
      const undo = selectUndo(state);
      console.log("undo: ", undo);
      const { id, payload, type } = undo;
      console.log(id, payload, type);
      for (const dealing of payload.dealeds) {
        const { cardsIds } = dealing;
        for (const cardId of cardsIds) {
          const deals = await dispatch(
            dealCards({
              cardsIds: [cardId],
              fromPileId: payload.toPileId,
              toPileId: payload.fromPileId,
            }),
          ).unwrap();
          if (deals.isDealed) {
            console.log("deals.isDealed: ", deals.isDealed);
          }
        }
      }

      console.log("ddddddddddddddd");
      if (payload.isFlipped) {
        console.log("if (payload.isFlipped): ", payload.isFlipped);
        const flippeds = payload.flippeds;
        for (const { cardsIds, sideType } of flippeds) {
          const resultSideType =
            sideType === sides.face ? sides.shirt : sides.face;
          for (const cardId of cardsIds) {
            const flips = await dispatch(
              flipCards({
                cardsIds: [cardId],
                pileId: payload.fromPileId,
                sideType: resultSideType,
              }),
            ).unwrap();
            if (flips.isFlipped) {
              console.log("flips.isFlipped: ", flips.isFlipped);
            }
          }
        }
      }
      dispatch(removeUndo({ id }));
      result.isUndoUsed = true;
      result.undoRemoved = true;
      result.score = undo.score;
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const isCanUndo = selectCanUndo(state);
      console.log("isCanUndo: ", isCanUndo);
      if (!isCanUndo) return false;
      const undosLength = selectUndoStackLength(state);
      if (undosLength === 0) return false;
      return true;
    },
  },
);
