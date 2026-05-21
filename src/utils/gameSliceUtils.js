import {
  gameStateTypes,
  moveEventsTypes,
  scoreOperations,
} from "../Configs/GameConfigs";
import { AudioName } from "../Services/soundService";
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
import { getAnimationDuration } from "./playingCardUtils";

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

/////////////////////////////////////////////////////////////////////////////
export const getSetAnimationData = (cardId, pileId, name, type) => {
  const data = { name, type };
  const changes = { isAnimating: true, activeAnimations: [data] };
  console.log('getSetAnimationData, data: ', data, 'changes: ', changes);
  return { pileId, cardId, changes };
};

export const getResetAnimationData = (pileId, cardId) => {
  const changes = { isAnimating: false, activeAnimations: [] };
  return { pileId, cardId, changes };
};

export const animationCard = async (
  dispatch,
  cardId,
  pileId,
  animationName,
  animationType,
) => {
  console.log('animationCard');
  const setAnimPayload = getSetAnimationData(
    cardId,
    pileId,
    animationName,
    animationType,
  );
  const duration = getAnimationDuration(animationName, animationType);
  const resetAnimPayload = getResetAnimationData(pileId, cardId);
  console.log('animationCard updateCardOne1');
  dispatch(updateCardOne(setAnimPayload));
  await delay(duration);
  console.log('animationCard updateCardOne2');
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
