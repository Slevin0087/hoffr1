import {
  field_components_default_state,
  field_components_types,
} from "../Configs/FieldComponentsConfigs";
import {
  animationsNames,
  cardAnimations,
  PLAYING_CARD_NAME,
  PLAYING_CARD_SUITS,
  PLAYING_CARD_VALUES,
  pointsMap,
  sides,
} from "../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { generateId } from "./helpers";

// Константы и чисто логические функции (без состояния)

// Получить цвет карты по масти
export const getCardColor = (suit) => {
  return [PLAYING_CARD_SUITS.HEARTS, PLAYING_CARD_SUITS.DIAMONDS].includes(suit)
    ? "red"
    : "black";
};

// Получить символ для отображения
export const getCardSymbol = (value, suit, faceUp) => {
  return faceUp ? `${value}${suit}` : "";
};

// Получить ранг карты (числовое значение)
export const getCardRank = (value) => {
  return PLAYING_CARD_VALUES.indexOf(value);
};

// Проверка последовательности
export const isNextInSequence = (card1, card2) => {
  return getCardRank(card1.value) === getCardRank(card2.value) - 1;
};

export const isPreviousInSequence = (card1, card2) => {
  return getCardRank(card1.value) === getCardRank(card2.value) + 1;
};

// Проверка масти и цвета
export const isSameSuit = (card1, card2) => {
  return card1.suit === card2.suit;
};

export const isOppositeColor = (card1, card2) => {
  return getCardColor(card1.suit) !== getCardColor(card2.suit);
};

export const isSameColor = (card1, card2) => {
  return getCardColor(card1.suit) === getCardColor(card2.suit);
};

export const isAce = (card) => {
  // PLAYING_CARD_VALUES[0] - Туз
  return card.value === PLAYING_CARD_VALUES[0];
};

export const isKing = (card) => {
  // PLAYING_CARD_VALUES[PLAYING_CARD_VALUES.length - 1] - Король
  return card.value === PLAYING_CARD_VALUES[PLAYING_CARD_VALUES.length - 1];
};

// Очки карты

export const getCardPoints = (value) => {
  return pointsMap[value] || 0;
};

// Создать объект карты (данные, без методов)
export const createPlayingCard = (suit, value, side = sides.shirt) => {
  const id = generateId(PLAYING_CARD_NAME);
  return {
    id,
    suit,
    value,
    side,
    color: getCardColor(suit),
    isDragging: false,
    isDropping: false,
    isAnimating: false,
    activeAnimations: [],
    hintShowColor: "",
    flipping: false,
    moving: false,
  };
};

// Генерация полной колоды
export const generateDeck = () => {
  const deck = [];
  Object.values(PLAYING_CARD_SUITS).forEach((suit) => {
    PLAYING_CARD_VALUES.forEach((value, index) => {
      deck.push(createPlayingCard(suit, value, index));
    });
  });
  return deck;
};

export const getIsPointerEvents = (card, isTopCard) => {
  const isCardSideShirt = card.side === sides.shirt;
  if (isCardSideShirt || card.isAnimating) return false;
  const pileType = field_components_default_state[card.pileId]?.type;
  const isTableauPile = pileType === field_components_types.tableaus;
  if (isTableauPile) return true;
  return isTopCard;
};

export const getIsCanDnD = (card, isTopCard) => {
  const isCardSideShirt = card.side === sides.shirt;
  if (isCardSideShirt) return { isCanDrag: false, isCanDrop: false };

  const pileType = field_components_default_state[card.pileId]?.type;
  const isTableauPile = pileType === field_components_types.tableaus;
  if (isTableauPile) return { isCanDrag: true, isCanDrop: isTopCard };

  const isWastePile = pileType === field_components_types.wastes;
  if (isWastePile) return { isCanDrag: isTopCard, isCanDrop: false };

  return { isCanDrag: isTopCard, isCanDrop: isTopCard };
};

export const setDnDInputs = (typeAndAccept) => {
  const dragInputs = (dragData) => ({
    type: typeAndAccept,
    item: () => dragData,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) dropResult;
    },
    canDrag: () => dragData.isCanDrag,
    collect: (monitor) => {
      const isDragging = monitor.isDragging();
      const dragItem = monitor.getItem();
      return { isDragging, dragItem };
    },
  });
  const dropInputs = (dropData) => ({
    accept: typeAndAccept,
    drop: (item, monitor) => {
      console.log("item, monitor", item, monitor);
      return dropData;
    },
    canDrop: (item) => dropData.isCanDrop && item.card.id !== dropData.card.id,
    collect: (monitor) => {
      const isOver = monitor.isOver();
      const canDrop = monitor.canDrop();
      return { isOver, canDrop };
    },
  });
  return { dragInputs, dropInputs };
};

export const getAnimationsData = (card, isAnimationsEnabled) => {
  if (
    !isAnimationsEnabled ||
    !card ||
    !card.isAnimating ||
    !card.activeAnimations
  )
    return null;
  const animations = card.activeAnimations.map((animation) => {
    console.log("cardAnimations animation", cardAnimations, animation);
    return cardAnimations[animation];
  });
  return {
    animations,
  };
};

export const getIsAnimationByName = (
  card,
  isAnimationsEnabled,
  animationName,
) => {
  if (
    !isAnimationsEnabled ||
    !card ||
    !card.isAnimating ||
    !card.activeAnimations
  )
    return false;
  const callback = (animation) => animation.name === animationName;
  return card.activeAnimations.some(callback);
};

export const getAnimationByName = (
  card,
  isAnimationsEnabled,
  animationName,
) => {
  if (
    !isAnimationsEnabled ||
    !card ||
    !card.isAnimating ||
    !card.activeAnimations
  )
    return null;
  const callback = (animation) => animation.name === animationName;
  return card.activeAnimations.find(callback);
};

export const getAnimationDataByName = (animation, type) => {
  if (!animation || !animation.name) return null;
  const animationConfig = cardAnimations[animation.name];
  if (!animationConfig) return null;
  const animationData = animationConfig.types[type];
  if (!animationData) return null;
  return animationData;
};

export const getIsMoveAnimation = (card, isAnimationsEnabled) => {
  if (!isAnimationsEnabled || !card || !card.isAnimating) return false;
  console.log("card.activeAnimations", card.activeAnimations);
  const callback = (animation) => animation.name === animationsNames.move;
  return card.activeAnimations.some(callback);
};

export const getMoveAnimation = (card, isAnimationsEnabled) => {
  if (!isAnimationsEnabled || !card || !card.isAnimating) return null;
  const callback = (animation) => animation.name === animationsNames.move;
  return card.activeAnimations.find(callback);
};

export const getMoveAnimationData = (moveAnimation) => {
  if (!moveAnimation) return null;
  const animation = cardAnimations[moveAnimation.name];
  if (!animation) return null;
  const animationData = animation.types[moveAnimation.type];
  if (!animationData) return null;
  return animationData;
};

export const getIsFlipAnimation = (card, isAnimationsEnabled) => {
  if (!isAnimationsEnabled || !card || !card.isAnimating) return false;
  return card.activeAnimations.includes(animationsNames.flip);
};

export const getIsFlipBackAnimation = (card, isAnimationsEnabled) => {
  if (!isAnimationsEnabled || !card || !card.isAnimating) return false;
  return card.activeAnimations.includes(animationsNames.flipBack);
};

export const getAnimationFlipDuration = (type) => {
  const animationFlipDuration =
    cardAnimations[animationsNames.flip].types[type].transition.duration;
  return animationFlipDuration * 1000;
};

export const getAnimationMoveDuration = (type) => {
  const animationMoveDuration =
    cardAnimations[animationsNames.move].types[type].transition.duration;
  return animationMoveDuration * 1000;
};

export const getAnimationShuffleDuration = (type) => {
  const animationShuffleDuration =
    cardAnimations[animationsNames.shuffle].types[type].transition.duration;
  return animationShuffleDuration * 1000;
};
