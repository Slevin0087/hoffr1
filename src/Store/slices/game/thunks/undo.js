import { UNDO_THUNKS } from "../../../../Configs/UndoConfigs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectIsEventsInDeck } from "../selectors";
import { moveEventsTypes } from "../../../../Configs/GameConfigs";
import {
  selectAnimationsEnabled,
  selectSettingsByType,
} from "../../settings/selectors";
import {
  animationsNames,
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
import { getAnimationDuration } from "../../../../utils/playingCardUtils";
import { delay } from "../../../../utils/helpers";
import {
  animationCard,
  getResetAnimationData,
  getSetAnimationData,
} from "../../../../utils/gameSliceUtils";
import { getUndoPointsData } from "../../../../utils/undoSliceUtils";
import {
  AudioName,
  playSound,
  playSoundAsync,
} from "../../../../Services/soundService";
import {
  selectIsCanUseUndo,
  selectUndo,
  selectUndoStackLength,
} from "../selectors/undo";
import { gameSettingsTypes } from "../../../../Configs/SettingsConfigs";

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
    const type = animationsTypes.undoStandart;
    const isFlipped = flipsData?.isFlipped;
    const isFlippedInTableau = flipsData?.isFlippedInTableau;
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    const isSoundsEnabled = selectSettingsByType(
      getState(),
      gameSettingsTypes.soundsEffects,
    ).value;
    // const moveDuration = getAnimationMoveDuration(type);
    const moveDuration = getAnimationDuration(animationsNames.move, type);

    console.log("undoClickCard");
    if (isFlipped && isFlippedInTableau) {
      const cardSide = flipsData.cardSide;
      const side = cardSide === sides.face ? sides.shirt : sides.face;
      const cardId = flipsData.cardId;
      const pileId = flipsData.pileId;
      const flipsPayload = { cardId, pileId, changes: { side } };
      dispatch(updateCardOne(flipsPayload));
      playSound(AudioName.CARD_FLIP, isSoundsEnabled);

      if (flipsData.pointsUpData?.isUpPoints) {
        const flipPointsPayload = getUndoPointsData(
          flipsData.pointsUpData.data,
        );
        dispatch(updatePoints(flipPointsPayload));
        playSound(AudioName.UP_SCORE, isSoundsEnabled);
      }

      dispatch(addTabsShirtCardIdOne({ cardId }));
    }

    if (moveData.isMoves) {
      for (const cardId of cardsIds) {
        const payload = { cardId, fromPileId: toPileId, toPileId: fromPileId };
        dispatch(addCardOne(payload));
        if (isAnimationsEnabled) {
          // const payload = getSetMoveAnimationData(type, cardId, fromPileId);
          const payload = getSetAnimationData(
            cardId,
            fromPileId,
            animationsNames.move,
            type,
          );
          dispatch(updateCardOne(payload));
        }
      }

      playSoundAsync(AudioName.CARD_MOVE, moveDuration, isSoundsEnabled);

      if (isAnimationsEnabled) {
        await delay(moveDuration);
        for (const cardId of cardsIds) {
          const payload = getResetAnimationData(fromPileId, cardId);
          dispatch(updateCardOne(payload));
        }
      }

      dispatch(incrementMoves());

      if (moveData.pointsUpData?.isUpPoints) {
        const movePointsPayload = getUndoPointsData(moveData.pointsUpData.data);
        dispatch(updatePoints(movePointsPayload));
        playSound(AudioName.UP_SCORE, isSoundsEnabled);
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
    const isSoundsEnabled = selectSettingsByType(
      getState(),
      gameSettingsTypes.soundsEffects,
    ).value;
    const moveCardsIds = [...cardsIds].reverse();

    const animType = animationsTypes.undoStockToWaste;
    // const moveDuration = getAnimationMoveDuration(animType);
    const moveDuration = getAnimationDuration(animationsNames.move, animType);
    // const flipDuration = getAnimationFlipDuration(animType);
    const flipDuration = getAnimationDuration(animationsNames.flip, animType);
    for (const cardId of moveCardsIds) {
      dispatch(
        addCardOne({ cardId, fromPileId: toPileId, toPileId: fromPileId }),
      );

      playSoundAsync(AudioName.CARD_MOVE, moveDuration, isSoundsEnabled);

      if (isAnimationsEnabled) {
        await animationCard(
          dispatch,
          cardId,
          fromPileId,
          animationsNames.move,
          animType,
        );
      }

      playSoundAsync(AudioName.CARD_FLIP, flipDuration, isSoundsEnabled);

      const changes = { side };
      dispatch(updateCardOne({ cardId, pileId: fromPileId, changes }));
    }
    return true;
  },
);
