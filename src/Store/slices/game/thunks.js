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
  selectCardMove,
  selectEasyMoveToFoundations,
  selectIsFoundationsCompleted,
  selectMoveTopCardToFoundation,
  selectPileCardsIds,
  selectStock,
  selectStockId,
  selectTopCardByPileId,
  selectWaste,
  selectWasteId,
} from "../decks/selectors";
import { delay } from "../../../utils/helpers";
import {
  animationsNames,
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
  shuffleCardsByPileId,
  updateCardOne,
} from "../decks/slice";
import {
  selectGameCurrentModeId,
  selectIsCollectingCards,
  selectIsEventsInDeck,
} from "./selectors";
import {
  selectAnimationsEnabled,
  selectSettingsByType,
} from "../settings/selectors";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import {
  initGame,
  setGameStatus,
  setIsCollectingCards,
  updatePoints,
} from "./slice";
import {
  getFlipPointsByGameMode,
  getPointsByGameMode,
} from "../../../utils/gameModes";
import {
  getAnimationDuration,
  getAnimationShuffleDuration,
  isAce,
  isKing,
  isNextInSequence,
  isOppositeColor,
  isPreviousInSequence,
  isSameSuit,
} from "../../../utils/playingCardUtils";
import {
  animationCard,
  getAllPoints,
  getResetAnimationData,
  getSetAnimationData,
  getStockWasteMovePayload,
  isValidStockClick,
} from "../../../utils/gameSliceUtils";
import {
  AudioName,
  playSound,
  playSoundAsync,
} from "../../../Services/soundService";
import { dropTypes } from "../../../Configs/DecksConfigs";

export const moveStockWaste = createAsyncThunk(
  GAME_THUNKS.MOVE_STOCK_WASTE,
  async (args, { dispatch, getState }) => {
    const {
      type,
      fromPileId,
      toPileId,
      cardsIds,
      isCollectCardsUsed = false,
    } = args;
    const isStockToWasteType = type === moveEventsTypes.stockToWaste;
    const side = isStockToWasteType ? sides.face : sides.shirt;
    const animType = isCollectCardsUsed
      ? animationsTypes.collectStockToWaste
      : isStockToWasteType
        ? animationsTypes.stockToWaste
        : animationsTypes.wasteToStock;
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    const isSoundsEnabled = selectSettingsByType(
      getState(),
      gameSettingsTypes.soundsEffects,
    ).value;
    const moveDuration = getAnimationDuration(animationsNames.move, animType);
    const flipDuration = getAnimationDuration(animationsNames.flip, animType);

    for (const cardId of cardsIds) {
      const payload = { cardId, fromPileId, toPileId };
      dispatch(addCardOne(payload));

      playSoundAsync(AudioName.CARD_MOVE, moveDuration, isSoundsEnabled);

      if (isAnimationsEnabled) {
        await animationCard(
          dispatch,
          cardId,
          toPileId,
          animationsNames.move,
          animType,
        );
      }

      playSoundAsync(AudioName.CARD_FLIP, flipDuration, isSoundsEnabled);

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
      isCollectCardsUsed = false,
    } = args;
    const baseData = { pileId: null, cardId: null, cardSide: null };
    const moveData = { isMoves: false, pointsUpData: {} };
    const flippedData = { isFlipped: false, isFlippedInTableau: false };
    const flipsData = { ...baseData, ...flippedData, pointsUpData: {} };
    const animType = isCollectCardsUsed
      ? animationsTypes.collectStandart
      : animationsTypes.standart;
    const gameModeId = selectGameCurrentModeId(getState());
    const moveDuration = getAnimationDuration(animationsNames.move, animType);
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    const isSoundsEnabled = selectSettingsByType(
      getState(),
      gameSettingsTypes.soundsEffects,
    ).value;

    for (const cardId of cardsIds) {
      const payload = { cardId, fromPileId, toPileId };
      dispatch(addCardOne(payload));

      if (isAnimationsEnabled && !isDropping) {
        const payload = getSetAnimationData(
          cardId,
          toPileId,
          animationsNames.move,
          animType,
        );
        dispatch(updateCardOne(payload));
      }
    }

    playSoundAsync(AudioName.CARD_MOVE, moveDuration, isSoundsEnabled);

    if (isAnimationsEnabled && !isDropping) {
      await delay(moveDuration);

      for (const cardId of cardsIds) {
        const payload = getResetAnimationData(toPileId, cardId);
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
      playSound(AudioName.UP_SCORE, isSoundsEnabled);
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
        playSound(AudioName.CARD_FLIP, isSoundsEnabled);
        flipsData.isFlipped = true;
        flipsData.isFlippedInTableau = true;
        flipsData.pileId = pileId;
        flipsData.cardId = cardId;
        flipsData.cardSide = sides.face;

        const pointsFlip = getFlipPointsByGameMode(gameModeId, { pileId });

        if (pointsFlip) {
          const pointsFlipPayload = getAllPoints(
            getState(),
            pointsFlip,
            pileId,
            cardId,
          );

          dispatch(updatePoints(pointsFlipPayload));
          playSound(AudioName.UP_SCORE, isSoundsEnabled);
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
  async (
    { fromPileId, isCollectCardsUsed = false },
    { dispatch, getState },
  ) => {
    const foundationsIds = field_components_type_ids?.foundations;
    for (const foundationId of foundationsIds) {
      const { isCanMove, data } = isCollectCardsUsed
        ? selectEasyMoveToFoundations(getState(), fromPileId, foundationId)
        : selectMoveTopCardToFoundation(getState(), fromPileId, foundationId);

      if (!isCanMove) continue;

      const payload = {
        currentCardId: data.movingCardId,
        toPileId: foundationId,
        cardsIds: [data.movingCardId],
        fromPileId,
        isCollectCardsUsed,
      };
      await dispatch(standartMove(payload));
      return;
    }
  },
);

export const dealStockToTableaus = createAsyncThunk(
  GAME_THUNKS.DEAL_STOCK_TO_TABLEAUS,
  async ({ stockId }, { dispatch, getState }) => {
    const type = animationsTypes.dealsFromStockToTableaus;
    const tabIds = field_components_type_ids.tableaus;
    const willFlips = [];
    const tabsCounts = tabIds.length;
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    const isSoundsEnabled = selectSettingsByType(
      getState(),
      gameSettingsTypes.soundsEffects,
    ).value;

    await delay(5);

    for (let cycle = 0; cycle < tabsCounts; cycle++) {
      for (let tabIndex = cycle; tabIndex < tabsCounts; tabIndex++) {
        const cardsIds = selectPileCardsIds(getState(), stockId);
        const cardId = getTopCardId(cardsIds);
        const toPileId = tabIds[tabIndex];
        if (!cardId) return;
        const payload1 = { cardId, fromPileId: stockId, toPileId };
        dispatch(addCardOne(payload1));

        // const moveDuration = getAnimationMoveDuration(type);
        const moveDuration = getAnimationDuration(animationsNames.move, type);
        playSoundAsync(AudioName.CARD_MOVE, moveDuration, isSoundsEnabled);

        if (isAnimationsEnabled) {
          await animationCard(
            dispatch,
            cardId,
            toPileId,
            animationsNames.move,
            type,
          );
        }
        if (cycle === tabIndex) {
          willFlips.push({ cardId, pileId: toPileId });
        } else dispatch(addTabsShirtCardIdOne({ cardId }));
        if (isAnimationsEnabled) await delay(moveDuration);
      }
    }
    for (const willFlip of willFlips) {
      const { cardId, pileId } = willFlip;
      const payload = { cardId, pileId, changes: { side: sides.face } };
      // const flipDuration = getAnimationFlipDuration(type);
      const flipDuration = getAnimationDuration(animationsNames.flip, type);
      playSoundAsync(AudioName.CARD_FLIP, flipDuration, isSoundsEnabled);
      dispatch(updateCardOne(payload));
      await delay(flipDuration);
    }
  },
  { condition: ({ stockId }) => !!stockId },
);

export const handleCardClick = createAsyncThunk(
  GAME_THUNKS.HANDLE_CARD_CLICK,
  async ({ card }, { dispatch, getState }) => {
    const state = getState();
    const { isCanMove, data } = selectCardMove(state, card);
    if (!isCanMove) {
      if (data.cardsIds?.length > 0) {
        const isSoundsEnabled = selectSettingsByType(
          getState(),
          gameSettingsTypes.soundsEffects,
        ).value;
        playSound(AudioName.INFO, isSoundsEnabled);
        for (const cardId of data.cardsIds) {
          console.log("Card ID:", cardId);
          animationCard(
            dispatch,
            cardId,
            data.fromPileId,
            animationsNames.can_not_move,
            animationsTypes.standart,
          );
        }
      }
      return;
    }
    const { currentCardId, toPileId, cardsIds, fromPileId } = data;
    const payload = {
      currentCardId,
      toPileId,
      cardsIds,
      fromPileId,
      isUserMove: true,
    };
    await dispatch(standartMove(payload));
    return;
  },
  {
    condition: ({ card }, { getState }) => {
      if (!card) return false;
      const type = gameSettingsTypes.canCardClick;
      const isCanCardClick = selectSettingsByType(getState(), type);
      if (!isCanCardClick?.value) return false;
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
    dispatch(setIsCollectingCards(true));

    if (selectIsFoundationsCompleted(getState())) {
      dispatch(setIsCollectingCards(false));
      return;
    }

    const tableausIds = field_components_type_ids.tableaus;

    for (const tableauId of tableausIds) {
      await dispatch(
        moveToFoundations({
          fromPileId: tableauId,
          isCollectCardsUsed: true,
        }),
      );
    }

    const wasteId = selectWasteId(getState());
    const stockId = selectStockId(getState());
    await dispatch(
      moveToFoundations({ fromPileId: wasteId, isCollectCardsUsed: true }),
    );
    const stockWasteMovePayload = getStockWasteMovePayload(getState(), stockId);

    if (stockWasteMovePayload) {
      await dispatch(
        moveStockWaste({
          ...stockWasteMovePayload,
          isCollectCardsUsed: true,
        }),
      );
    }

    // await dispatch(handleCollectCards());
    dispatch(handleCollectCards());
  },
  {
    condition: (_, { getState }) => {
      console.log(
        "handleCollectCards, condition, selectIsEventsInDeck: ",
        selectIsEventsInDeck(getState()),
      );
      if (
        selectIsEventsInDeck(getState()) &&
        !selectIsCollectingCards(getState())
      )
        return false;
      return true;
    },
  },
);

export const handleShuffle = createAsyncThunk(
  GAME_THUNKS.HANDLE_SHUFFLE,
  async (_, { dispatch, getState }) => {
    const stock = selectStock(getState());
    const waste = selectWaste(getState());
    const hasStockMoreOneCardId = stock.cardsIds.length > 1;
    const hasWasteMoreOneCardId = waste.cardsIds.length > 1;

    if (!hasStockMoreOneCardId && !hasWasteMoreOneCardId) return;

    const type = animationsTypes.shuffleStock;
    const duration = getAnimationShuffleDuration(type);
    const resultCardsIds = [...stock.cardsIds, ...waste.cardsIds];
    const isAnimationsEnabled = selectAnimationsEnabled(getState());
    const isSoundsEnabled = selectSettingsByType(
      getState(),
      gameSettingsTypes.soundsEffects,
    ).value;

    for (let i = 0; i < resultCardsIds.length; i++) {
      const randomIndex = Math.floor(Math.random() * resultCardsIds.length);
      const randomCardId = resultCardsIds[randomIndex];
      const pileId = stock.cards[randomCardId] ? stock.id : waste.id;
      dispatch(shuffleCardsByPileId({ pileId }));
      playSoundAsync(AudioName.SHUFFLE, duration, isSoundsEnabled);
      if (isAnimationsEnabled) {
        await animationCard(
          dispatch,
          randomCardId,
          pileId,
          animationsNames.shuffle,
          type,
        );
      }
    }
  },
  {
    condition: (_, { getState }) => {
      return !selectIsEventsInDeck(getState());
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
