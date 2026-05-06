import { createSelector } from "@reduxjs/toolkit";
import {
  canMoveToFoundation,
  canMoveToTableau,
  getCardOffset2,
  getNTopCardsIds,
  getPrevCardId,
  getTopCardId,
  getTopCardsIds,
} from "../../../utils/deckUtils";
import {
  getCardPoints,
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

export const selectDeck = (state) => state.decks;

export const selectPiles = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.piles,
);

export const selectPile = createSelector(
  [(state) => selectPiles(state), (_, pileId) => pileId],
  (piles, pileId) => piles?.[pileId],
);

export const selectFoundations = createSelector(
  [(state) => selectPiles(state)],
  (piles) => {
    const foundationsIds = field_components_type_ids.foundations;
    return foundationsIds.map((id) => piles[id]);
  },
);

export const selectIsPileNotEmpty = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => pile?.cardsIds?.length > 0,
);

export const selectIsPileEmpty = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => pile?.cardsIds?.length === 0,
);

export const selectCardHintShowColor = createSelector(
  [(state, pileId, cardId) => selectCard(state, pileId, cardId)],
  (card) => card?.hintShowColor,
);

export const selectHintShowColorPileById = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => pile?.hintShowColor,
);

export const selectStockData = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.currentStock,
);

export const selectStockId = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.currentStockId,
);

export const selectStockRedeals = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.currentStock?.redeals,
);

export const selectWasteId = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.currentWasteId,
);

export const selectStockAndWasteEmpty = createSelector(
  [(state) => selectDeck(state)],
  (deck) => {
    const { currentStockId, currentWasteId } = deck;
    const stockPile = deck.piles[currentStockId];
    const wastePile = deck.piles[currentWasteId];
    const isStockEmpty = stockPile?.cardsIds?.length === 0;
    const isWasteEmpty = wastePile?.cardsIds?.length === 0;
    return isStockEmpty && isWasteEmpty;
  },
);

export const selectIsCanCardClick = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.isCanCardClick,
);

export const selectTableausShirtCardsIds = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.tableausShirtCardsIds || [],
);

export const selectFaceCardsIdsByPileId = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => {
    if (!pile) return [];
    return pile.cardsIds.filter(
      (cardId) => pile.cards[cardId]?.side === sides.face,
    );
  },
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

export const selectCardPoints = createSelector(
  [(state, pileid, cardId) => selectCard(state, pileid, cardId)],
  (card) => getCardPoints(card?.value),
);

export const selectTopCardIdByPileId = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => getTopCardId(pile?.cardsIds),
);

export const selectTopCardByPileId = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => {
    const topCardId = getTopCardId(pile?.cardsIds);
    return topCardId ? pile?.cards?.[topCardId] : null;
  },
);

export const selectOverlap = createSelector(
  [
    (state, pileId) => selectPile(state, pileId),
    (_, __, cardId) => cardId,
    (_, __, ___, height) => height,
  ],
  (pile, cardId, height) => getCardOffset2(cardId, pile, height),
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
    const topCard = pile.cards[getTopCardId(cardsIds)];
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

export const selectCanMoveToTableau = createSelector(
  [
    (state, pileId) => selectPile(state, pileId),
    (_, __, movingCard) => movingCard,
  ],
  (pile, movingCard) => canMoveToTableau(movingCard, pile),
);

export const selectMoveTopCardsTableauToTableau = createSelector(
  [
    (state) => selectPiles(state),
    (_, fromPileId) => fromPileId,
    (_, __, toPileId) => toPileId,
  ],
  (piles, fromPileId, toPileId) => {
    if (fromPileId === toPileId) return { isCanMove: false, data: {} };
    const fromPile = piles[fromPileId];
    const toPile = piles[toPileId];
    if (fromPile?.cardsIds?.length === 0) return { isCanMove: false, data: {} };
    const faceCardsIds = fromPile?.cardsIds?.filter(
      (cardId) => fromPile?.cards?.[cardId]?.side === sides.face,
    );
    const faceCards = faceCardsIds?.map((cardId) => fromPile?.cards?.[cardId]);
    if (!faceCardsIds?.length) {
      return { isCanMove: false, data: {} };
    }
    for (let i = 0; i < faceCards.length; i++) {
      let prevCard = null;
      const faceCard = faceCards[i];
      if (isAce(faceCard)) continue;
      const currentFaceCardsIdsLength = faceCardsIds.length - i;
      const isFirstFaceCard = faceCard.id === faceCardsIds[0];
      if (isFirstFaceCard) {
        const prevCardId = getPrevCardId(fromPile.cardsIds, faceCard.id);
        prevCard = fromPile.cards[prevCardId] || null;
      } else {
        prevCard = faceCards[i - 1] || null;
      }
      if (toPile?.cardsIds?.length === 0) {
        if (!isKing(faceCard)) return { isCanMove: false, data: {} };
        if (isFirstFaceCard && !prevCard) return { isCanMove: false, data: {} };
        if (isFirstFaceCard && prevCard?.side === sides.shirt) {
          return {
            isCanMove: true,
            data: {
              fromCardsIds: getNTopCardsIds(
                faceCardsIds,
                currentFaceCardsIdsLength,
              ),
              fromPileId,
              toPileId,
              toPileTopCardId: null,
            },
          };
        }
      }

      const toPileTopCardId = getTopCardId(toPile?.cardsIds);
      const toPileTopCard = toPile?.cards[toPileTopCardId];
      if (!toPileTopCardId || !toPileTopCard) {
        return { isCanMove: false, data: {} };
      }
      if (!isOppositeColor(faceCard, toPileTopCard)) {
        continue;
      }
      if (!isNextInSequence(faceCard, toPileTopCard)) {
        continue;
      }
      console.log("rrrrr1");
      if (isFirstFaceCard) {
        return {
          isCanMove: true,
          data: {
            fromCardsIds: getNTopCardsIds(
              faceCardsIds,
              currentFaceCardsIdsLength,
            ),
            fromPileId,
            toPileId,
            toPileTopCardId,
          },
        };
      }

      let isCanMoveFirstFaceCardToFoundation = false;
      const foundations = field_components_type_ids.foundations;
      for (const foundationId of foundations) {
        const foundationPile = piles[foundationId];
        if (foundationPile?.cardsIds?.length === 0) continue;
        const foundationPileTopCardId = getTopCardId(foundationPile?.cardsIds);
        const foundationPileTopCard =
          foundationPile?.cards[foundationPileTopCardId];
        if (!foundationPileTopCardId || !foundationPileTopCard) continue;
        if (!isSameSuit(prevCard, foundationPileTopCard)) continue;
        if (!isPreviousInSequence(prevCard, foundationPileTopCard)) continue;
        isCanMoveFirstFaceCardToFoundation = true;
        break;
      }
      if (!isCanMoveFirstFaceCardToFoundation) {
        return { isCanMove: false, data: {} };
      }
      return {
        isCanMove: true,
        data: {
          fromCardsIds: getNTopCardsIds(
            faceCardsIds,
            currentFaceCardsIdsLength,
          ),
          fromPileId,
          toPileId,
          toPileTopCardId,
        },
      };
    }
    return { isCanMove: false, data: {} };
  },
);

export const selectMoveStockCardsToFoundations = createSelector(
  [
    (state) => selectPiles(state),
    (_, stockId) => stockId,
    (_, __, wasteId) => wasteId,
  ],
  (piles, stockId, wasteId) => {
    const stockPile = piles[stockId];
    const wastePile = piles[wasteId];
    const foundationsIds = field_components_type_ids.foundations;
    const tableausIds = field_components_type_ids.tableaus;
    let cardsIdsForCircle = [];
    if (stockPile?.cardsIds?.length === 0) {
      if (wastePile?.cardsIds?.length === 0) {
        return { isCanMove: false, data: {} };
      }
      cardsIdsForCircle = wastePile.cardsIds;
    } else {
      if (wastePile?.cardsIds?.length === 0) {
        cardsIdsForCircle = stockPile.cardsIds;
      } else {
        cardsIdsForCircle = [...wastePile.cardsIds, ...stockPile.cardsIds];
      }
    }
    if (cardsIdsForCircle.length === 0) return { isCanMove: false, data: {} };
    for (const cardId of cardsIdsForCircle) {
      const card = wastePile?.cards?.[cardId] || stockPile?.cards?.[cardId];
      if (!card) return { isCanMove: false, data: {} };
      for (const foundationId of foundationsIds) {
        const foundationPile = piles[foundationId];
        if (foundationPile.cardsIds.length === 0) {
          if (!isAce(card)) continue;
          return {
            isCanMove: true,
            data: {
              fromCardId: card.id,
              fromPileId: stockId,
              toPileId: foundationId,
              toPileTopCardId: null,
            },
          };
        }
        const toPileTopCardId = getTopCardId(foundationPile.cardsIds);
        const toPileTopCard = foundationPile.cards[toPileTopCardId];
        if (!toPileTopCardId && !toPileTopCard) continue;
        if (!isSameSuit(card, toPileTopCard)) continue;
        if (!isPreviousInSequence(card, toPileTopCard)) continue;

        return {
          isCanMove: true,
          data: {
            fromCardId: card.id,
            fromPileId: stockId,
            toPileId: foundationId,
            toPileTopCardId: toPileTopCardId,
          },
        };
      }
      if (isAce(card)) continue;
      for (const tableauId of tableausIds) {
        const tableauPile = piles[tableauId];
        if (tableauPile.cardsIds.length === 0) {
          if (!isKing(card)) continue;
          return {
            isCanMove: true,
            data: {
              fromCardId: card.id,
              fromPileId: stockId,
              toPileId: tableauId,
              toPileTopCardId: null,
            },
          };
        }
        const toPileTopCardId = getTopCardId(tableauPile?.cardsIds);
        const toPileTopCard = tableauPile?.cards[toPileTopCardId];
        if (!toPileTopCardId || !toPileTopCard) continue;

        if (!isOppositeColor(card, toPileTopCard)) continue;

        if (!isNextInSequence(card, toPileTopCard)) continue;

        return {
          isCanMove: true,
          data: {
            fromCardId: card.id,
            fromPileId: stockId,
            toPileId: tableauId,
            toPileTopCardId: toPileTopCardId,
          },
        };
      }
    }

    return { isCanMove: false, data: {} };
  },
);

export const selectMoveDataTableauToTableaus = createSelector(
  [
    (state) => selectPiles(state),
    (state, fromTableauId) => selectPile(state, fromTableauId),
    (_, fromTableauId) => fromTableauId,
  ],
  (piles, fromTableau, fromTableauId) => {
    const isFromTableauEmpty = fromTableau.cardsIds.length === 0;
    if (isFromTableauEmpty) return { isCanMove: false, data: {} };
    const faceCardsIds = fromTableau.cardsIds.filter(
      (cardId) => fromTableau.cards[cardId]?.side === sides.face,
    );
    if (!faceCardsIds.length) return { isCanMove: false, data: {} };
    const faceCards = faceCardsIds.map((cardId) => fromTableau.cards[cardId]);
    const tableausIds = field_components_type_ids.tableaus;
    for (const faceCard of faceCards) {
      for (const toTableauId of tableausIds) {
        if (toTableauId === fromTableauId) continue;
        const pile = piles[toTableauId];
        const isCanMove = canMoveToTableau(faceCard, pile);
        if (!isCanMove) continue;
        const fromTopCardsIds = getTopCardsIds(
          faceCard.id,
          fromTableau.cardsIds,
        );
        if (pile.cardsIds.length === 0) {
          return {
            isCanMove,
            data: {
              hintsCardsIds: fromTopCardsIds,
              isToPile: true,
              fromCardId: faceCard.id,
              fromPileId: fromTableauId,
              toPileId: toTableauId,
            },
          };
        }
        return {
          isCanMove,
          data: {
            hintsCardsIds: fromTopCardsIds,
            isToPile: false,
            fromCardId: faceCard.id,
            fromPileId: fromTableauId,
            toPileId: toTableauId,
          },
        };
      }
    }
    return { isCanMove: false, data: {} };
  },
);

export const selectCanMoveToFoundation = createSelector(
  [
    (state, pileId) => selectPile(state, pileId),
    (_, __, movingCard) => movingCard,
  ],
  (pile, movingCard) => canMoveToFoundation(movingCard, pile),
);

export const selectMoveTopCardFromPileToFoundationPile = createSelector(
  [
    (state, fromPileId) => selectPile(state, fromPileId),
    (state, _, toPileId) => selectPile(state, toPileId),
    (_, fromPileId) => fromPileId,
    (_, __, toPileId) => toPileId,
  ],
  (fromPile, toPile, fromPileId, toPileId) => {
    if (fromPile.cardsIds === 0) return { isCanMove: false, data: {} };
    const fromPileTopCard = fromPile.cards[getTopCardId(fromPile.cardsIds)];
    if (!fromPileTopCard) return { isCanMove: false, data: {} };
    if (fromPileTopCard.side === sides.shirt) {
      return { isCanMove: false, data: {} };
    }
    const isFromPileFoundation =
      field_components_type_ids.foundations.includes(fromPileId);
    if (isFromPileFoundation) return { isCanMove: false, data: {} };
    if (toPile.cardsIds.length === 0) {
      if (!isAce(fromPileTopCard)) return { isCanMove: false, data: {} };
      return {
        isCanMove: true,
        data: {
          fromCardId: fromPileTopCard.id,
          fromPileId: fromPile.id,
          toPileId,
          toPileTopCardId: null,
        },
      };
    }
    const toPileTopCardId = getTopCardId(toPile.cardsIds);
    const toPileTopCard = toPile.cards[toPileTopCardId];
    if (!toPileTopCardId && !toPileTopCard)
      return { isCanMove: false, data: {} };
    if (!isSameSuit(fromPileTopCard, toPileTopCard)) {
      return { isCanMove: false, data: {} };
    }
    if (!isPreviousInSequence(fromPileTopCard, toPileTopCard)) {
      return { isCanMove: false, data: {} };
    }
    return {
      isCanMove: true,
      data: {
        fromCardId: fromPileTopCard.id,
        fromPileId: fromPile.id,
        toPileId,
        toPileTopCardId,
      },
    };
  },
);

export const selectMoveTopCardFromPileToTableauPile = createSelector(
  [
    (state, fromPileId) => selectPile(state, fromPileId),
    (state, _, toPileId) => selectPile(state, toPileId),
    (_, fromPileId) => fromPileId,
    (_, __, toPileId) => toPileId,
  ],
  (fromPile, toPile, fromPileId, toPileId) => {
    if (fromPile.cardsIds === 0) return { isCanMove: false, data: {} };
    const fromPileTopCard = fromPile.cards[getTopCardId(fromPile.cardsIds)];
    if (!fromPileTopCard) return { isCanMove: false, data: {} };
    if (fromPileTopCard.side === sides.shirt) {
      return { isCanMove: false, data: {} };
    }
    const isFromPileFoundation =
      field_components_type_ids.foundations.includes(fromPileId);
    if (isFromPileFoundation) return { isCanMove: false, data: {} };
    if (isAce(fromPileTopCard)) return { isCanMove: false, data: {} };
    if (toPile.cardsIds.length === 0) {
      if (!isKing(fromPileTopCard)) return { isCanMove: false, data: {} };
      return {
        isCanMove: true,
        data: {
          fromCardId: fromPileTopCard.id,
          fromPileId: fromPile.id,
          toPileId,
          toPileTopCardId: null,
        },
      };
    }
    const toPileTopCardId = getTopCardId(toPile.cardsIds);
    const toPileTopCard = toPile.cards[toPileTopCardId];
    if (!toPileTopCardId && !toPileTopCard)
      return { isCanMove: false, data: {} };
    if (!isOppositeColor(fromPileTopCard, toPileTopCard)) {
      return { isCanMove: false, data: {} };
    }
    if (!isNextInSequence(fromPileTopCard, toPileTopCard)) {
      return { isCanMove: false, data: {} };
    }
    return {
      isCanMove: true,
      data: {
        fromCardId: fromPileTopCard.id,
        fromPileId: fromPile.id,
        toPileId,
        toPileTopCardId,
      },
    };
  },
);

export const selectIsFoundationsCompleted = createSelector(
  [(state) => selectDeck(state)],
  (deck) => {
    const foundationsIds = field_components_type_ids.foundations;
    const callBack = (pileId) => deck.piles[pileId].cardsIds.length === 13;
    return foundationsIds.every(callBack);
  },
);

export const selectMovingCards = createSelector(
  [(state, pileId) => selectPile(state, pileId), (_, __, cardsIds) => cardsIds],
  (pile, cardsIds) => {
    if (!pile || !cardsIds) return [];
    return cardsIds.map((id) => pile.cards[id]);
  },
);

export const selectDraggingCards = createSelector(
  [(state, pileId) => selectPile(state, pileId), (_, cardId) => cardId],
  (pile, cardId) => {
    if (!pile || !cardId) return [];
    const draggingCardsIds = getTopCardsIds(cardId, pile.cardsIds);
    return draggingCardsIds?.map((id) => pile.cards[id]) || [];
  },
);

export const selectDraggingCardsIdsByPileId = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => {
    if (!pile) return [];
    return pile.cardsIds.filter((cardId) => pile.cards[cardId]?.isDragging);
  },
);

export const selectHintsShowingCardsIdsByPileId = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => {
    if (!pile) return [];
    return pile.cardsIds.filter((cardId) => pile.cards[cardId]?.hintShowColor);
  },
);

export const selectTableauHintsShowCardsIdsById = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => {
    if (!pile) return [];
    const hintsShowCarsIds = [];
    const restCardsIds = [];
    pile?.cardsIds.forEach((cardId) => {
      if (pile.cards[cardId]?.hintShowColor) {
        hintsShowCarsIds.push(cardId);
      } else {
        restCardsIds.push(cardId);
      }
    });
    return { hintsShowCarsIds, restCardsIds };
  },
);

export const selectFirstFaceCardByPileId = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => {
    if (!pile) return null;
    const cardsIds = pile.cardsIds;
    if (!cardsIds?.length) return null;
    const firstFaceCardId = cardsIds.find(
      (id) => pile.cards[id].side === sides.face,
    );
    if (!firstFaceCardId) return null;
    const isFirstCardId = cardsIds.indexOf(firstFaceCardId) === 0;
    return isFirstCardId ? null : pile.cards[firstFaceCardId];
  },
);
