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
import { field_components_type_ids } from "../Configs/FieldComponentsConfigs";

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

export const getFaceCards = (pile) => {
  const callBack = (cardId) => pile?.cards?.[cardId]?.side === sides.face;
  const faceCardsIds = pile?.cardsIds?.filter(callBack) || [];
  const faceCards = faceCardsIds?.map((cardId) => pile?.cards?.[cardId]) || [];
  return { faceCardsIds, faceCards };
};

export const getFirstFaceCard = (pile) => {
  const callBack = (cardId) => pile?.cards?.[cardId]?.side === sides.face;
  const firstFaceCardId = pile?.cardsIds?.find(callBack) || null;
  const firstFaceCard = pile?.cards?.[firstFaceCardId] || null;
  return { firstFaceCardId, firstFaceCard };
};

export const createDeckAndShuffle = () => {
  const deck = createDeck();
  return shuffle(deck);
};

export const canMoveToFoundation = (
  card,
  foundationPile,
  isCheckSide = true,
) => {
  console.log('canMoveToFoundation, card: ', card, foundationPile?.id);
  if (!card?.pileId || !card?.side) return false;
  if (!foundationPile?.cardsIds || !foundationPile?.cards) return false;
  if (isCheckSide && card?.side === sides.shirt) return false;
  const isFoundation = field_components_type_ids.foundations.includes(
    card?.pileId,
  );
  if (isFoundation) return false;
  if (foundationPile?.cardsIds?.length === 0) {
    return isAce(card);
  }
  const topCardId = getTopCardId(foundationPile?.cardsIds);
  const topCard = foundationPile?.cards[topCardId];
  if (!topCardId || !topCard) return false;
  console.log('canMoveToFoundation, topCard: ', topCard);
  return canPlaceOnFoundation(card, topCard);
};

export const canMoveToTableau = (card, tableauPile, isCheckSide = true) => {
  if (isCheckSide && card?.side === sides.shirt) return false;
  if (card?.pileId === tableauPile?.id) return false;
  if (isAce(card)) return false;
  if (tableauPile.cardsIds?.length === 0) {
    return isKing(card);
  }
  const topCardId = getTopCardId(tableauPile.cardsIds);
  const topCard = tableauPile.cards[topCardId];
  if (!topCardId || !topCard) return false;
  return canPlaceOnTableau(card, topCard);
};

export const canPlaceOnTableau = (card1, card2) => {
  return isOppositeColor(card1, card2) && isNextInSequence(card1, card2);
};

export const canPlaceOnFoundation = (card1, card2) => {
  return isSameSuit(card1, card2) && isPreviousInSequence(card1, card2);
};
