import { selectPileCards } from "../Store/slices/decks/selectors";
import {
  createPlayingCard,
  isAce,
  isKing,
  isNextInSequence,
  isOppositeColor,
  isPreviousInSequence,
  isSameSuit,
} from "./playingCardUtils";
import {
  PLAYING_CARD_SUITS,
  PLAYING_CARD_VALUES,
  sides,
} from "../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import {
  field_components_default_state,
  field_components_type_ids,
  field_components_types,
} from "../Configs/FieldComponentsConfigs";
import { orientations } from "../Configs/UIConfigs";

// Создание колоды
export const createDeck = () => {
  const cards = [];
  for (const suit of Object.values(PLAYING_CARD_SUITS)) {
    for (const value of PLAYING_CARD_VALUES) {
      const card = createPlayingCard(suit, value);
      cards.push(card);
    }
  }
  return cards;
};

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const dealCard = (cards) => {
  if (cards.length === 0) return { cards: [], card: null };
  const newCards = [...cards];
  const card = newCards.pop();
  return { cards: newCards, card };
};

export const getNTopCardsIds = (cardsIds, n) => {
  return cardsIds.slice(-n);
};

export const getTopCards = (card, cards) => {
  const cardIndex = cards.indexOf(card);
  return cards.slice(cardIndex);
};

export const getTopCardsIds = (cardId, cardsIds) => {
  const cardIndex = cardsIds?.indexOf(cardId);
  return cardsIds?.slice(cardIndex);
};

export const getPrevTopCardId = (cardsIds) => {
  return cardsIds[cardsIds.length - 2];
};

export const getPrevCardId = (cardsIds, currentCardId) => {
  const faceCardIndex = cardsIds.indexOf(currentCardId);
  return cardsIds[faceCardIndex - 1] || null;
};

export const getTopCard = (cards) => {
  return cards[cards.length - 1];
};

export const getTopCardId = (cardsIds) => {
  if (!cardsIds?.length) return null;
  return cardsIds[cardsIds.length - 1] || null;
};

export const createDeckAndShuffle = () => {
  const deck = createDeck();
  return shuffle(deck);
};

export const canMoveToFoundation = (card, foundationPile) => {
  if (!card?.pileId || !card?.side) return false;
  if (!foundationPile?.cardsIds || !foundationPile?.cards) return false;
  if (card.side === sides.shirt) return false;
  const isFoundation = field_components_type_ids.foundations.includes(
    card.pileId,
  );
  if (isFoundation) return false;
  if (foundationPile.cardsIds.length === 0) {
    return isAce(card);
  }
  const topCardId = getTopCardId(foundationPile.cardsIds);
  if (!topCardId) return false;
  const topCard = foundationPile.cards[topCardId];
  if (!topCard) return false;
  return isSameSuit(card, topCard) && isPreviousInSequence(card, topCard);
};

export const canMoveToTableau = (card, tableauPile) => {
  if (card.side === sides.shirt) return false;
  if (isAce(card)) return false;
  if (tableauPile.cardsIds?.length === 0) {
    return isKing(card);
  }
  const topCardId = getTopCardId(tableauPile.cardsIds);
  console.log("canMoveToTableau topCardId: ", topCardId);
  if (!topCardId) return false;
  const topCard = tableauPile.cards[topCardId];
  console.log("canMoveToTableau topCard", topCard);
  return isOppositeColor(card, topCard) && isNextInSequence(card, topCard);
};

export const getPlayingCards = (state, pileId) => {
  const playingCards = selectPileCards(state, pileId);
  return playingCards.sort((a, b) => a.position - b.position);
};

export const canMoveMapping = {
  foundation: canMoveToFoundation,
  tableau: canMoveToTableau,
};

export const getCardOffset = (
  card,
  cardsIds,
  objCards,
  height = 0,
  isGhost = false,
) => {
  const result = { overlapX: 0, overlapY: 0 };
  const cardIdIndex = cardsIds?.indexOf(card.id);
  if (cardIdIndex === -1) return result;
  const pile = field_components_default_state[card.pileId];
  const pileType = pile?.type;
  const baseOverlap = pile?.overlap;
  const cardPosition = card?.position;
  switch (pileType) {
    case field_components_types.tableaus: {
      const { x, y } = getTableausOffset(
        cardIdIndex,
        cardsIds,
        objCards,
        baseOverlap,
        height,
        isGhost,
      );
      result.overlapX = x;
      result.overlapY = y;
      return result;
    }
    case field_components_types.wastes: {
      const cardsLength = cardsIds?.length;
      const positionFromEnd = cardsLength - 1 - cardPosition;
      const resultOverlap = height < 600 ? 2 : 1;
      result.overlapX =
        positionFromEnd < baseOverlap.maxVisibleCards
          ? (baseOverlap.x * positionFromEnd) / resultOverlap
          : baseOverlap.maxOverlapCardsX / resultOverlap;
      result.overlapY =
        positionFromEnd < baseOverlap.maxVisibleCards
          ? (baseOverlap.y * positionFromEnd) / resultOverlap
          : baseOverlap.maxOverlapCardsY / resultOverlap;
      return result;
    }
    case field_components_types.foundations: {
      const foundationsOverlap =
        height < 600 ? pile?.overlap.landscape : pile?.overlap.portrait;
      result.overlapX = foundationsOverlap.x * cardPosition;
      result.overlapY = foundationsOverlap.y * cardPosition;
      return result;
    }
    default:
      result.overlapX = baseOverlap.x * cardPosition;
      result.overlapY = baseOverlap.y * cardPosition;
      return result;
  }
};

export const getCardsFacesUpAndDown = (cards) => {
  let cardsFaceUp = [];
  let cardsFaceDown = [];
  cards.forEach((card) => {
    card.faceUp ? cardsFaceUp.push(card) : cardsFaceDown.push(card);
  });
  return { cardsFaceUp, cardsFaceDown };
};

export const getCardsOffsetAllY = (
  cardsFaceUpLength,
  cardsFaceDownLength,
  baseOffsetY,
  cardFaceUpDecrementY,
) => {
  let faceUpCardsAllOffsetY = 0;
  let faceDownCardsAllOffsetY = 0;
  for (let i = 0; i < cardsFaceUpLength; i++) {
    faceUpCardsAllOffsetY += i * baseOffsetY;
  }
  for (let i = 0; i < cardsFaceDownLength; i++) {
    faceDownCardsAllOffsetY += i * (baseOffsetY - cardFaceUpDecrementY);
  }
  return { faceUpCardsAllOffsetY, faceDownCardsAllOffsetY };
};

export const getTableausOffset = (
  cardIdIndex,
  cardsIds,
  objCards,
  baseOverlap,
  windowHeight,
  isGhost = false,
) => {
  const cardSideShirtDecrementY = windowHeight < 600 ? 15 : 10;
  const cardSideFaceIncrementY = windowHeight < 600 ? -10 : 2;
  const result = { x: 0, y: 0 };
  for (let i = 0; i <= cardIdIndex; i++) {
    const sideShirtY = baseOverlap.y - cardSideShirtDecrementY;
    const sideFaceY = baseOverlap.y + cardSideFaceIncrementY;
    const prevCard = objCards[cardsIds[i - 1]];
    if (prevCard) {
      const isSideFace = prevCard.side === sides.face;
      const resultSideFaceY = isSideFace ? sideFaceY : sideShirtY;
      result.x += isGhost ? 0 : baseOverlap.x * i;
      result.y += resultSideFaceY;
    }
  }
  return result;
};

export const splitTableauCardsForDrag = (cards, draggedCard) => {
  if (!cards?.length && !draggedCard?.id) {
    return {
      cardsAbove: [],
      cardsBelow: [],
    };
  }
  if (!draggedCard) {
    return {
      cardsAbove: cards,
      cardsBelow: [],
    };
  }
  const index = cards.findIndex((card) => card.id === draggedCard.id);
  if (cards && index === -1) {
    return {
      cardsAbove: cards,
      cardsBelow: [],
    };
  }
  return {
    cardsAbove: cards.slice(0, index),
    cardsBelow: cards.slice(index),
    draggedIndex: index,
  };
};

export const getCanMoveCardToPileEmpty = (card, emptyPileType, emptyPileId) => {
  if (!card || !emptyPileId) return false;
  if (card.side === sides.shirt) return false;
  if (emptyPileType === field_components_types.foundations) {
    return isAce(card);
  } else if (emptyPileType === field_components_types.tableaus) {
    return isKing(card);
  }
};

export const calculateHintShowTableauCard = (
  hintsShowCarsIds,
  pileId,
  height,
) => {
  const orientation =
    height >= 600 ? orientations.portrait : orientations.landscape;
  const pileConfig = field_components_default_state[pileId];
  const overlapConfig = pileConfig?.overlap;
  const config = overlapConfig[orientation];
  const offsets = {};

  let accumulatedX = 0;
  let accumulatedY = 0;
  for (let i = 0; i < hintsShowCarsIds.length; i++) {
    const cardId = hintsShowCarsIds[i];
    offsets[cardId] = { x: accumulatedX, y: accumulatedY };
    accumulatedX += config.x;
    accumulatedY += config.faceY;
  }

  return offsets;
};

export const calculateAllPileOffsets = (pile, height) => {
  const offsets = {};
  if (!pile?.cardsIds?.length) return offsets;

  const orientation =
    height >= 600 ? orientations.portrait : orientations.landscape;
  const pileConfig = field_components_default_state[pile.id];
  const overlapConfig = pileConfig?.overlap;
  if (!overlapConfig) {
    pile.cardsIds.forEach((id) => {
      offsets[id] = { x: 0, y: 0 };
    });
    return offsets;
  }

  let accumulatedX = 0;
  let accumulatedY = 0;

  switch (pile.type) {
    case field_components_types.tableaus: {
      const config = overlapConfig[orientation];
      for (let i = 0; i < pile.cardsIds.length; i++) {
        const cardId = pile.cardsIds[i];
        offsets[cardId] = { x: accumulatedX, y: accumulatedY };
        const card = pile.cards[cardId];
        accumulatedX += config.x;
        accumulatedY += card.side === sides.face ? config.faceY : config.shirtY;
      }
      break;
    }

    case field_components_types.wastes: {
      const config = overlapConfig[orientation];
      const totalCards = pile.cardsIds.length;
      const cardsToShow = config.maxVisibleCards;
      const hiddenOffsetX = config.maxOverlapCardsX;
      const hiddenOffsetY = config.maxOverlapCardsY;
      for (let i = totalCards - 1; i >= 0; i--) {
        const cardId = pile.cardsIds[i];
        const indexFromEnd = totalCards - 1 - i;
        if (indexFromEnd >= cardsToShow) {
          offsets[cardId] = { x: hiddenOffsetX, y: hiddenOffsetY };
        } else {
          offsets[cardId] = {
            x: indexFromEnd * config.x,
            y: indexFromEnd * config.y,
          };
        }
      }
      break;
    }

    default: {
      const config = overlapConfig[orientation];
      pile.cardsIds.forEach((cardId, i) => {
        offsets[cardId] = { x: i * config.x, y: i * config.y };
      });
      break;
    }
  }

  return offsets;
};

export const getCardOffset2 = (cardId, pile, height = 0) => {
  if (!cardId || !pile) return { x: 0, y: 0 };
  // Рассчитываем смещения для всей стопки и берем нужное
  const allOffsets = calculateAllPileOffsets(pile, height);
  const offset = allOffsets[cardId] || { x: 0, y: 0 };
  return { x: offset.x, y: offset.y };
};
