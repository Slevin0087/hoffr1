import { createSelector } from "@reduxjs/toolkit";
import {
  getCardOffset,
  getTopCardId,
  getTopCardsIds,
} from "../../../utils/deckUtils";
import {
  isAce,
  isKing,
  isNextInSequence,
  isOppositeColor,
  isPreviousInSequence,
  isSameSuit,
} from "../../../utils/playingCardUtils";
import {
  field_components_types,
  field_components_type_ids,
} from "../../../Configs/FieldComponentsConfigs";
import { sides } from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";

const DEFAULT_OVERLAP = { overlapX: 0, overlapY: 0 };

export const selectDeck = (state) => {
  return state.decks.entities[state.decks.currentId];
};

export const selectPiles = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.piles,
);

export const selectStockId = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.currentStock?.id,
);

export const selectStockRedeals = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.currentStock?.redeals,
);

export const selectWasteId = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.currentWasteId,
);

export const selectIsCanCardClick = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.isCanCardClick,
);

export const selectIsEventsInDeck = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.isEventsInDeck,
);

export const selectPile = createSelector(
  [(state) => selectPiles(state), (_, pileId) => pileId],
  (piles, pileId) => piles[pileId],
);

export const selectPileCardsIds = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => pile?.cardsIds || [],
);

export const selectPileCards = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => pile?.cards || {},
);

export const selectCard = createSelector(
  [
    (state, pileId) => selectPileCards(state, pileId),
    (_, __, cardId) => cardId,
  ],
  (cards, cardId) => cards?.[cardId],
);

export const selectOverlap = createSelector(
  [
    (state, card) => selectPile(state, card?.pileId),
    (_, card) => card,
    (_, __, height) => height,
    (_, __, ___, isGhost) => isGhost,
  ],
  (pile, card, height, isGhost) => {
    if (!card || isGhost) return DEFAULT_OVERLAP;
    return getCardOffset(card, pile.cardsIds, pile.cards, height);
  },
);

export const selectCanMoveCardToPile = createSelector(
  [
    (state, pileId) => selectPile(state, pileId),
    (_, __, movingCard) => movingCard,
  ],
  (pile, movingCard) => {
    if (!movingCard || movingCard.side === sides.shirt) return false;
    const isFoundationType = pile.type === field_components_types.foundations;
    const foundationsIds = field_components_type_ids.foundations;
    const isFromFoundation = foundationsIds.includes(movingCard.pileId);
    if (isFoundationType && isFromFoundation) return false;
    const isTableauType = pile.type === field_components_types.tableaus;
    if (isTableauType && isAce(movingCard)) return false;
    const cardsIds = pile.cardsIds;
    if (cardsIds.length === 0) {
      if (isFoundationType) return isAce(movingCard);
      else if (isTableauType) return isKing(movingCard);
    }
    const topCardId = getTopCardId(cardsIds);
    const topCard = pile.cards[topCardId];
    if (isFoundationType) {
      return (
        isSameSuit(movingCard, topCard) &&
        isPreviousInSequence(movingCard, topCard)
      );
    } else if (isTableauType) {
      return (
        isOppositeColor(movingCard, topCard) &&
        isNextInSequence(movingCard, topCard)
      );
    }
  },
);

export const selectIsCardDragged = createSelector(
  [(state) => selectDeck(state), (_, cardId) => cardId],
  (deck, cardId) => !!deck.draggedCards[cardId],
);

export const selectMovingCards = createSelector(
  [(state, pileId) => selectPile(state, pileId), (_, __, cardsIds) => cardsIds],
  (pile, cardsIds) => {
    if (!pile || !cardsIds) return [];
    return cardsIds.map((id) => pile.cards[id]);
  },
);

export const selectDraggingCards = createSelector(
  [(state, card) => selectPile(state, card?.pileId), (_, card) => card?.id],
  (pile, cardId) => {
    if (!pile || !cardId) return [];
    const draggingCardsIds = getTopCardsIds(cardId, pile.cardsIds);
    if (!draggingCardsIds?.length) return [];
    return draggingCardsIds.map((id) => pile.cards[id]);
  },
);
