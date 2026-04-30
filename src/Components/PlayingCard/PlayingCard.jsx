import "./PlayingCard.css";
import FaceAndShirt from "./Components/FaceAndShirt";
import ChangingPoints from "./Components/ChangingPoints";
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useDoubleTap } from "../../hooks/useDoubleTap";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { selectCard, selectOverlap } from "../../Store/slices/decks/selectors";
import {
  getIsCanDnD,
  getIsPointerEvents,
  getMoveAnimation,
  getMoveAnimationData,
  getIsMoveAnimation,
  getIsAnimationByName,
  getAnimationByName,
  getAnimationDataByName,
} from "../../utils/playingCardUtils";
import {
  animationsData,
  cardContainerClassName,
  sides,
} from "../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { useWindowSize } from "../../hooks/useWindowSize";
import { selectAnimationsEnabled } from "../../Store/slices/settings/selectors";
import { handleCardClick, handleDrop } from "../../Store/slices/game/thunks";
import {
  dndAccepts,
  dropTypes,
} from "../../Configs/PlayingCardsConfigs/DecksConfigs";
import {
  resetIsDraggingCardsByPileId,
  setIsDraggingCardsByCardId,
  updateCardOne,
} from "../../Store/slices/decks/slice";
import { highlightDuration } from "../../Configs/FieldComponentsConfigs";
import { selectIsEventsInDeck } from "../../Store/slices/game/selectors";
import { setIsEventsInDeck } from "../../Store/slices/game/slice";

const moveAnimaTransition = animationsData.move.types.standart.transition;
const hoverAnimation = animationsData.hover.types.standart.animation;

const PlayingCard = (props) => {
  const dispatch = useDispatch();
  const { height, width } = useWindowSize();
  const {
    cardId,
    pileId,
    isTopCard = false,
    isGhost = false,
    isHintShowCardInTableauPile = false,
    isHintShowCardInTableauPileOverlapY = 0,
  } = props;
  const innerRef = useRef(null);
  const isEventsInDeck = useSelector(selectIsEventsInDeck);
  const card = useSelector(
    (state) => selectCard(state, pileId, cardId),
    shallowEqual,
  );
  const overlap = useSelector(
    (state) => selectOverlap(state, pileId, cardId, height),
    shallowEqual,
  );

  const [shuffleOffset] = useState(() => ({
    x: ((Math.random() - 0.5) * width) / 6,
    y: ((Math.random() - 0.5) * height) / 6,
  }));

  const isAnimationsEnabled = useSelector(selectAnimationsEnabled);
  const isMoveAnimation = getIsMoveAnimation(card, isAnimationsEnabled);
  const moveAnimation = getMoveAnimation(card, isAnimationsEnabled);
  const moveAnimationConfig = getMoveAnimationData(moveAnimation);
  const isShuffleAnimation = getIsAnimationByName(
    card,
    isAnimationsEnabled,
    animationsData.shuffle.name,
  );
  const shuffleAnimation = getAnimationByName(
    card,
    isAnimationsEnabled,
    animationsData.shuffle.name,
  );
  const shuffleAnimationConfig = getAnimationDataByName(
    shuffleAnimation,
    shuffleAnimation?.type,
  );
  const { isCanDrag, isCanDrop } = getIsCanDnD(card, isTopCard, isGhost);
  const isPointerEvents = getIsPointerEvents(card, isTopCard);

  const onDoubleClick = () => dispatch(handleCardClick({ card }));
  const { onTouchStart, onTouchEnd } = useDoubleTap(onDoubleClick, 300);

  // ---------------------- DRAG -----------------------
  const [_, drag, preview] = useDrag({
    type: dndAccepts.CARD,
    item: () => {
      dispatch(setIsEventsInDeck(true));
      dispatch(setIsDraggingCardsByCardId({ cardId, pileId, value: true }));
      return { card, height };
    },
    end: (item, monitor) => {
      dispatch(setIsEventsInDeck(false));
      if (!monitor.didDrop()) {
        dispatch(resetIsDraggingCardsByPileId({ pileId }));
        return;
      }
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        dispatch(handleDrop({ item, dropResult }));
        return;
      }
    },
    canDrag: () => isCanDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      dragItem: monitor.getItem(),
    }),
  });

  // -------------------- DROP -------------------------
  const [dropOutput, drop] = useDrop({
    accept: dndAccepts.CARD,
    drop: () => ({ dropType: dropTypes.CARD, card }),
    canDrop: (item) => isCanDrop && item.card.id !== card.id,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const highZIndex = 100 + card?.position;
  const isOpacity = !card.isDragging && !isGhost;
  const isHighZIndex = isMoveAnimation || isShuffleAnimation;
  const isBorder = dropOutput.isOver && isCanDrop;

  const style = useMemo(() => {
    if (isHintShowCardInTableauPile)
      return {
        top: isHintShowCardInTableauPileOverlapY,
        pointerEvents: isPointerEvents ? "auto" : "none",
        cursor: isPointerEvents ? "grab" : "auto",
        zIndex: card?.position,
      };
    return {
      top: isShuffleAnimation ? overlap.y + shuffleOffset.y : overlap.y,
      left: isShuffleAnimation ? overlap.x + shuffleOffset.x : overlap.x,
      pointerEvents: isPointerEvents ? "auto" : "none",
      cursor: isPointerEvents ? "grab" : "auto",
      boxShadow: isBorder
        ? "0 0 0 5px green"
        : card.hintShowColor && !isHintShowCardInTableauPile
          ? `0 0 0 5px ${card.hintShowColor}`
          : "none",
      opacity: isOpacity ? 1 : 0,
      zIndex: isHighZIndex ? highZIndex : card?.position,
    };
  }, [
    card.position,
    isPointerEvents,
    card.hintShowColor,
    isOpacity,
    isHighZIndex,
    highZIndex,
    isBorder,
    overlap.x,
    overlap.y,
    isShuffleAnimation,
    shuffleOffset.x,
    shuffleOffset.y,
    isHintShowCardInTableauPile,
    isHintShowCardInTableauPileOverlapY,
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

  useEffect(() => {
    if (!card.hintShowColor) return;
    const payload = { cardId, pileId, changes: { hintShowColor: "" } };
    if (isEventsInDeck) {
      dispatch(updateCardOne(payload));
    } else {
      const timer = setTimeout(() => {
        dispatch(updateCardOne(payload));
      }, highlightDuration);
      return () => clearTimeout(timer);
    }
  }, [card.hintShowColor, isEventsInDeck, dispatch, cardId, pileId]);

  if (isGhost) {
    return (
      <motion.div id={card.id} className={cardContainerClassName}>
        <FaceAndShirt cardSuit={card.suit} cardValue={card.value} />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={(el) => {
        drag(drop(el));
        innerRef.current = el;
      }}
      id={card.id}
      className={cardContainerClassName}
      style={{ ...style, rotateY: springRotation }}
      onDoubleClick={onDoubleClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      whileHover={
        isPointerEvents && hoverAnimation && !isHintShowCardInTableauPile
      }
      layout="position"
      layoutId={card.id}
      animate={{ x: 0, y: 0 }}
      transition={{
        layout: isShuffleAnimation
          ? shuffleAnimationConfig?.transition
          : moveAnimationConfig?.transition || moveAnimaTransition,
      }}
    >
      <FaceAndShirt cardSuit={card.suit} cardValue={card.value} />
      <ChangingPoints
        cardId={card.id}
        cardSide={card.side}
        isAnimationsEnabled={isAnimationsEnabled}
      />
    </motion.div>
  );
};

export default memo(PlayingCard);
