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

// Взятие карты из колоды
export const dealCard = (cards) => {
  if (cards.length === 0) return { cards: [], card: null };
  const newCards = [...cards];
  const card = newCards.pop();
  return { cards: newCards, card };
};

// Получить верхние n карт
// export const getTopCards = (cards, n) => {
//   return cards.slice(-n);
// };

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

export const getTopCard = (cards) => {
  return cards[cards.length - 1];
};

export const getTopCardId = (cardsIds) => {
  return cardsIds[cardsIds.length - 1];
};

export const createDeckAndShuffle = () => {
  const deck = createDeck();
  return shuffle(deck);
};

export const canMoveToFoundation = (card, foundationCards) => {
  if (card.side === sides.shirt) return false;
  const isFoundation = field_components_type_ids.foundations.includes(
    card.pileId,
  );
  if (isFoundation) return false;
  if (foundationCards.length === 0) {
    return isAce(card);
  }
  const topCard = getTopCard(foundationCards);
  return isSameSuit(card, topCard) && isPreviousInSequence(card, topCard);
};

export const canMoveToTableau = (card, tableauCards) => {
  if (card.side === sides.shirt) return false;
  if (isAce(card)) return false;
  if (tableauCards.length === 0) {
    return isKing(card);
  }
  const topCard = getTopCard(tableauCards);
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

export const getCardOffset = (card, cardsIds, objCards, height = 0) => {
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
    default:
      result.overlapX = baseOverlap.x * cardPosition;
      result.overlapY = baseOverlap.y * cardPosition;
      return result;
  }
};

// export const getCardOffset = (id, type, card, cards, height = 0) => {
//   const cardIndex = cards.indexOf(card);
//   if (cardIndex === -1) return { x: 0, y: 0 };
//   const pile = field_components_default_state[type];
//   const baseOverlap = pile.entities[id].overlap;
//   const cardPosition = card.position;
//   const result = { x: baseOverlap.x, y: baseOverlap.y };
//   switch (type) {
//     case field_components_types.tableaus: {
//       const { x, y } = getTableausOffset(cardIndex, cards, baseOverlap, height);
//       result.x = x;
//       result.y = y;
//       return result;
//     }
//     case field_components_types.wastes: {
//       const cardsLength = cards.length;
//       const positionFromEnd = cardsLength - 1 - cardPosition;
//       const resultOverlap = height < 600 ? 2 : 1;
//       result.x =
//         positionFromEnd < baseOverlap.maxVisibleCards
//           ? (baseOverlap.x * positionFromEnd) / resultOverlap
//           : baseOverlap.maxOverlapCardsX / resultOverlap;
//       result.y =
//         positionFromEnd < baseOverlap.maxVisibleCards
//           ? (baseOverlap.y * positionFromEnd) / resultOverlap
//           : baseOverlap.maxOverlapCardsY / resultOverlap;
//       return result;
//     }
//     default:
//       result.x = baseOverlap.x * cardPosition;
//       result.y = baseOverlap.y * cardPosition;
//       return result;
//   }
// };

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
) => {
  const cardSideShirtDecrementY = windowHeight < 600 ? 15 : 10;
  const cardSideFaceIncrementY = windowHeight < 600 ? -10 : 2;
  // console.log("cardSideShirtDecrementY: ", cardSideShirtDecrementY);

  const result = { x: 0, y: 0 };
  for (let i = 0; i <= cardIdIndex; i++) {
    const sideShirtY = baseOverlap.y - cardSideShirtDecrementY;
    const sideFaceY = baseOverlap.y + cardSideFaceIncrementY;
    const prevCard = objCards[cardsIds[i - 1]];
    if (prevCard) {
      const isSideFace = prevCard.side === sides.face;
      const resultSideFaceY = isSideFace ? sideFaceY : sideShirtY;
      result.x += baseOverlap.x * i;
      result.y += resultSideFaceY;
    }
  }
  return result;
};

// export const getTableausOffset = (
//   cardIndex,
//   cards,
//   baseOverlap,
//   windowHeight,
// ) => {
//   const cardFaceDownDecrementY = windowHeight < 600 ? 15 : 10;
//   const cardFaceUpIncrementY = windowHeight < 600 ? -10 : 2;
//   // console.log("cardFaceDownDecrementY: ", cardFaceDownDecrementY);

//   const initialValue = { x: 0, y: 0 };
//   for (let i = 0; i <= cardIndex; i++) {
//     const faceDounY = baseOverlap.y - cardFaceDownDecrementY;
//     const faceUpY = baseOverlap.y + cardFaceUpIncrementY;
//     const prevCard = cards[i - 1];
//     if (prevCard) {
//       const resultFaceUpY = prevCard.faceUp ? faceUpY : faceDounY;
//       initialValue.x += baseOverlap.x * i;
//       initialValue.y += resultFaceUpY;
//     }
//   }
//   return initialValue;
// };

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
