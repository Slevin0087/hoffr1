import { animationsData } from "../MotionAnimationsConfigs.js/cards";

export const sides = {
  face: "face",
  shirt: "shirt",
};

export const PLAYING_CARD_SUITS = {
  HEARTS: "♥",
  DIAMONDS: "♦",
  CLUBS: "♣",
  SPADES: "♠",
};

export const PLAYING_CARD_VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export const pointsMap = {
  [PLAYING_CARD_VALUES[0]]: 11,
  [PLAYING_CARD_VALUES[1]]: 2,
  [PLAYING_CARD_VALUES[2]]: 3,
  [PLAYING_CARD_VALUES[3]]: 4,
  [PLAYING_CARD_VALUES[4]]: 5,
  [PLAYING_CARD_VALUES[5]]: 6,
  [PLAYING_CARD_VALUES[6]]: 7,
  [PLAYING_CARD_VALUES[7]]: 8,
  [PLAYING_CARD_VALUES[8]]: 9,
  [PLAYING_CARD_VALUES[9]]: 10,
  [PLAYING_CARD_VALUES[10]]: 12,
  [PLAYING_CARD_VALUES[11]]: 13,
  [PLAYING_CARD_VALUES[12]]: 14,
};

export const PLAYING_CARD_NAME = "pc";

export const PLAYING_CARDS_STYLE_CONSTANT = {
  WIDTH: "--card-width",
  HEIGHT: "--card-height",
};

export const faceAndShirtClassNames = {
  face: "playing-card-side-face",
  shirt: "playing-card-side-shirt",
};

export const cardContainerClassName = "playing-card-container";

export const animationsTypes = {
  flip: "flip",
  move: "move",
  hover: "hover",
  initial: "initial",
  exit: "exit",
  drag: "drag",
  drop: "drop",
};

export const cardAnimations = {
  initial: animationsData.initial,
  exit: animationsData.exit,
  hover: animationsData.hover,
  drag: animationsData.drag,
  move: animationsData.move,
  drop: animationsData.drop,
  flip: animationsData.flip,
};
