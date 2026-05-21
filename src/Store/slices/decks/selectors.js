import { createSelector } from "@reduxjs/toolkit";
import {
  canMoveToFoundation,
  canMoveToTableau,
  canPlaceOnTableau,
  getFaceCards,
  getFirstFaceCard,
  getNTopCardsIds,
  getPrevCardId,
  getTopCardId,
  getTopCardsIds,
} from "../../../utils/deckUtils";
import { getCardPoints } from "../../../utils/playingCardUtils";
import { field_components_type_ids } from "../../../Configs/FieldComponentsConfigs";
import { sides } from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { dealingCounts } from "../../../Configs/GameConfigs";

export const selectDeck = (state) => state.decks;

export const selectPiles = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.piles,
);

export const selectPile = createSelector(
  [(state) => selectPiles(state), (_, pileId) => pileId],
  (piles, pileId) => piles?.[pileId],
);

export const selectIsPileEmpty = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => pile?.cardsIds?.length === 0,
);

export const selectIsHintShowPileById = createSelector(
  [(state, pileId) => selectPile(state, pileId)],
  (pile) => pile?.isHintShowing,
);

export const selectStockId = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.currentStockId,
);

export const selectStockRedeals = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.currentStock?.redeals,
);

export const selectStock = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.piles?.[deck?.currentStockId],
);

export const selectWasteId = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.currentWasteId,
);

export const selectWaste = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.piles?.[deck?.currentWasteId],
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

export const selectHasStockMoreOneCardId = createSelector(
  [(state) => selectStock(state)],
  (stock) => stock?.cardsIds?.length > 1,
);

export const selectHasWasteMoreOneCardId = createSelector(
  [(state) => selectWaste(state)],
  (waste) => waste?.cardsIds?.length > 1,
);

export const selectIsTableausShirtCardsEmpty = createSelector(
  [(state) => selectDeck(state)],
  (deck) => deck?.tableausShirtCardsIds?.length === 0,
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

export const selectCardMove = createSelector(
  [(state) => selectPiles(state), (_, movingCard) => movingCard],
  (piles, movingCard) => {
    console.log("selectCardMove movingCard: ", movingCard);
    if (!movingCard || movingCard?.side === sides.shirt) {
      return { isCanMove: false, data: {} };
    }
    const currentCardId = movingCard?.id;
    const fromPileId = movingCard?.pileId;
    const fromPile = piles[fromPileId];
    if (!fromPile?.cardsIds?.length) {
      return { isCanMove: false, data: {} };
    }
    const movingCardsIds = getTopCardsIds(movingCard?.id, fromPile?.cardsIds);

    if (movingCardsIds?.length === 0) return { isCanMove: false, data: {} };
    const foundationsIds = field_components_type_ids.foundations;
    const tableausIds = field_components_type_ids.tableaus;

    if (movingCardsIds?.length > 1) {
      for (const tableauId of tableausIds) {
        const toPile = piles[tableauId];
        if (!canMoveToTableau(movingCard, toPile)) continue;
        return {
          isCanMove: true,
          data: {
            currentCardId,
            toPileId: tableauId,
            cardsIds: movingCardsIds,
            fromPileId,
          },
        };
      }
      return {
        isCanMove: false,
        data: {
          cardsIds: movingCardsIds,
          fromPileId,
        },
      };
    } else if (movingCardsIds?.length === 1) {
      let resultFoundationId = null;
      let resultTableauId = null;

      for (const id of foundationsIds) {
        if (canMoveToFoundation(movingCard, piles[id])) {
          resultFoundationId = id;
          break;
        }
      }
      for (const id of tableausIds) {
        if (canMoveToTableau(movingCard, piles[id])) {
          resultTableauId = id;
          break;
        }
      }

      if (resultFoundationId && !resultTableauId) {
        return {
          isCanMove: true,
          data: {
            currentCardId,
            toPileId: resultFoundationId,
            cardsIds: movingCardsIds,
            fromPileId,
          },
        };
      }

      if (!resultFoundationId && resultTableauId) {
        return {
          isCanMove: true,
          data: {
            currentCardId,
            toPileId: resultTableauId,
            cardsIds: movingCardsIds,
            fromPileId,
          },
        };
      }

      if (resultFoundationId && resultTableauId) {
        let hasOtherCardToMove = false;

        for (const tableauId of tableausIds) {
          if (tableauId === resultTableauId) continue;
          if (tableauId === fromPileId) continue;

          const tableau = piles[tableauId];
          if (!tableau?.cardsIds?.length) continue;

          for (const cardId of tableau.cardsIds) {
            const card = tableau.cards[cardId];
            if (card.side === sides.shirt) continue;
            if (canPlaceOnTableau(card, movingCard)) {
              const prevCardId = getPrevCardId(tableau.cardsIds, cardId);
              const prevCard = tableau.cards[prevCardId];
              if (prevCard?.side === sides.shirt) hasOtherCardToMove = true;
              break;
            }
          }
          if (hasOtherCardToMove) break;
        }

        const toPileId = hasOtherCardToMove
          ? resultTableauId
          : resultFoundationId;
        return {
          isCanMove: true,
          data: {
            currentCardId,
            toPileId,
            cardsIds: movingCardsIds,
            fromPileId,
          },
        };
      }
    }
    return {
      isCanMove: false,
      data: {
        cardsIds: movingCardsIds,
        fromPileId,
      },
    };
  },
);

export const selectMoveTopCardsTableauToTableau = createSelector(
  [
    (state) => selectPiles(state),
    (_, fromPileId) => fromPileId,
    (_, __, toPileId) => toPileId,
  ],
  (piles, fromPileId, toPileId) => {
    if (fromPileId === toPileId) return { isCanMove: false, data: {} };
    const fromPile = piles?.[fromPileId];
    const toPile = piles?.[toPileId];
    const isFromTableauEmpty = fromPile?.cardsIds?.length === 0;
    const isToTableauEmpty = toPile?.cardsIds?.length === 0;
    if (isFromTableauEmpty) return { isCanMove: false, data: {} };

    const { faceCardsIds, faceCards } = getFaceCards(fromPile);
    if (!faceCardsIds?.length) return { isCanMove: false, data: {} };

    for (let i = 0; i < faceCards?.length; i++) {
      const faceCard = faceCards[i];
      const faceCardsIdsLength = faceCardsIds.length - i;
      const topCardsIds = getNTopCardsIds(faceCardsIds, faceCardsIdsLength);

      const isFirstFaceCard = faceCard?.id === faceCardsIds[0];

      const prevCardId = getPrevCardId(fromPile?.cardsIds, faceCard?.id);
      const prevCard = fromPile?.cards?.[prevCardId] || null;

      if (!canMoveToTableau(faceCard, toPile)) continue;

      if (isToTableauEmpty) {
        if (prevCard?.side !== sides.shirt) {
          return { isCanMove: false, data: {} };
        }
        return {
          isCanMove: true,
          data: {
            fromCardsIds: topCardsIds,
            fromPileId,
            toPileId,
            toPileTopCardId: null,
          },
        };
      }

      const toPileTopCardId = getTopCardId(toPile?.cardsIds);

      if (isFirstFaceCard) {
        console.log("if (isFirstFaceCard): ", topCardsIds, fromPileId);
        return {
          isCanMove: true,
          data: {
            fromCardsIds: topCardsIds,
            fromPileId,
            toPileId,
            toPileTopCardId,
          },
        };
      }

      const foundations = field_components_type_ids.foundations;

      for (const foundationId of foundations) {
        const foundationPile = piles?.[foundationId];
        const isCanMovePrevCardToFoundation = canMoveToFoundation(
          prevCard,
          foundationPile,
        );
        if (!isCanMovePrevCardToFoundation) continue;
        return {
          isCanMove: true,
          data: {
            fromCardsIds: topCardsIds,
            fromPileId,
            toPileId,
            toPileTopCardId,
          },
        };
      }
    }
    return { isCanMove: false, data: {} };
  },
);

export const selectEasyMoveToFoundations = createSelector(
  [
    (state) => selectPiles(state),
    (_, fromPileId) => fromPileId,
    (_, __, foundationId) => foundationId,
  ],
  (piles, fromPileId, foundationId) => {
    const fromPile = piles[fromPileId];
    const foundation = piles[foundationId];
    console.log(
      "selectEasyMoveToFoundations fromPile, foundation: ",
      fromPile,
      foundation,
    );
    if (fromPile.cardsIds === 0) return { isCanMove: false, data: {} };
    const fromPileTopCardId = getTopCardId(fromPile.cardsIds);
    const fromPileTopCard = fromPile.cards[fromPileTopCardId];
    console.log(
      "canMoveToFoundation(fromPileTopCard, foundation): ",
      canMoveToFoundation(fromPileTopCard, foundation),
      fromPileTopCard,
    );
    if (!canMoveToFoundation(fromPileTopCard, foundation)) {
      return { isCanMove: false, data: {} };
    }

    console.log("afterrrrrrrrrrrrrr");

    return {
      isCanMove: true,
      data: { movingCardId: fromPileTopCard.id },
    };
  },
);

export const selectMoveStockCardsToFoundations = createSelector(
  [
    (state) => selectPiles(state),
    (_, stockId) => stockId,
    (_, __, wasteId) => wasteId,
    (_, __, ___, dealingCount) => dealingCount,
  ],
  (piles, stockId, wasteId, dealingCount) => {
    let cardsIdsForCircle = [];
    const stockPile = piles[stockId];
    const wastePile = piles[wasteId];
    const foundationsIds = field_components_type_ids.foundations;
    const tableausIds = field_components_type_ids.tableaus;
    const isDealingThree = dealingCount === dealingCounts.three;
    const isStockEmpty = stockPile?.cardsIds?.length === 0;
    const isWasteEmpty = wastePile?.cardsIds?.length === 0;
    if (isStockEmpty && isWasteEmpty) return { isCanMove: false, data: {} };
    if (isStockEmpty && !isWasteEmpty) {
      cardsIdsForCircle = isDealingThree
        ? [...wastePile.cardsIds].reverse()
        : wastePile.cardsIds;
    } else if (!isStockEmpty && isWasteEmpty) {
      cardsIdsForCircle = stockPile.cardsIds;
    } else if (!isStockEmpty && !isWasteEmpty) {
      const wastePileCardsIdsReverse = [...wastePile.cardsIds].reverse();
      cardsIdsForCircle = [...stockPile.cardsIds, ...wastePileCardsIdsReverse];
    }

    console.log(
      "selectMoveStockCardsToFoundations cardsIdsForCircle: ",
      cardsIdsForCircle,
    );

    if (cardsIdsForCircle.length === 0) return { isCanMove: false, data: {} };
    const step = isDealingThree ? 3 : 1;
    for (let i = cardsIdsForCircle.length - step; i >= 0; i -= step) {
      let cardId = cardsIdsForCircle[i];
      const hasRemainder = cardsIdsForCircle.length % step !== 0;
      if (isDealingThree && hasRemainder) {
        cardId = cardsIdsForCircle[i + 1];
      }
      const card = wastePile?.cards?.[cardId] || stockPile?.cards?.[cardId];
      console.log("selectMoveStockCardsToFoundations card: ", card);
      if (!card) return { isCanMove: false, data: {} };
      for (const foundationId of foundationsIds) {
        const foundationPile = piles[foundationId];
        if (!canMoveToFoundation(card, foundationPile, false)) continue;
        const isFoundationEmpty = foundationPile?.cardsIds?.length === 0;
        const toPileTopCardId = isFoundationEmpty
          ? null
          : getTopCardId(foundationPile?.cardsIds);
        return {
          isCanMove: true,
          data: {
            fromCardId: card.id,
            fromPileId: stockId,
            toPileId: foundationId,
            toPileTopCardId,
          },
        };
      }
      for (const tableauId of tableausIds) {
        const tableauPile = piles[tableauId];
        if (!canMoveToTableau(card, tableauPile, false)) continue;
        const isTableauEmpty = tableauPile?.cardsIds?.length === 0;
        const toPileTopCardId = isTableauEmpty
          ? null
          : getTopCardId(tableauPile?.cardsIds);
        return {
          isCanMove: true,
          data: {
            fromCardId: card.id,
            fromPileId: stockId,
            toPileId: tableauId,
            toPileTopCardId,
          },
        };
      }
    }

    return { isCanMove: false, data: {} };
  },
);

export const selectMoveWasteTopCard = createSelector(
  [(state) => selectPiles(state), (_, wasteId) => wasteId],
  (piles, wasteId) => {
    const wastePile = piles[wasteId];
    const isWasteEmpty = wastePile?.cardsIds?.length === 0;
    if (isWasteEmpty) return { isCanMove: false, data: {} };

    const wasteTopCardId = getTopCardId(wastePile?.cardsIds);
    const wasteTopCard = wastePile?.cards?.[wasteTopCardId];

    let resultFoundationId = null;
    let resultTableauId = null;
    let toPileTopCardId = null;

    const foundationsIds = field_components_type_ids.foundations;
    const tableausIds = field_components_type_ids.tableaus;

    for (const id of foundationsIds) {
      if (canMoveToFoundation(wasteTopCard, piles[id])) {
        resultFoundationId = id;
        break;
      }
    }

    for (const id of tableausIds) {
      if (canMoveToTableau(wasteTopCard, piles[id])) {
        resultTableauId = id;
        break;
      }
    }
    if (resultFoundationId && !resultTableauId) {
      const resultFoundation = piles[resultFoundationId];
      if (resultFoundation?.cardsIds?.length > 0) {
        toPileTopCardId = getTopCardId(resultFoundation?.cardsIds);
      }
      return {
        isCanMove: true,
        data: {
          fromCardId: wasteTopCardId,
          fromPileId: wasteId,
          toPileId: resultFoundationId,
          toPileTopCardId,
        },
      };
    }

    if (!resultFoundationId && resultTableauId) {
      const resultTableau = piles[resultTableauId];
      if (resultTableau?.cardsIds?.length > 0) {
        toPileTopCardId = getTopCardId(resultTableau?.cardsIds);
      }
      return {
        isCanMove: true,
        data: {
          fromCardId: wasteTopCardId,
          fromPileId: wasteId,
          toPileId: resultTableauId,
          toPileTopCardId,
        },
      };
    }
    console.log("selectMoveWasteTopCard");

    if (resultFoundationId && resultTableauId) {
      let hasOtherCardToMove = false;

      for (const tableauId of tableausIds) {
        if (tableauId === resultTableauId) continue;

        const tableau = piles[tableauId];
        if (!tableau?.cardsIds?.length) continue;

        for (const cardId of tableau.cardsIds) {
          const card = tableau.cards[cardId];
          if (card.side === sides.shirt) continue;
          if (canPlaceOnTableau(card, wasteTopCard)) {
            const prevCardId = getPrevCardId(tableau.cardsIds, cardId);
            const prevCard = tableau.cards[prevCardId];
            if (prevCard?.side === sides.shirt) hasOtherCardToMove = true;
            break;
          }
        }
        if (hasOtherCardToMove) break;
      }

      const toPileId = hasOtherCardToMove
        ? resultTableauId
        : resultFoundationId;

      const toPile = piles[toPileId];

      if (toPile?.cardsIds?.length > 0) {
        toPileTopCardId = getTopCardId(toPile?.cardsIds);
      }

      return {
        isCanMove: true,
        data: {
          fromCardId: wasteTopCardId,
          fromPileId: wasteId,
          toPileId,
          toPileTopCardId,
        },
      };
    }
    return { isCanMove: false, data: {} };
  },
);

export const selectCanMoveTableauToFoundation = createSelector(
  [
    (state) => selectPiles(state),
    (_, fromTableauId) => fromTableauId,
    (_, __, fromFoundationId) => fromFoundationId,
  ],
  (piles, fromTableauId, fromFoundationId) => {
    const fromPile = piles[fromTableauId];
    const toPile = piles[fromFoundationId];

    if (fromPile.cardsIds === 0) return { isCanMove: false, data: {} };
    const fromPileTopCardId = getTopCardId(fromPile.cardsIds);
    const fromPileTopCard = fromPile.cards[fromPileTopCardId];

    if (!canMoveToFoundation(fromPileTopCard, toPile)) {
      return { isCanMove: false, data: {} };
    }

    const isFoundationEmpty = toPile?.cardsIds?.length === 0;
    if (isFoundationEmpty) {
      return {
        isCanMove: true,
        data: {
          fromCardId: fromPileTopCard.id,
          fromPileId: fromPile.id,
          toPileId: toPile.id,
          toPileTopCardId: null,
        },
      };
    }

    const toPileTopCardId = getTopCardId(toPile?.cardsIds);

    const tableausIds = field_components_type_ids.tableaus;

    for (const toTableauId of tableausIds) {
      const tableauPile = piles[toTableauId];
      if (toTableauId === fromTableauId) continue;
      for (const cardId of tableauPile.cardsIds) {
        const card = tableauPile.cards[cardId];
        if (card.side === sides.shirt) continue;
        if (canPlaceOnTableau(card, fromPileTopCard)) {
          const prevCardId = getPrevCardId(tableauPile.cardsIds, cardId);
          const prevCard = tableauPile.cards[prevCardId];
          if (prevCard?.side === sides.shirt) {
            return { isCanMove: false, data: {} };
          }
        }
      }
    }

    return {
      isCanMove: true,
      data: {
        fromCardId: fromPileTopCard.id,
        fromPileId: fromPile.id,
        toPileId: toPile.id,
        toPileTopCardId,
      },
    };
  },
);

export const selectMoveTopCardToFoundation = createSelector(
  [
    (state) => selectPiles(state),
    (_, fromPileId) => fromPileId,
    (_, __, toPileId) => toPileId,
  ],
  (piles, fromPileId, toPileId) => {
    const fromPile = piles[fromPileId];
    const toPile = piles[toPileId];
    if (fromPile.cardsIds === 0) return { isCanMove: false, data: {} };
    const fromPileTopCardId = getTopCardId(fromPile.cardsIds);
    const fromPileTopCard = fromPile.cards[fromPileTopCardId];

    if (!canMoveToFoundation(fromPileTopCard, toPile)) {
      return { isCanMove: false, data: {} };
    }

    const isFoundationEmpty = toPile?.cardsIds?.length === 0;
    if (isFoundationEmpty) {
      return {
        isCanMove: true,
        data: { movingCardId: fromPileTopCardId },
      };
    }

    const tableausIds = field_components_type_ids.tableaus;

    const isFromPileTableau =
      field_components_type_ids.tableaus.includes(fromPileId);
    const isFromPileWaste =
      field_components_type_ids.wastes.includes(fromPileId);

    let hasPrevShirtCard = false;

    for (const toTableauId of tableausIds) {
      const tableauPile = piles[toTableauId];
      if (toTableauId === fromPileId) continue;
      for (const cardId of tableauPile.cardsIds) {
        const card = tableauPile.cards[cardId];
        if (card.side === sides.shirt) continue;
        if (canPlaceOnTableau(card, fromPileTopCard)) {
          const prevCardId = getPrevCardId(tableauPile.cardsIds, cardId);
          const prevCard = tableauPile.cards[prevCardId];
          if (prevCard?.side === sides.shirt) {
            hasPrevShirtCard = true;
            break;
          }
        }
      }
    }

    if (hasPrevShirtCard) {
      if (isFromPileTableau) return { isCanMove: false, data: {} };
      if (isFromPileWaste) {
        for (const toTableauId of tableausIds) {
          const tableauPile = piles[toTableauId];
          if (canMoveToTableau(fromPileTopCard, tableauPile)) {
            return { isCanMove: false, data: {} };
          }
        }
      }
    }

    return { isCanMove: true, data: { movingCardId: fromPileTopCardId } };
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
    const fromPileTopCardId = getTopCardId(fromPile.cardsIds);
    const fromPileTopCard = fromPile.cards[fromPileTopCardId];
    const isFromPileFoundation =
      field_components_type_ids.foundations.includes(fromPileId);
    if (isFromPileFoundation) return { isCanMove: false, data: {} };
    if (!canMoveToTableau(fromPileTopCard, toPile)) {
      return {
        isCanMove: false,
        data: {},
      };
    }

    const isToTableauPileEmpty = toPile.cardsIds.length === 0;
    const toPileTopCardId = isToTableauPileEmpty
      ? null
      : getTopCardId(toPile.cardsIds);

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

export const selectIsFirstFaceCardOfTableau = createSelector(
  [
    (state, pileId) => selectPile(state, pileId),
    (_, pileId) => pileId,
    (_, __, cardId) => cardId,
  ],
  (pile, pileId, cardId) => {
    const isTableau = field_components_type_ids.tableaus.includes(pileId);
    if (!isTableau || !pile) return false;
    const { firstFaceCardId } = getFirstFaceCard(pile);
    return firstFaceCardId === cardId;
  },
);
