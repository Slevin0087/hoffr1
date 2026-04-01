import { useSelector } from "react-redux";
import { calculateFacesPosition } from "../utils/facesUtils";
import { PLAYING_CARDS_STYLE_CONSTANT } from "../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { selectAppearancesSelectedIdByType } from "../Store/slices/appearances/selectors";
import {
  APPEARANCES_TYPES,
  facesAppearancesObj,
  shirtsAppearancesObj,
} from "../Configs/AppearancesConfigs";

const shirtPosition = { x: 0, y: 0 };
const shirtBackgroundSize = "100% 100%";

export const usePlayingCardStyle = (cardSuit, cardValue) => {
  const activeFacesId = useSelector((state) =>
    selectAppearancesSelectedIdByType(state, APPEARANCES_TYPES.FACES),
  );
  const activeShirtsId = useSelector((state) =>
    selectAppearancesSelectedIdByType(state, APPEARANCES_TYPES.SHIRTS),
  );
  const activeFaceAppearance = facesAppearancesObj[activeFacesId];
  const activeShirtAppearance = shirtsAppearancesObj[activeShirtsId];
  const facePosition = calculateFacesPosition(
    cardSuit,
    cardValue,
    activeFaceAppearance.img.manyColumns,
    activeFaceAppearance.img.manyLines,
  );
  const facePath = activeFaceAppearance.img.path;
  const shirtPath = activeShirtAppearance.img.path;
  const faceBackgroundSize = `calc(var(${PLAYING_CARDS_STYLE_CONSTANT.WIDTH}) * ${activeFaceAppearance.img.manyColumns}) calc(var(${PLAYING_CARDS_STYLE_CONSTANT.HEIGHT}) * ${activeFaceAppearance.img.manyLines})`;
  const faceStyle = {
    backgroundImage: `url(${facePath})`,
    backgroundPosition: `${facePosition.x}% ${facePosition.y}%`,
    backgroundSize: faceBackgroundSize,
  };
  const shirtStyle = {
    backgroundImage: `url(${shirtPath})`,
    backgroundPosition: `${shirtPosition.x}% ${shirtPosition.y}%`,
    backgroundSize: shirtBackgroundSize,
  };
  return { faceStyle, shirtStyle };
};
