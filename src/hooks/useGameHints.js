import { useSelector } from 'react-redux';
import { useGameValidation } from './useGameValidation';

export const useGameHints = () => {
  const gameState = useSelector((state) => state.game);
  const { canMoveToTableau, canMoveToFoundation, getCardById } = useGameValidation();

  const findPossibleMoves = () => {
    // Check for moves from waste to foundations
    const wastePile = gameState.waste['waste-0'].playingCards;
    if (wastePile.length > 0) {
      const topCardId = wastePile[wastePile.length - 1];
      const topCard = getCardById(topCardId);
      for (const foundationId in gameState.foundations) {
        const foundation = gameState.foundations[foundationId];
        const topFoundationCardId = foundation.playingCards[foundation.playingCards.length - 1];
        const topFoundationCard = topFoundationCardId ? getCardById(topFoundationCardId) : null;
        if (canMoveToFoundation(topCard, topFoundationCard)) {
          return { card: topCard, from: { type: 'waste', id: 'waste-0' }, to: { type: 'foundations', id: foundationId } };
        }
      }
    }

    // Check for moves from waste to tableaus
    if (wastePile.length > 0) {
        const topCardId = wastePile[wastePile.length - 1];
        const topCard = getCardById(topCardId);
        for (const tableauId in gameState.tableaus) {
            const tableau = gameState.tableaus[tableauId];
            const topTableauCardId = tableau.playingCards[tableau.playingCards.length - 1];
            const topTableauCard = topTableauCardId ? getCardById(topTableauCardId) : null;
            if (canMoveToTableau(topCard, topTableauCard)) {
                return { card: topCard, from: { type: 'waste', id: 'waste-0' }, to: { type: 'tableaus', id: tableauId } };
            }
        }
    }

    // Check for moves from tableaus to foundations
    for (const tableauId in gameState.tableaus) {
        const tableau = gameState.tableaus[tableauId];
        if (tableau.playingCards.length > 0) {
            const topCardId = tableau.playingCards[tableau.playingCards.length - 1];
            const topCard = getCardById(topCardId);
            for (const foundationId in gameState.foundations) {
                const foundation = gameState.foundations[foundationId];
                const topFoundationCardId = foundation.playingCards[foundation.playingCards.length - 1];
                const topFoundationCard = topFoundationCardId ? getCardById(topFoundationCardId) : null;
                if (canMoveToFoundation(topCard, topFoundationCard)) {
                    return { card: topCard, from: { type: 'tableaus', id: tableauId }, to: { type: 'foundations', id: foundationId } };
                }
            }
        }
    }

    // Check for moves between tableaus
    for (const fromTableauId in gameState.tableaus) {
        const fromTableau = gameState.tableaus[fromTableauId];
        for (const cardId of fromTableau.playingCards) {
            const card = getCardById(cardId);
            if(card.faceUp) {
                for (const toTableauId in gameState.tableaus) {
                    if (fromTableauId !== toTableauId) {
                        const toTableau = gameState.tableaus[toTableauId];
                        const topToTableauCardId = toTableau.playingCards[toTableau.playingCards.length - 1];
                        const topToTableauCard = topToTableauCardId ? getCardById(topToTableauCardId) : null;
                        if (canMoveToTableau(card, topToTableauCard)) {
                            return { card: card, from: { type: 'tableaus', id: fromTableauId }, to: { type: 'tableaus', id: toTableauId } };
                        }
                    }
                }
            }
        }
    }
    
    return null;
  };

  return { findPossibleMoves };
};
