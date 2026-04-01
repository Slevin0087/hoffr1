import "./ChangingPoints.css";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
import { gameSessionStateTypes } from "../../../Configs/GameConfigs";
import { selectSessionDataByType } from "../../../Store/slices/game/selectors";
import { scoreOperations } from "../../../Configs/GameModes";
import { selectAnimationsEnabled } from "../../../Store/slices/settings/selectors";

function ChangingPoints(props) {
  const { cardId } = props;
  const sessionStateData = useSelector((state) =>
    selectSessionDataByType(state, gameSessionStateTypes.points),
  );
  console.log("sessionStateData: ", sessionStateData);
  const isCardChangingPoints = sessionStateData.cardId === cardId;
  const isAnimationsEnabled = useSelector(selectAnimationsEnabled);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="changing-points"
        initial={
          isAnimationsEnabled && { opacity: 0, x: "50%", y: "50%", scale: 0.5 }
        }
        animate={
          isCardChangingPoints &&
          isAnimationsEnabled && { opacity: 1, y: "-300%", scale: 1.2 }
        }
        exit={isAnimationsEnabled && { opacity: 0, y: "-300%", scale: 0.8 }}
        transition={isAnimationsEnabled && { duration: 2 }}
      >
        <div className="score-popup-content">
          <span className="score-value">{`${sessionStateData.operation === scoreOperations.increment ? "+" : "-"} ${sessionStateData.value}`}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ChangingPoints;
