import cn from "classnames";

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
import {
  selectCard,
  selectIsFirstFaceCardOfTableau,
} from "../../Store/slices/decks/selectors";
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
import { dndAccepts, dropTypes } from "../../Configs/DecksConfigs";
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
  const { height } = useWindowSize();
  const { cardId, pileId, isTopCard = false, isGhost = false } = props;
  const innerRef = useRef(null);
  const isEventsInDeck = useSelector(selectIsEventsInDeck);
  const card = useSelector(
    (state) => selectCard(state, pileId, cardId),
    shallowEqual,
  );

  const isFirstFaceCardOfTableau = useSelector((state) =>
    selectIsFirstFaceCardOfTableau(state, pileId, cardId),
  );

  const [shuffleOffset] = useState(() => ({
    x: Math.random() - 0.5,
    y: Math.random() - 0.5,
  }));

  const isAnimationsEnabled = useSelector(selectAnimationsEnabled);
  const isMoveAnimation = getIsMoveAnimation(card, isAnimationsEnabled);
  const moveAnimation = getMoveAnimation(card, isAnimationsEnabled);
  const moveAnimationConfig = getMoveAnimationData(moveAnimation);
  const isCanNotMoveAnimation = getIsAnimationByName(
    card,
    isAnimationsEnabled,
    animationsData.can_not_move.name,
  );
  const canNotMoveAnimation = getAnimationByName(
    card,
    isAnimationsEnabled,
    animationsData.can_not_move.name,
  );
  const canNotMoveAnimationConfig = getAnimationDataByName(
    canNotMoveAnimation,
    canNotMoveAnimation?.type,
  );
  console.log(
    "isCanNotMoveAnimation",
    isCanNotMoveAnimation,
    canNotMoveAnimation,
  );
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

  const style = useMemo(() => {
    return {
      pointerEvents: isPointerEvents ? "auto" : "none",
      cursor: isPointerEvents ? "grab" : "auto",
      opacity: isOpacity ? 1 : 0,
      zIndex: isHighZIndex ? highZIndex : card?.position,
      "--card-index": card.position || 0,
      "--card-shuffle-offset-x": isShuffleAnimation ? shuffleOffset.x : 0,
      "--card-shuffle-offset-y": isShuffleAnimation ? shuffleOffset.y : 0,
    };
  }, [
    card.position,
    isPointerEvents,
    isOpacity,
    isHighZIndex,
    highZIndex,
    shuffleOffset.x,
    shuffleOffset.y,
    isShuffleAnimation,
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
    if (!card.isHintShowing) return;
    const payload = { cardId, pileId, changes: { isHintShowing: false } };
    if (isEventsInDeck) {
      dispatch(updateCardOne(payload));
    } else {
      const timer = setTimeout(() => {
        dispatch(updateCardOne(payload));
      }, highlightDuration);
      return () => clearTimeout(timer);
    }
  }, [card.isHintShowing, isEventsInDeck, dispatch, cardId, pileId]);

  const containerClasses = cn(cardContainerClassName, pileId, {
    "face-card": card.side === sides.face,
    "shirt-card": card.side === sides.shirt,
    "isFace-card-of-tableau": isFirstFaceCardOfTableau,
    "isOver-can-drop": dropOutput.isOver && isCanDrop,
    "isHint-showing": card.isHintShowing,
    "isShuffling-card": isShuffleAnimation,
  });

  if (isGhost) {
    return (
      <motion.div id={card.id} className={containerClasses}>
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
      className={containerClasses}
      style={{ ...style, rotateY: springRotation }}
      onDoubleClick={onDoubleClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      whileHover={isPointerEvents && hoverAnimation}
      layout="position"
      layoutId={card.id}
      animate={
        isCanNotMoveAnimation
          ? {
              x: [0, -10, 10, 0],
              transition: canNotMoveAnimationConfig?.transition,
            }
          : { x: 0, y: 0 }
      }
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
