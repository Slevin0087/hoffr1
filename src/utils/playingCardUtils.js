import {
  field_components_default_state,
  field_components_types,
} from "../Configs/FieldComponentsConfigs";
import {
  animationsTypes,
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
    isAnimating: false,
    activeAnimations: [],
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
  if (card.side === sides.shirt) return false;
  const pileType = field_components_default_state[card.pileId]?.type;
  const isTableauPile = pileType === field_components_types.tableaus;
  if (isTableauPile) return true;
  return isTopCard;
};

export const getIsCanDnD = (card, isTopCard) => {
  const result = { isCanDrag: false, isCanDrop: false };
  if (card.side === sides.shirt) return result;
  const pileType = field_components_default_state[card.pileId]?.type;
  const isTableauPile = pileType === field_components_types.tableaus;
  if (isTableauPile) {
    result.isCanDrag = true;
    result.isCanDrop = isTopCard;
    return result;
  }
  const isWastePile = pileType === field_components_types.wastes;
  if (isWastePile) {
    result.isCanDrag = isTopCard;
    result.isCanDrop = false;
    return result;
  }
  result.isCanDrag = isTopCard;
  result.isCanDrop = isTopCard;
  return result;
};

export const setDnDInputs = (typeAndAccept) => {
  const dragInputs = (dragData) => ({
    type: typeAndAccept,
    item: () => {
      return dragData;
    },
    canDrag: () => dragData.isCanDrag,
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
        dragItem: monitor.getItem(),
      };
    },
  });
  const dropInputs = (dropData) => ({
    accept: typeAndAccept,
    canDrop: (item) => dropData.isCanDrop && item.card.d !== dropData.cardId,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
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

export const getIsMoveAnimation = (card, isAnimationsEnabled) => {
  if (!isAnimationsEnabled || !card || !card.isAnimating) return false;
  return card.activeAnimations.includes(animationsTypes.move);
};

export const getIsFlipAnimation = (card, isAnimationsEnabled) => {
  if (!isAnimationsEnabled || !card || !card.isAnimating) return false;
  return card.activeAnimations.includes(animationsTypes.flip);
};

export const getIsFlipBackAnimation = (card, isAnimationsEnabled) => {
  if (!isAnimationsEnabled || !card || !card.isAnimating) return false;
  return card.activeAnimations.includes(animationsTypes.flipBack);
};
