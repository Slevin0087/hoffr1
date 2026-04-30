import "./ChangingPoints.css";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
import { scoreOperations } from "../../../Configs/GameConfigs";
import { selectCurrentUpPointsByCardId } from "../../../Store/slices/ui/selectors";
import {
  animationsTypes,
  sides,
} from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { getAnimationFlipDuration } from "../../../utils/playingCardUtils";

function ChangingPoints(props) {
  const { cardId, cardSide, isAnimationsEnabled } = props;
  const upPointsData = useSelector((state) =>
    selectCurrentUpPointsByCardId(state, cardId),
  );

  if (upPointsData.count === 0) return null;

  const isFaceSide = cardSide === sides.face;
  const isIncrement = upPointsData.operation === scoreOperations.increment;
  const duration = getAnimationFlipDuration(animationsTypes.standart) / 500;
  const baseAnimation = {
    opacity: 1,
    y: "-200%",
    scale: 1.2,
    rotateY: isFaceSide ? 0 : 180,
  };

  const initial = isAnimationsEnabled
    ? {
        opacity: 0,
        scale: 0.5,
        x: "-50%",
        y: "-50%",
        rotateY: isFaceSide ? 0 : 180,
      }
    : baseAnimation;

  const animate = baseAnimation;
  const exit = isAnimationsEnabled
    ? { opacity: 0, y: "-200%", scale: 0.8, rotateY: isFaceSide ? 0 : 180 }
    : baseAnimation;

  const transition = isAnimationsEnabled ? { duration } : { duration: 0 };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="changing-points"
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        <div className="score-popup-content">
          <span
            className={`score-value ${isIncrement ? "positive" : "negative"}`}
          >
            {`${isIncrement ? "+" : "-"} ${upPointsData.count}`}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ChangingPoints;
