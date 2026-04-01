export const types = {
  flip: "flip",
  move: "move",
  hover: "hover",
  initial: "initial",
  exit: "exit",
  drag: "drag",
  drop: "drop",
};

export const animationsData = {
  [types.flip]: {
    type: types.flip,
    animation: {
      front: {
        rotateY: 0,
      },
      back: {
        rotateY: 180,
      },
    },
    transition: {
      duration: 0.5,
      type: "spring",
      ease: "circOut",
    },
  },
  [types.move]: {
    type: types.move,
    animation: {},
    transition: {
      duration: 0.5,
      type: "spring",
      ease: "circOut",
    },
  },
  [types.hover]: {
    type: types.hover,
    animation: { scale: 1.02 },
    transition: {},
  },
  [types.initial]: {
    type: types.initial,
    animation: { rotateY: 0 },
    transition: {},
  },
  [types.exit]: {
    type: types.exit,
    animation: { rotateY: 0 },
    transition: {},
  },
  [types.drag]: {
    type: types.drag,
    animation: { scale: 1 },
    transition: { duration: 0.2 },
  },
  [types.drop]: {
    type: types.drop,
    animation: { scale: 1.1, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" },
    transition: { duration: 0.2 },
  },
};
