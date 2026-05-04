import { createAsyncThunk } from "@reduxjs/toolkit";
import { field_components_type_ids } from "../../../Configs/FieldComponentsConfigs";
import {
  GAME_STATUSES,
  GAME_THUNKS,
  moveEventsTypes,
} from "../../../Configs/GameConfigs";
import {
  createDeckAndShuffle,
  getTopCardId,
  getTopCardsIds,
} from "../../../utils/deckUtils";
import {
  selectCanMoveCardToPile,
  selectCanMoveToFoundation,
  selectIsFoundationsCompleted,
  selectPile,
  selectPileCardsIds,
  selectStockId,
  selectTopCardByPileId,
  selectWasteId,
} from "../decks/selectors";
import { delay } from "../../../utils/helpers";
import {
  animationsData,
  animationsTypes,
  sides,
} from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import {
  addCardOne,
  addTabsShirtCardIdOne,
  initStockCards,
  removeTabsShirtCardIdOne,
  resetDeck,
  resetIsDraggingCardsByPileId,
  shuffleStockCardsIds,
  updateCardOne,
} from "../decks/slice";
import { selectGameCurrentModeId, selectIsEventsInDeck } from "./selectors";
import {
  selectAnimationsEnabled,
  selectSettingsByType,
} from "../settings/selectors";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import { initGame, setGameStatus, updatePoints } from "./slice";
import {
  getFlipPointsByGameMode,
  getPointsByGameMode,
} from "../../../utils/gameModes";
import {
  getAnimationFlipDuration,
  getAnimationMoveDuration,
  isAce,
  isKing,
  isNextInSequence,
  isOppositeColor,
  isPreviousInSequence,
  isSameSuit,
} from "../../../utils/playingCardUtils";
import {
  animMove,
  animShuffle,
  getAllPoints,
  getSetMoveAnimationData,
  getStockWasteMovePayload,
  isValidStockClick,
  resetMoveAnimationData,
} from "../../../utils/gameSliceUtils";
import { AudioName, playSound, sounds } from "../../../Services/soundService";
import { dropTypes } from "../../../Configs/PlayingCardsConfigs/DecksConfigs";

export const moveStockWaste = createAsyncThunk(
  GAME_THUNKS.MOVE_STOCK_WASTE,
  async (args, { dispatch, getState }) => {
    const { type, fromPileId, toPileId, cardsIds } = args;
    const isStockToWasteType = type === moveEventsTypes.stockToWaste;
    const side = isStockToWasteType ? sides.face : sides.shirt;
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    for (const cardId of cardsIds) {
      const payload = { cardId, fromPileId, toPileId };
      dispatch(addCardOne(payload));
      if (isAnimationsEnabled) await animMove(dispatch, cardId, toPileId, type);
      const flipSound = sounds[AudioName.CARD_FLIP];
      const flipSoundId = flipSound.play();
      flipSound.rate(2, flipSoundId);
      const pileId = toPileId;
      const changes = { side };
      dispatch(updateCardOne({ cardId, pileId, changes }));
    }
  },
);

export const standartMove = createAsyncThunk(
  GAME_THUNKS.STANDART_MOVE,
  async (args, { dispatch, getState }) => {
    const {
      currentCardId,
      fromPileId,
      toPileId,
      cardsIds,
      isDropping = false,
      isUserMove = false,
    } = args;
    const baseData = { pileId: null, cardId: null, cardSide: null };
    const moveData = { isMoves: false, pointsUpData: {} };
    const flippedData = { isFlipped: false, isFlippedInTableau: false };
    const flipsData = { ...baseData, ...flippedData, pointsUpData: {} };
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    const gameModeId = selectGameCurrentModeId(getState());
    const animType = animationsTypes.standart;
    for (const cardId of cardsIds) {
      const payload = { cardId, fromPileId, toPileId };
      dispatch(addCardOne(payload));
      if (isAnimationsEnabled && !isDropping) {
        const payload = getSetMoveAnimationData(animType, cardId, toPileId);
        dispatch(updateCardOne(payload));
      }
    }
    if (isAnimationsEnabled && !isDropping) {
      const duration = getAnimationMoveDuration(animType);
      const moveSound = sounds[AudioName.CARD_MOVE];
      const soundRate = (moveSound.duration() * 1000) / duration;
      const moveSoundId = moveSound.play();
      moveSound.rate(soundRate, moveSoundId);
      await delay(duration);
      for (const cardId of cardsIds) {
        const payload = resetMoveAnimationData(toPileId, cardId);
        dispatch(updateCardOne(payload));
      }
    }
    moveData.isMoves = true;
    if (isDropping) {
      dispatch(resetIsDraggingCardsByPileId({ pileId: toPileId }));
    }

    const payloadPoints = { fromPileId, toPileId, cardId: currentCardId };
    const pointsMoveData = getPointsByGameMode(gameModeId, payloadPoints);
    if (pointsMoveData) {
      const pointsMovePayload = getAllPoints(
        getState(),
        pointsMoveData,
        toPileId,
        currentCardId,
      );
      dispatch(updatePoints(pointsMovePayload));
      playSound(AudioName.UP_SCORE);
      moveData.pointsUpData.isUpPoints = true;
      moveData.pointsUpData.data = pointsMovePayload;
    }
    const tableausIds = field_components_type_ids.tableaus;
    const isPileFromTableau = tableausIds.includes(fromPileId);
    if (isPileFromTableau) {
      const topCard = selectTopCardByPileId(getState(), fromPileId);
      const isSideShirt = topCard?.side === sides.shirt;
      if (topCard && isSideShirt) {
        const cardId = topCard.id;
        const pileId = fromPileId;
        const changes = { side: sides.face };
        const flipsPayload = { cardId, pileId, changes };
        dispatch(updateCardOne(flipsPayload));
        flipsData.isFlipped = true;
        flipsData.isFlippedInTableau = true;
        flipsData.pileId = pileId;
        flipsData.cardId = cardId;
        flipsData.cardSide = sides.face;
        if (isAnimationsEnabled) {
          const duration = getAnimationFlipDuration(animType);
          playSound(AudioName.CARD_FLIP);
          await delay(duration);
        }
        const pointsFlip = getFlipPointsByGameMode(gameModeId, { pileId });
        if (pointsFlip) {
          const pointsFlipPayload = getAllPoints(
            getState(),
            pointsFlip,
            pileId,
            cardId,
          );
          dispatch(updatePoints(pointsFlipPayload));
          playSound(AudioName.UP_SCORE);
          flipsData.pointsUpData.isUpPoints = true;
          flipsData.pointsUpData.data = pointsFlipPayload;
        }
        dispatch(removeTabsShirtCardIdOne({ cardId }));
      }
    }
    const type = moveEventsTypes.standart;
    const data = {
      fromPileId,
      toPileId,
      cardsIds,
      moveData,
      flipsData,
      isDropping,
      isUserMove,
    };
    return { type, data };
  },
);

export const moveToFoundations = createAsyncThunk(
  GAME_THUNKS.MOVE_TO_FOUNDATIONS,
  async ({ fromPileId }, { dispatch, getState }) => {
    const fromPile = selectPile(getState(), fromPileId);
    const topCardId = getTopCardId(fromPile?.cardsIds);
    const topCard = fromPile?.cards?.[topCardId];
    if (!topCard) return { moved: false };
    const foundationsIds = field_components_type_ids?.foundations;
    for (const foundationId of foundationsIds) {
      const isCanMove = selectCanMoveToFoundation(
        getState(),
        foundationId,
        topCard,
      );
      if (!isCanMove) continue;
      const currentCardId = topCardId;
      const toPileId = foundationId;
      const cardsIds = [currentCardId];
      const payload = {
        currentCardId,
        toPileId,
        cardsIds,
        fromPileId,
        isUserMove: false,
      };
      await dispatch(standartMove(payload));
    }
  },
);

export const dealStockToTableaus = createAsyncThunk(
  GAME_THUNKS.DEAL_STOCK_TO_TABLEAUS,
  async ({ stockId }, { dispatch, getState }) => {
    const tabIds = field_components_type_ids.tableaus;
    const tabsCounts = tabIds.length;
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    const willFlips = [];
    await delay(5);
    for (let cycle = 0; cycle < tabsCounts; cycle++) {
      for (let tabIndex = cycle; tabIndex < tabsCounts; tabIndex++) {
        const cardsIds = selectPileCardsIds(getState(), stockId);
        const cardId = getTopCardId(cardsIds);
        const toPileId = tabIds[tabIndex];
        if (!cardId) return;
        const payload1 = { cardId, fromPileId: stockId, toPileId };
        dispatch(addCardOne(payload1));

        if (isAnimationsEnabled) {
          const type = animationsTypes.dealsFromStockToTableaus;
          animMove(dispatch, cardId, toPileId, type);
        }
        if (cycle === tabIndex) {
          willFlips.push({ cardId, pileId: toPileId });
        } else dispatch(addTabsShirtCardIdOne({ cardId }));
        if (isAnimationsEnabled) {
          await delay(
            animationsData.move.types.dealsFromStockToTableaus.transition
              .duration * 1000,
          );
        }
      }
    }
    for (const willFlip of willFlips) {
      const { cardId, pileId } = willFlip;
      const payload = { cardId, pileId, changes: { side: sides.face } };
      const type = animationsTypes.dealsFromStockToTableaus;
      const duration = getAnimationFlipDuration(type);
      const flipSound = sounds[AudioName.CARD_FLIP];
      const soundRate = (flipSound.duration() * 1000) / duration;
      const flipSoundId = flipSound.play();
      flipSound.rate(soundRate, flipSoundId);
      dispatch(updateCardOne(payload));
      await delay(duration);
    }
  },
  { condition: ({ stockId }) => !!stockId },
);

export const handleCardClick = createAsyncThunk(
  GAME_THUNKS.HANDLE_CARD_CLICK,
  async ({ card }, { dispatch, getState }) => {
    const state = getState();
    const fromPileId = card?.pileId;
    const currentCardId = card.id;
    const tableausIds = field_components_type_ids.tableaus;
    const foundationsIds = field_components_type_ids.foundations;
    const pileCardsIds = selectPileCardsIds(state, fromPileId);
    const cardsIds = getTopCardsIds(currentCardId, pileCardsIds);
    if (cardsIds.length === 0) return;
    const isCardsIdsOne = cardsIds.length === 1;
    const pileIds = [...foundationsIds, ...tableausIds];
    const targetPiles = isCardsIdsOne ? pileIds : tableausIds;
    for (const toPileId of targetPiles) {
      const isCanMove = selectCanMoveCardToPile(state, toPileId, card);
      if (!isCanMove) continue;
      const payload = {
        currentCardId,
        toPileId,
        cardsIds,
        fromPileId,
        isUserMove: true,
      };
      await dispatch(standartMove(payload));
      return;
    }
  },
  {
    condition: ({ card }, { getState }) => {
      if (!card) return false;
      const type = gameSettingsTypes.assistanceInCardClick;
      const isAssistanceInCardClick = selectSettingsByType(getState(), type);
      if (!isAssistanceInCardClick?.value) return false;
      return selectIsEventsInDeck(getState()) ? false : true;
    },
  },
);

export const handleStockClick = createAsyncThunk(
  GAME_THUNKS.HANDLE_STOCK_CLICK,
  async ({ stockId }, { dispatch, getState }) => {
    const payload = getStockWasteMovePayload(getState(), stockId);
    if (!payload) return;
    await dispatch(moveStockWaste(payload));
    return;
  },
  {
    condition: ({ stockId }, { getState }) => {
      if (selectIsEventsInDeck(getState())) return false;
      return isValidStockClick(getState(), stockId);
    },
  },
);

export const handleCollectCards = createAsyncThunk(
  GAME_THUNKS.HANDLE_COLLECT_CARDS,
  async (_, { dispatch, getState }) => {
    if (selectIsFoundationsCompleted(getState())) return;
    const tableausIds = field_components_type_ids.tableaus;
    for (const tableauId of tableausIds) {
      await dispatch(moveToFoundations({ fromPileId: tableauId }));
    }
    const wasteId = selectWasteId(getState());
    const stockId = selectStockId(getState());
    await dispatch(moveToFoundations({ fromPileId: wasteId }));
    const stockWasteMovePayload = getStockWasteMovePayload(getState(), stockId);
    await dispatch(moveStockWaste(stockWasteMovePayload));
    await dispatch(handleCollectCards());
  },
  {
    condition: (_, { getState }) => !selectIsEventsInDeck(getState()),
  },
);

export const handleShuffle = createAsyncThunk(
  GAME_THUNKS.HANDLE_SHUFFLE,
  async ({ stockId }, { dispatch, getState }) => {
    const cardsIds = selectPileCardsIds(getState(), stockId);
    if (!cardsIds || !cardsIds.length) return;
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    if (isAnimationsEnabled) {
      for (let i = 0; i < cardsIds.length; i++) {
        const randomIndex = Math.floor(Math.random() * cardsIds.length);
        const randomCardId = cardsIds[randomIndex];
        const type = animationsTypes.shuffleStock;
        await animShuffle(dispatch, randomCardId, stockId, type);
      }
    }
    dispatch(shuffleStockCardsIds({ stockId }));
  },
  {
    condition: ({ stockId }, { getState }) => {
      return !selectIsEventsInDeck(getState()) && stockId;
    },
  },
);

export const handleGameInit = createAsyncThunk(
  GAME_THUNKS.GAME_INIT,
  async (_, { dispatch, getState }) => {
    const stockId = selectStockId(getState());
    const gameModeType = gameSettingsTypes.gameMode;
    const dealingCardsType = gameSettingsTypes.dealingCards;
    const gameModeId = selectSettingsByType(getState(), gameModeType);
    const dealingCards = selectSettingsByType(getState(), dealingCardsType);
    const cards = createDeckAndShuffle();
    dispatch(setGameStatus(GAME_STATUSES.INIT));
    dispatch(resetDeck());
    dispatch(initStockCards({ pileId: stockId, cards }));
    dispatch(
      initGame({
        currentModeId: gameModeId.value,
        currentDealing: dealingCards.value,
      }),
    );
    await dispatch(dealStockToTableaus({ stockId }));
    dispatch(setGameStatus(GAME_STATUSES.READY));
  },
  {
    condition: (_, { getState }) => !selectIsEventsInDeck(getState()),
  },
);

export const handleDrop = createAsyncThunk(
  GAME_THUNKS.HANDLE_DROP,
  async (args, { dispatch, getState }) => {
    const { item, dropResult } = args;
    const card = item.card;
    const dropType = dropResult?.dropType;
    const isTargetPileEmpty = dropType === dropTypes.PILE;
    const isTargetCard = dropType === dropTypes.CARD;
    const currentCardId = card.id;
    const fromPileId = card.pileId;
    const toPileId = isTargetPileEmpty ? dropResult.id : dropResult.card.pileId;
    const isToFoundation =
      field_components_type_ids.foundations.includes(toPileId);
    const fromPileCardsIds = selectPileCardsIds(getState(), fromPileId);
    const movingCardsIds = getTopCardsIds(currentCardId, fromPileCardsIds);
    const isMovingCardsIdsMany = movingCardsIds.length > 1;
    const isMovingCardsIdsOne = movingCardsIds.length === 1;
    if (isToFoundation && isMovingCardsIdsMany) {
      dispatch(resetIsDraggingCardsByPileId({ pileId: fromPileId }));
      return;
    }
    if (isToFoundation && isMovingCardsIdsOne) {
      let isCanMove = false;
      if (isTargetPileEmpty) isCanMove = isAce(card);
      if (isTargetCard) {
        isCanMove =
          isSameSuit(card, dropResult.card) &&
          isPreviousInSequence(card, dropResult.card);
      }
      if (!isCanMove) {
        dispatch(resetIsDraggingCardsByPileId({ pileId: fromPileId }));
        return;
      }
      const payload = {
        currentCardId,
        toPileId,
        cardsIds: movingCardsIds,
        fromPileId,
        isDropping: true,
      };
      await dispatch(standartMove(payload));
    }
    const isToTableau = field_components_type_ids.tableaus.includes(toPileId);
    if (isToTableau) {
      let isCanMove = false;
      if (isTargetPileEmpty) isCanMove = isKing(card);
      if (isTargetCard) {
        isCanMove =
          isOppositeColor(card, dropResult.card) &&
          isNextInSequence(card, dropResult.card);
      }
      if (!isCanMove) {
        dispatch(resetIsDraggingCardsByPileId({ pileId: fromPileId }));
        return;
      }
      const payload = {
        currentCardId,
        toPileId,
        cardsIds: movingCardsIds,
        fromPileId,
        isDropping: true,
      };
      await dispatch(standartMove(payload));
    }
  },
);
