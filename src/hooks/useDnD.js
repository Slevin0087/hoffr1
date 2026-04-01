import { useCallback } from "react";

export const useDnD = () => {
  const handleDragStart = useCallback((event) => {
    console.log("useDnD Drag start", event);
  }, []);
  // const handleDragMove = useCallback((event) => {}, []);

  const handleDragEnd = useCallback((event) => {
    // (event) => {
    //     const { active, over } = event;
    //     // console.log("Drag end", active, over);

    //     // if (over && active.id !== over.id) {
    //     //   const movedCardId = active.id;
    //     //   const from = findCardContainer(movedCardId);

    //     //   const toTypeRaw = over.id.split("-")[0];
    //     //   const toType = toTypeRaw.endsWith("s") ? toTypeRaw : toTypeRaw + "s";
    //     //   const toId = over.id;
    //     //   const to = { type: toType, id: toId };
    //     //   const { game } = store.getState();

    //     //   const movedCard = getCardById(movedCardId);
    //     //   const destinationPile = game[toType]?.[toId]?.playingCards || [];
    //     //   const topCardId = destinationPile[destinationPile.length - 1];
    //     //   const topCard = topCardId ? getCardById(topCardId) : null;

    //     //   let isValidMove = false;
    //     //   if (to.type === FIELD_COMPONENTS_TYPES.TABLEAUS) {
    //     //     isValidMove = canMoveToTableau(movedCard, topCard);
    //     //   } else if (to.type === FIELD_COMPONENTS_TYPES.FOUNDATIONS) {
    //     //     isValidMove = canMoveToFoundation(movedCard, topCard);
    //     //   }

    //     //   if (from && isValidMove) {
    //     //     movePlayingCard(movedCardId, from, to);
    //     //   }
    //     // }
    //   },
    //   [
    //     // findCardContainer,
    //     // getCardById,
    //     // canMoveToTableau,
    //     // canMoveToFoundation,
    //     // movePlayingCard,
    //     // store,
    //   ],
    console.log("useDnD handleDragEnd event: ", event);
  }, []);
  return {
    handleDragStart,
    // handleDragMove,
    handleDragEnd,
  };
};

// const findCardContainer = useCallback(
//   (cardId) => {
//     const { game } = store.getState();
//     for (const tableauId in game.tableaus) {
//       if (game.tableaus[tableauId].playingCards.includes(cardId)) {
//         return { type: FIELD_COMPONENTS_TYPES.TABLEAUS, id: tableauId };
//       }
//     }
//     for (const foundationId in game.foundations) {
//       if (game.foundations[foundationId].playingCards.includes(cardId)) {
//         return { type: FIELD_COMPONENTS_TYPES.FOUNDATIONS, id: foundationId };
//       }
//     }
//     for (const wasteId in game.waste) {
//       if (game.waste[wasteId].playingCards.includes(cardId)) {
//         return { type: FIELD_COMPONENTS_TYPES.WASTE, id: wasteId };
//       }
//     }
//     for (const stockId in game.stock) {
//       if (game.stock[stockId].playingCards.includes(cardId)) {
//         return { type: FIELD_COMPONENTS_TYPES.STOCK, id: stockId };
//       }
//     }
//     return null;
//   },
//   [store],
// );
