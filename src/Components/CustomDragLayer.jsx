import PlayingCard from "../Components/PlayingCard/PlayingCard";
import { useDragLayer } from "react-dnd";
import { getCardOffset2 } from "../utils/deckUtils";
import { PLAYING_CARDS_STYLE_CONSTANT } from "../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { shallowEqual, useSelector } from "react-redux";
import {
  selectPile,
  selectDraggingCardsIdsByPileId,
} from "../Store/slices/decks/selectors";
import { useMemo } from "react";

const wrapperBaseStyles = {
  position: "absolute",
  pointerEvents: "none",
  zIndex: 9999,
  boxSizing: "content-box",
};

const CARD_WIDTH = `var(${PLAYING_CARDS_STYLE_CONSTANT.WIDTH})`;
const CARD_HEIGHT = `var(${PLAYING_CARDS_STYLE_CONSTANT.HEIGHT})`;

export const CustomDragLayer = () => {
  const { isDragging, item, offset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    offset: monitor.getSourceClientOffset(),
  }));

  const currentPileId = item?.card?.pileId;

  const currentPile = useSelector((state) =>
    item ? selectPile(state, currentPileId) : null,
  );
  const draggingCardsIds = useSelector(
    (state) => selectDraggingCardsIdsByPileId(state, currentPileId),
    shallowEqual,
  );

  const cardPositions = useMemo(() => {
    if (!draggingCardsIds?.length) return [];

    // Берем первую карту как точку отсчета
    const firstCardOffset = getCardOffset2(
      draggingCardsIds[0],
      currentPile,
      item?.height,
    );

    console.log("cardPositions firstCardOffset: ", firstCardOffset);
    // Для каждой карты вычисляем ее позицию ОТНОСИТЕЛЬНО ПЕРВОЙ
    return draggingCardsIds.map((cardId) => {
      const cardOffset = getCardOffset2(cardId, currentPile, item?.height);
      console.log("cardPositions cardOffset: ", cardOffset);
      return {
        // x: cardOffset.x * 0 - firstCardOffset.x * 0,
        x: 0,
        y: cardOffset.y - firstCardOffset.y,
      };
    });
  }, [draggingCardsIds, currentPile, item?.height]);

  console.log("CustomDragLayer cardPositions: ", cardPositions);

  const bounds = useMemo(() => {
    if (!cardPositions.length) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    return {
      minX: Math.min(...cardPositions.map((p) => p.x)),
      minY: Math.min(...cardPositions.map((p) => p.y)),
      maxX: Math.max(...cardPositions.map((p) => p.x)),
      maxY: Math.max(...cardPositions.map((p) => p.y)),
    };
  }, [cardPositions]);

  if (!draggingCardsIds?.length) return null;
  if (!isDragging || !item || !offset) return null;

  return (
    <div
      id="drag-layer"
      style={{
        ...wrapperBaseStyles,
        left: offset.x + bounds.minX,
        top: offset.y + bounds.minY,
        width: `calc(${CARD_WIDTH} + ${bounds.maxX - bounds.minX}px)`,
        height: `calc(${CARD_HEIGHT} + ${bounds.maxY - bounds.minY}px)`,
        boxShadow: draggingCardsIds.length > 1 && "0 0 0 5px gold",
      }}
    >
      {draggingCardsIds.map((cardId, index) => {
        const pos = cardPositions[index];
        return (
          <div
            key={cardId}
            style={{
              ...wrapperBaseStyles,
              left: pos.x - bounds.minX,
              top: pos.y - bounds.minY,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <PlayingCard
              cardId={cardId}
              pileId={currentPileId}
              isGhost={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CustomDragLayer;
