import {
  gameStateTypes,
  gameStateTypesValuesKeys,
  moveEventsTypes,
  scoreOperations,
} from "../Configs/GameConfigs";
import { animationsNames } from "../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { AudioName, sounds } from "../Services/soundService";
import {
  selectCardPoints,
  selectPileCardsIds,
  selectWasteId,
} from "../Store/slices/decks/selectors";
import { updateCardOne } from "../Store/slices/decks/slice";
import {
  selectGameCurrentDealing,
  selectIsCanRedeals,
} from "../Store/slices/game/selectors";
import { getNTopCardsIds } from "./deckUtils";
import { delay } from "./helpers";
import {
  getAnimationMoveDuration,
  getAnimationShuffleDuration,
} from "./playingCardUtils";

export const incrementMoves = (state) => {
  const currentGame = state.entities[state.currentId];
  currentGame.sessionState.moves.count += 1;
  currentGame.lifetimeState.moves.count += 1;
};

export const upLifetimeStateByTypeEndOperation = (state, action) => {
  const { type, key, value, operation } = action.payload;
  if (operation === scoreOperations.increment) {
    state.entities[state.currentId].lifetimeState[type][key] += value;
  } else if (operation === scoreOperations.decrement) {
    state.entities[state.currentId].lifetimeState[type][key] -= value;
  }
};

export const upSessionStateByTypeEndOperation = (state, action) => {
  console.log("upSessionStateByTypeEndOperation action: ", action);
  const { type, key, changes } = action.payload;
  const { value, operation } = changes;
  if (operation === scoreOperations.increment) {
    state.entities[state.currentId].sessionState[type][key] += value;
  } else if (operation === scoreOperations.decrement) {
    state.entities[state.currentId].sessionState[type][key] -= value;
  }
  state.entities[state.currentId].sessionState[type] = {
    ...state.entities[state.currentId].sessionState[type],
    ...changes,
  };
};

export const updatePoints = (state, action) => {
  const { count, operation, cardId } = action.payload;
  const type = gameStateTypes.points;
  const key = gameStateTypesValuesKeys.count;
  const upLifetimeStatePayload = { type, key, value: count, operation };
  const upSessionStateChanges = {
    changing: true,
    value: count,
    operation,
    cardId,
  };
  const upSessionStatePayload = { type, key, changes: upSessionStateChanges };
  upSessionStateByTypeEndOperation(state, {
    payload: upSessionStatePayload,
  });
  upLifetimeStateByTypeEndOperation(state, {
    payload: upLifetimeStatePayload,
  });
};

/////////////////////////////////////////////////////////////////////////////

export const getSetMoveAnimationData = (type, cardId, pileId) => {
  const name = animationsNames.move;
  const moveData = { name, type };
  const changes = { isAnimating: true, activeAnimations: [moveData] };
  return { pileId, cardId, changes };
};

export const resetMoveAnimationData = (pileId, cardId) => {
  const changes = { isAnimating: false, activeAnimations: [] };
  return { pileId, cardId, changes };
};

export const animMove = async (dispatch, cardId, toPileId, type) => {
  const setAnimPayload = getSetMoveAnimationData(type, cardId, toPileId);
  const resetAnimPayload = resetMoveAnimationData(toPileId, cardId);
  const duration = getAnimationMoveDuration(type);
  const moveSound = sounds[AudioName.CARD_MOVE];
  const soundRate = (moveSound.duration() * 1000) / duration;
  const moveSoundId = moveSound.play();
  moveSound.rate(soundRate, moveSoundId);
  dispatch(updateCardOne(setAnimPayload));
  await delay(duration);
  dispatch(updateCardOne(resetAnimPayload));
};

export const animShuffle = async (dispatch, cardId, pileId, type) => {
  const name = animationsNames.shuffle;
  const setAnimPayload = {
    pileId,
    cardId,
    changes: { isAnimating: true, activeAnimations: [{ name, type }] },
  };
  const resetAnimPayload = {
    pileId,
    cardId,
    changes: { isAnimating: false, activeAnimations: [] },
  };
  const duration = getAnimationShuffleDuration(type);
  // const moveSound = sounds[AudioName.CARD_MOVE];
  const moveSound = sounds[AudioName.SHUFFLE];
  const soundRate = (moveSound.duration() * 1000) / duration;
  console.log("animShuffle duration: ", duration, "soundRate: ", soundRate);
  const moveSoundId = moveSound.play();
  moveSound.rate(soundRate, moveSoundId);
  dispatch(updateCardOne(setAnimPayload));
  await delay(duration);
  dispatch(updateCardOne(resetAnimPayload));
};

/////////////////////////////////////////////////////////////////////////////////

export const getResultTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  if (hours > 0) {
    const formattedHours = hours.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedMinutes}:${formattedSeconds}`;
  }
};

export const isValidStockClick = (state, stockId) => {
  const stockCardsIds = selectPileCardsIds(state, stockId);
  if (stockCardsIds?.length > 0) return true;
  const wasteId = selectWasteId(state);
  const wasteCardsIds = selectPileCardsIds(state, wasteId);
  if (wasteCardsIds?.length === 0) return false;
  return selectIsCanRedeals(state);
};

const getWasteToStockPayload = (wasteId, stockId, wasteCards) => ({
  type: moveEventsTypes.wasteToStock,
  fromPileId: wasteId,
  toPileId: stockId,
  cardsIds: [...wasteCards].reverse(),
});

const getStockToWastePayload = (state, stockId, wasteId, stockCards) => {
  const typeDealCards = gameStateTypes.deallingCardsCount;
  const activeDealing = selectGameCurrentDealing(state, typeDealCards);
  const cardsIds = getNTopCardsIds(stockCards, activeDealing);
  return {
    type: moveEventsTypes.stockToWaste,
    fromPileId: stockId,
    toPileId: wasteId,
    cardsIds: [...cardsIds].reverse(),
  };
};

export const getStockWasteMovePayload = (state, stockId) => {
  const wasteId = selectWasteId(state);
  const stockCards = selectPileCardsIds(state, stockId);
  const wasteCards = selectPileCardsIds(state, wasteId);
  if (wasteCards.length > 0 && stockCards.length === 0) {
    return getWasteToStockPayload(wasteId, stockId, wasteCards);
  }
  if (stockCards.length > 0) {
    return getStockToWastePayload(state, stockId, wasteId, stockCards);
  }
  return null;
};

export const getAllPoints = (state, pointsData, pileId, cardId) => {
  const allPoints = pointsData.isWithCardPoints
    ? pointsData.count + selectCardPoints(state, pileId, cardId)
    : pointsData.count;
  const operation = scoreOperations.increment;
  return { cardId, count: allPoints, operation };
};
