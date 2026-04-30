import { UNDO_THUNKS } from "../../../../Configs/UndoConfigs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectIsEventsInDeck } from "../selectors";
import { moveEventsTypes } from "../../../../Configs/GameConfigs";
import { selectAnimationsEnabled } from "../../settings/selectors";
import {
  animationsTypes,
  sides,
} from "../../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import {
  addCardOne,
  addTabsShirtCardIdOne,
  updateCardOne,
} from "../../decks/slice";
import {
  incrementMoves,
  incrementUndoUsed,
  removeUndo,
  updatePoints,
} from "../slice";
import { selectTableausShirtCardsIds } from "../../decks/selectors";
import { selectIsCollectCardsBtnVisible } from "../../ui/selectors";
import { setIsCollectCardsBtnVisible } from "../../ui/slice";
import {
  getAnimationFlipDuration,
  getAnimationMoveDuration,
} from "../../../../utils/playingCardUtils";
import { delay } from "../../../../utils/helpers";
import {
  animMove,
  getSetMoveAnimationData,
  resetMoveAnimationData,
} from "../../../../utils/gameSliceUtils";
import { getUndoPointsData } from "../../../../utils/undoSliceUtils";
import {
  AudioName,
  playSound,
  sounds,
} from "../../../../Services/soundService";
import {
  selectIsCanUseUndo,
  selectUndo,
  selectUndoStackLength,
} from "../selectors/undo";

export const handleUndo = createAsyncThunk(
  UNDO_THUNKS.HANDLE,
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const undo = selectUndo(getState());
      if (!undo) return;
      const { id, type, data } = undo;
      let isSuccess = false;
      switch (type) {
        case moveEventsTypes.standart:
          isSuccess = await dispatch(undoClickCard(data));
          break;
        case moveEventsTypes.wasteToStock:
          isSuccess = await dispatch(undoMoveStockWaste({ type, data }));
          break;
        case moveEventsTypes.stockToWaste:
          isSuccess = await dispatch(undoMoveStockWaste({ type, data }));
          break;
        default:
          console.warn(`Unknown undo type: ${type}`);
          return;
      }
      if (isSuccess) {
        dispatch(removeUndo({ id }));
        dispatch(incrementUndoUsed());
      }
      return;
    } catch (error) {
      console.error("Undo error:", error);
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const isEventsInDeck = selectIsEventsInDeck(state);
      const isCanUseUndo = selectIsCanUseUndo(state);
      const undosLength = selectUndoStackLength(state);
      if (isEventsInDeck) return false;
      if (!isCanUseUndo) return false;
      if (undosLength === 0) return false;
      return true;
    },
  },
);

export const undoClickCard = createAsyncThunk(
  UNDO_THUNKS.UNDO_CLICK_CARD,
  async (payload, { dispatch, getState }) => {
    const { fromPileId, toPileId, cardsIds, moveData, flipsData } = payload;
    const isFlipped = flipsData?.isFlipped;
    const isFlippedInTableau = flipsData?.isFlippedInTableau;
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    const type = animationsTypes.undoStandart;
    if (isFlipped && isFlippedInTableau) {
      const cardSide = flipsData.cardSide;
      const side = cardSide === sides.face ? sides.shirt : sides.face;
      const cardId = flipsData.cardId;
      const pileId = flipsData.pileId;
      const flipsPayload = { cardId, pileId, changes: { side } };
      dispatch(updateCardOne(flipsPayload));
      if (isAnimationsEnabled) {
        const duration = getAnimationFlipDuration(type);
        playSound(AudioName.CARD_FLIP);
        await delay(duration);
      }
      if (flipsData.pointsUpData?.isUpPoints) {
        const flipPointsPayload = getUndoPointsData(
          flipsData.pointsUpData.data,
        );
        dispatch(updatePoints(flipPointsPayload));
        playSound(AudioName.UP_SCORE);
      }
      dispatch(addTabsShirtCardIdOne({ cardId }));
      const tabsShirtCardsIds = selectTableausShirtCardsIds(getState());
      const isCollectCardsBtnVisible =
        selectIsCollectCardsBtnVisible(getState());
      const isTabsShirtCardsIds = tabsShirtCardsIds.length > 0;
      const isSetVisible = isCollectCardsBtnVisible && isTabsShirtCardsIds;
      if (isSetVisible) dispatch(setIsCollectCardsBtnVisible(false));
    }
    if (moveData.isMoves) {
      for (const cardId of cardsIds) {
        const payload = { cardId, fromPileId: toPileId, toPileId: fromPileId };
        dispatch(addCardOne(payload));
        if (isAnimationsEnabled) {
          const payload = getSetMoveAnimationData(type, cardId, fromPileId);
          dispatch(updateCardOne(payload));
        }
      }
      if (isAnimationsEnabled) {
        for (const cardId of cardsIds) {
          const duration = getAnimationMoveDuration(type);
          const moveSound = sounds[AudioName.CARD_MOVE];
          const soundRate = (moveSound.duration() * 1000) / duration;
          const moveSoundId = moveSound.play();
          moveSound.rate(soundRate, moveSoundId);
          await delay(duration);
          const payload = resetMoveAnimationData(fromPileId, cardId);
          dispatch(updateCardOne(payload));
        }
      }
      dispatch(incrementMoves());
      if (moveData.pointsUpData?.isUpPoints) {
        const movePointsPayload = getUndoPointsData(moveData.pointsUpData.data);
        dispatch(updatePoints(movePointsPayload));
        playSound(AudioName.UP_SCORE);
      }
    }
    return true;
  },
);

export const undoMoveStockWaste = createAsyncThunk(
  UNDO_THUNKS.UNDO_MOVE_STOCK_WASTE,
  async (payload, { dispatch, getState }) => {
    const { type, data } = payload;
    const { fromPileId, toPileId, cardsIds } = data;
    const isStockToWasteType = type === moveEventsTypes.stockToWaste;
    const side = isStockToWasteType ? sides.shirt : sides.face;
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    const moveCardsIds = [...cardsIds].reverse();
    for (const cardId of moveCardsIds) {
      dispatch(
        addCardOne({ cardId, fromPileId: toPileId, toPileId: fromPileId }),
      );
      if (isAnimationsEnabled)
        await animMove(dispatch, cardId, fromPileId, type);
      const flipSound = sounds[AudioName.CARD_FLIP];
      const flipSoundId = flipSound.play();
      flipSound.rate(2, flipSoundId);
      const changes = { side };
      dispatch(updateCardOne({ cardId, pileId: fromPileId, changes }));
    }
    return true;
  },
);
