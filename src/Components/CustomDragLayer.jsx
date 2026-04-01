import PlayingCard from "../Components/PlayingCard/PlayingCard";
import { useDragLayer } from "react-dnd";
import { getCardOffset } from "../utils/deckUtils";
import { PLAYING_CARDS_STYLE_CONSTANT } from "../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectDraggingCards } from "../Store/slices/decks/selectors";
import { useEffect, useMemo } from "react";
import {
  clearDraggedCards,
  setDraggedCards,
} from "../Store/slices/decks/slice";

const wrapperBaseStyles = {
  position: "absolute",
  pointerEvents: "none",
  zIndex: 9999,
  boxSizing: "content-box",
};

const CARD_WIDTH = `var(${PLAYING_CARDS_STYLE_CONSTANT.WIDTH})`;
const CARD_HEIGHT = `var(${PLAYING_CARDS_STYLE_CONSTANT.HEIGHT})`;

export const CustomDragLayer = () => {
  const dispatch = useDispatch();
  const { isDragging, item, offset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    offset: monitor.getSourceClientOffset(),
  }));

  const selectorParams = useMemo(
    () => (item ? { card: item.card, height: item.height } : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item?.card?.id, item?.height],
  );

  const draggingCards = useSelector(
    (state) =>
      selectorParams
        ? selectDraggingCards(state, selectorParams.card, selectorParams.height)
        : [],
    shallowEqual,
  );

  const { draggingCardsIds, draggingCardsObj } = useMemo(() => {
    if (!draggingCards) return { draggingCardsIds: [], draggingCardsObj: {} };
    const ids = [];
    const obj = {};
    draggingCards.forEach((card) => {
      ids.push(card.id);
      obj[card.id] = card;
    });
    return { draggingCardsIds: ids, draggingCardsObj: obj };
  }, [draggingCards]);
  const isTopCard = useMemo(() => {
    if (!draggingCards?.length) return false;
    const lastCard = draggingCards[draggingCards?.length - 1];
    return lastCard?.id === item?.card?.id;
  }, [draggingCards, item?.card?.id]);

  const cardPositions = useMemo(() => {
    if (!draggingCards?.length) return [];

    // Берем первую карту как точку отсчета
    const firstCard = draggingCards[0];
    const firstCardOffset = getCardOffset(
      firstCard,
      draggingCardsIds,
      draggingCardsObj,
      item?.height,
    );

    // Для каждой карты вычисляем ее позицию ОТНОСИТЕЛЬНО ПЕРВОЙ
    return draggingCards.map((card) => {
      const cardOffset = getCardOffset(
        card,
        draggingCardsIds,
        draggingCardsObj,
        item?.height,
      );

      return {
        x: cardOffset.overlapX - firstCardOffset.overlapX,
        y: cardOffset.overlapY - firstCardOffset.overlapY,
        originalX: cardOffset.overlapX,
        originalY: cardOffset.overlapY,
      };
    });
  }, [draggingCards, draggingCardsIds, draggingCardsObj, item?.height]);

  const bounds = useMemo(() => {
    if (!cardPositions.length) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }
    return {
      minX: Math.min(...cardPositions.map((p) => p.x)),
      minY: Math.min(...cardPositions.map((p) => p.y)),
      maxX: Math.max(...cardPositions.map((p) => p.x)),
      maxY: Math.max(...cardPositions.map((p) => p.y)),
    };
  }, [cardPositions]);

  useEffect(() => {
    if (draggingCards) {
      const draggedCardsObj = {};
      draggingCards.forEach((card) => {
        draggedCardsObj[card.id] = {
          id: card.id,
        };
      });
      dispatch(setDraggedCards(draggedCardsObj));
    }
    return () => {
      dispatch(clearDraggedCards({}));
    };
  }, [draggingCards, dispatch]);

  if (!draggingCards) return null;
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
        border: draggingCards.length > 1 && "5px solid gold",
      }}
    >
      {draggingCards.map((card, index) => {
        const pos = cardPositions[index];
        return (
          <div
            key={card.id}
            style={{
              ...wrapperBaseStyles,
              position: "absolute",
              left: pos.x - bounds.minX,
              top: pos.y - bounds.minY,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <PlayingCard
              cardId={card.id}
              pileId={card.pileId}
              isTopCard={isTopCard}
              isGhost={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CustomDragLayer;
