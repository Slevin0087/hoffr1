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

export const animationsNames = {
  flip: "flip",
  move: "move",
  hover: "hover",
  initial: "initial",
  exit: "exit",
  drag: "drag",
  drop: "drop",
  shuffle: "shuffle",
  can_not_move: "can_not_move",
};

export const animationsTypes = {
  dealsFromStockToTableaus: "dealsFromStockToTableaus",
  standart: "standart",
  stockToWaste: "stockToWaste",
  wasteToStock: "wasteToStock",
  collectStandart: "collectStandart",
  collectStockToWaste: "collectStockToWaste",
  collectWasteToStock: "collectWasteToStock",
  undoStandart: "undoStandart",
  undoStockToWaste: "undoStockToWaste",
  undoWasteToStock: "undoWasteToStock",
  shuffleStock: "shuffleStock",
};

export const animationsData = {
  [animationsNames.flip]: {
    name: animationsNames.flip,
    types: {
      [animationsTypes.dealsFromStockToTableaus]: {
        transition: {
          duration: 0.01,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.standart]: {
        transition: {
          duration: 0.5,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.stockToWaste]: {
        transition: {
          duration: 0.1,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.wasteToStock]: {
        transition: {
          duration: 0.05,
          type: "tween",
          ease: "easeInOut",
        },
      },
      [animationsTypes.collectStandart]: {
        transition: {
          duration: 0.25,
          type: "spring",
        },
      },
      [animationsTypes.collectStockToWaste]: {
        transition: {
          duration: 0.05,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.collectWasteToStock]: {
        transition: {
          duration: 0.05,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.undoStandart]: {
        transition: {
          duration: 0.2,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.undoStockToWaste]: {
        transition: {
          duration: 0.05,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.undoWasteToStock]: {
        transition: {
          duration: 0.1,
          type: "spring",
          ease: "circOut",
        },
      },
    },
  },
  [animationsNames.move]: {
    name: animationsNames.move,
    types: {
      [animationsTypes.dealsFromStockToTableaus]: {
        transition: {
          duration: 0.05,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.standart]: {
        transition: {
          duration: 0.25,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.stockToWaste]: {
        transition: {
          duration: 0.2,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.wasteToStock]: {
        transition: {
          duration: 0.05,
          type: "spring",
          ease: "anticipate",
        },
      },
      [animationsTypes.collectStandart]: {
        transition: {
          duration: 0.1,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.collectStockToWaste]: {
        transition: {
          duration: 0.05,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.collectWasteToStock]: {
        transition: {
          duration: 0.05,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.undoStandart]: {
        transition: {
          duration: 0.25,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.undoStockToWaste]: {
        transition: {
          duration: 0.05,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.undoWasteToStock]: {
        transition: {
          duration: 0.1,
          type: "spring",
          ease: "circOut",
        },
      },
      [animationsTypes.shuffleStock]: {
        transition: {
          duration: 0.1,
          type: "spring",
          ease: "circOut",
        },
      },
    },
  },
  [animationsNames.hover]: {
    name: animationsNames.hover,
    types: {
      [animationsTypes.dealsFromStockToTableaus]: {
        animation: {
          scale: 1.05,
        },
      },
      [animationsTypes.standart]: {
        animation: {
          scale: 1.05,
        },
      },
      [animationsTypes.stockToWaste]: {
        animation: {
          scale: 1.05,
        },
      },
      [animationsTypes.wasteToStock]: {
        animation: {
          scale: 1.05,
        },
      },
      [animationsTypes.undoStandart]: {
        animation: {
          scale: 1.05,
        },
      },
      [animationsTypes.undoStockToWaste]: {
        animation: {
          scale: 1.05,
        },
      },
      [animationsTypes.undoWasteToStock]: {
        animation: {
          scale: 1.05,
        },
      },
    },
  },
  [animationsNames.initial]: {
    name: animationsNames.initial,
    types: {},
  },
  [animationsNames.exit]: {
    name: animationsNames.exit,
    types: {},
  },
  [animationsNames.drag]: {
    name: animationsNames.drag,
    types: {},
  },
  [animationsNames.drop]: {
    name: animationsNames.drop,
    types: {},
  },
  [animationsNames.shuffle]: {
    name: animationsNames.shuffle,
    types: {
      [animationsTypes.shuffleStock]: {
        transition: {
          duration: 0.05,
          type: "spring",
          ease: "circOut",
        },
      },
    },
  },
  [animationsNames.can_not_move]: {
    name: animationsNames.can_not_move,
    types: {
      [animationsTypes.standart]: {
        transition: {
          duration: 0.5,
          type: 'tween',
          ease: ["easeIn", "easeOut"],
          times: [0, 0.16, 0.33, 0.5],
        },
      },
    },
  },
};

export const dndReturningDuration =
  animationsData[animationsNames.move].types[animationsTypes.standart]
    .transition.duration * 1000;

export const cardAnimations = {
  initial: animationsData.initial,
  exit: animationsData.exit,
  hover: animationsData.hover,
  drag: animationsData.drag,
  move: animationsData.move,
  drop: animationsData.drop,
  flip: animationsData.flip,
  shuffle: animationsData.shuffle,
  can_not_move: animationsData.can_not_move,
};
