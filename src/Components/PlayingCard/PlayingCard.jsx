import "./PlayingCard.css";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from "motion/react";
import { memo, useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { clickCard } from "../../Store/slices/decks/thunks";
import { useDoubleTap } from "../../hooks/useDoubleTap";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import {
  selectCard,
  selectIsCardDragged,
  selectOverlap,
} from "../../Store/slices/decks/selectors";
import {
  getIsCanDnD,
  getIsPointerEvents,
  getIsMoveAnimation,
  setDnDInputs,
} from "../../utils/playingCardUtils";
import {
  cardContainerClassName,
  sides,
} from "../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import FaceAndShirt from "./Components/FaceAndShirt";
import { useWindowSize } from "../../hooks/useWindowSize";
import { cardAnimations } from "../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import ChangingPoints from "./Components/ChangingPoints";
import { selectAnimationsEnabled } from "../../Store/slices/settings/selectors";

const ItemTypes = { CARD: "card" };

const PlayingCard = ({ cardId, pileId, isTopCard, isGhost = false }) => {
  const dispatch = useDispatch();
  const { height } = useWindowSize();
  const card = useSelector(
    (state) => selectCard(state, pileId, cardId),
    shallowEqual,
  );
  const overlap = useSelector(
    (state) => selectOverlap(state, card, height, isGhost),
    shallowEqual,
  );
  const isDraggedCard = useSelector((state) =>
    selectIsCardDragged(state, cardId),
  );
  const isAnimationsEnabled = useSelector(selectAnimationsEnabled);
  console.log("isAnimationsEnabled: ", isAnimationsEnabled);
  const isMoveAnimation = getIsMoveAnimation(card, isAnimationsEnabled);

  const { isCanDrag, isCanDrop } = getIsCanDnD(card, isTopCard, isGhost);
  const isPointerEvents = getIsPointerEvents(card, isTopCard);
  const dragData = {
    card,
    isCanDrag,
    height,
  };
  const dropData = { cardId, isCanDrop };
  const onDoubleClick = () => {
    if (!isGhost) dispatch(clickCard(card));
  };
  const { onTouchStart, onTouchEnd } = useDoubleTap(onDoubleClick, 300);
  const { dragInputs, dropInputs } = setDnDInputs(ItemTypes.CARD);
  // ---------------------- DRAG -----------------------
  const [dragOutput, drag, preview] = useDrag(dragInputs(dragData));
  // -------------------- DROP -------------------------
  const [dropOutput, drop] = useDrop(dropInputs(dropData));

  const style = useMemo(() => {
    if (isGhost) return {};
    return {
      top: overlap.overlapY,
      left: overlap.overlapX,
      pointerEvents: isPointerEvents ? "auto" : "none",
      cursor: isPointerEvents ? "grab" : "auto",
      border: dropOutput.isOver && isCanDrop && "5px solid green",
      opacity: isDraggedCard && !isGhost ? 0 : 1,
      zIndex: isMoveAnimation ? 100 + card?.position : card?.position,
    };
  }, [
    card?.position,
    overlap.overlapX,
    overlap.overlapY,
    isPointerEvents,
    dropOutput.isOver,
    isCanDrop,
    isDraggedCard,
    isMoveAnimation,
    isGhost,
  ]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const rotation = useMotionValue(card.side === sides.face ? 0 : 180);
  const springRotation = useSpring(rotation, {
    stiffness: 1000,
    damping: 20,
    mass: 0.3,
  });

  useEffect(() => {
    rotation.set(card.side === sides.face ? 0 : 180);
  }, [card.side, rotation]);

  if (isGhost) {
    return (
      <motion.div
        ref={(el) => drag(drop(el))}
        id={card.id}
        className={cardContainerClassName}
        style={style}
      >
        <FaceAndShirt cardSuit={card.suit} cardValue={card.value} />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={(el) => drag(drop(el))}
      id={card.id}
      className={cardContainerClassName}
      style={{ ...style, rotateY: springRotation }}
      onDoubleClick={onDoubleClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      whileHover={isPointerEvents && cardAnimations.hover.animation}
      layout="position"
      layoutId={card.id}
      transition={{
        layout: cardAnimations.move.transition,
      }}
    >
      <FaceAndShirt cardSuit={card.suit} cardValue={card.value} />
      {isAnimationsEnabled && <ChangingPoints cardId={card.id} />}
    </motion.div>
  );
};

export default memo(PlayingCard);
