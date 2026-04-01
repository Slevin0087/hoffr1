import {
  animationsTypes,
  cardAnimations,
  sides,
} from "../Configs/PlayingCardsConfigs/PlayingCardsConfigs";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const generateId = (name) => {
  return `${name}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const joinPath = (arrStrings, separator = "/") => {
  return arrStrings.join(separator);
};

export const getActiveFlipTypeAnimation = (cardSideType) => {
  return cardSideType === sides.front
    ? animationsTypes.flip
    : animationsTypes.flipBack;
};

export const getAnimationFlipDuration = () => {
  const animationFlipDuration =
    cardAnimations[animationsTypes.flip].transition.duration;
  return animationFlipDuration * 1000;
};

export const getAnimationMoveDuration = () => {
  const animationMoveDuration =
    cardAnimations[animationsTypes.move].transition.duration;
  return animationMoveDuration * 1000;
};
