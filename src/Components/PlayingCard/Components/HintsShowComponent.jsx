import { useMemo } from "react";
import { PLAYING_CARDS_STYLE_CONSTANT } from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { useSelector } from "react-redux";
import {
  selectCard,
  //  selectPile
} from "../../../Store/slices/decks/selectors";
// import {
//   calculateHintShowTableauCard,
//   getCardOffset2,
// } from "../../../utils/deckUtils";
import PlayingCard from "../PlayingCard";
// import useWindowSize from "../../../hooks/useWindowSize";

const CARD_WIDTH = `var(${PLAYING_CARDS_STYLE_CONSTANT.WIDTH})`;
const CARD_HEIGHT = `var(${PLAYING_CARDS_STYLE_CONSTANT.HEIGHT})`;

// Функция для получения позиции карты из DOM
const getCardPositionFromDOM = (cardId) => {
  const element = document.getElementById(cardId);
  if (!element) return { x: 0, y: 0 };

  const rect = element.getBoundingClientRect();
  const parent = element.parentElement;
  const parentRect = parent?.getBoundingClientRect();

  return {
    x: rect.left - (parentRect?.left || 0),
    y: rect.top - (parentRect?.top || 0),
  };
};

function HintsShowComponent(props) {
  const { pileId, hintsShowCarsIds } = props;

  const firstCard = useSelector((state) =>
    selectCard(state, pileId, hintsShowCarsIds[0]),
  );

  // Получаем позиции карт из DOM (без useEffect, напрямую в useMemo)
  const cardPositions = useMemo(() => {
    if (!hintsShowCarsIds?.length) return [];

    return hintsShowCarsIds.map((cardId) => {
      const pos = getCardPositionFromDOM(cardId);
      return { x: pos.x, y: pos.y };
    });
  }, [hintsShowCarsIds]); // будет пересчитываться при изменении hintsShowCarsIds

  // Вычисляем границы
  const bounds = useMemo(() => {
    if (!cardPositions.length) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    return {
      minX: Math.min(...cardPositions.map((p) => p.x)),
      minY: Math.min(...cardPositions.map((p) => p.y)),
      maxX: Math.max(...cardPositions.map((p) => p.x)),
      maxY: Math.max(...cardPositions.map((p) => p.y)),
    };
  }, [cardPositions]);

  const firstCardPos = cardPositions[0] || { x: 0, y: 0 };

  if (!hintsShowCarsIds?.length) return null;

  return (
    <div
      id="hints-layer"
      style={{
        position: "absolute",
        left: firstCardPos.x,
        top: firstCardPos.y,
        zIndex: firstCard?.position || 0,
        width: `calc(${CARD_WIDTH} + ${bounds.maxX - bounds.minX}px)`,
        height: `calc(${CARD_HEIGHT} + ${bounds.maxY - bounds.minY}px)`,
        boxShadow:
          hintsShowCarsIds.length > 0 && firstCard?.hintShowColor
            ? `0 0 0 5px ${firstCard.hintShowColor}`
            : "none",
        pointerEvents: "none",
      }}
    >
      {hintsShowCarsIds.map((cardId, index) => {
        const pos = cardPositions[index] || { x: 0, y: 0 };
        const isTopCardId = index === hintsShowCarsIds.length - 1;

        return (
          <div
            key={cardId}
            style={{
              position: "absolute",
              left: pos.x - firstCardPos.x,
              top: pos.y - firstCardPos.y,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <PlayingCard
              cardId={cardId}
              pileId={pileId}
              isTopCardId={isTopCardId}
              isHintShowCardInTableauPile={true}
              isHintShowCardInTableauPileOverlapY={pos.y - firstCardPos.y}
            />
          </div>
        );
      })}
    </div>
  );
}

// function HintsShowComponent(props) {
//   const { height } = useWindowSize();
//   const { pileId, hintsShowCarsIds } = props;
//   const currentPile = useSelector((state) => selectPile(state, pileId));
//   const firstCard = useSelector((state) =>
//     selectCard(state, pileId, hintsShowCarsIds[0]),
//   );

//   const offsets = calculateHintShowTableauCard(
//     hintsShowCarsIds,
//     pileId,
//     height,
//   );

//   const firstCardOffset = getCardOffset2(firstCard.id, currentPile, height);
//   const cardPositions = useMemo(() => {
//     if (!hintsShowCarsIds?.length) return [];

//     return hintsShowCarsIds.map((cardId) => {
//       const cardOffset = getCardOffset2(cardId, currentPile, height);
//       return {
//         x: cardOffset.x,
//         y: cardOffset.y,
//       };
//     });
//   }, [hintsShowCarsIds, currentPile, height]);

//   const bounds = useMemo(() => {
//     if (!cardPositions.length) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
//     return {
//       minX: Math.min(...cardPositions.map((p) => p.x)),
//       minY: Math.min(...cardPositions.map((p) => p.y)),
//       maxX: Math.max(...cardPositions.map((p) => p.x)),
//       maxY: Math.max(...cardPositions.map((p) => p.y)),
//     };
//   }, [cardPositions]);

//   return (
//     <div
//       id="hints-layer"
//       style={{
//         position: "absolute",
//         left: 0,
//         top: firstCardOffset.y,
//         zIndex: firstCard.position,
//         width: `calc(${CARD_WIDTH} + ${bounds.maxX - bounds.minX}px)`,
//         height: `calc(${CARD_HEIGHT} + ${bounds.maxY - bounds.minY}px)`,
//         boxShadow:
//           hintsShowCarsIds.length > 0 && `0 0 0 5px ${firstCard.hintShowColor}`,
//       }}
//     >
//       {hintsShowCarsIds.map((cardId) => {
//         const isTopCardId =
//           cardId === hintsShowCarsIds[hintsShowCarsIds.length - 1];
//         return (
//           <PlayingCard
//             key={cardId}
//             cardId={cardId}
//             pileId={pileId}
//             isTopCardId={isTopCardId}
//             isHintShowCardInTableauPile={true}
//             isHintShowCardInTableauPileOverlapY={offsets[cardId].y}
//           />
//         );
//       })}
//     </div>
//   );
// }

export default HintsShowComponent;
