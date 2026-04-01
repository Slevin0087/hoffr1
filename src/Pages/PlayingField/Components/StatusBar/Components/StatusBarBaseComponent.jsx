import "./StatusBarBaseComponent.css";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "motion/react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectAnimationsEnabled } from "../../../../../Store/slices/settings/selectors";
import { scoreOperations } from "../../../../../Configs/GameModes";

function StatusBarBaseComponent(props) {
  const {
    leftText = "",
    centerText = "",
    rightText = "",
    ariaLabel = "",
    isAnimationComponent = false,
    colorChange = true,
    operation = scoreOperations.increment,
  } = props;
  const isMounted = useRef(false);
  const prevValue = useRef(rightText);
  const animateControl = useAnimation();
  const isAnimationsEnabled = useSelector(selectAnimationsEnabled);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      prevValue.current = rightText;
      return;
    }
    const isAnimation = isAnimationComponent && isAnimationsEnabled;
    const isChangeValue = prevValue.current !== rightText;
    if (isChangeValue && isAnimation) {
      console.log('operation: ', operation, operation === scoreOperations.increment);
      const upColor =
        colorChange && operation === scoreOperations.increment
          ? "#ffd700"
          : "#8a0000";
      const animation = {
        scale: [1, 1.4, 1],
        color: ["#000000", upColor, "#000000"],
        border: [
          "1px solid #000000",
          `1px solid ${upColor}`,
          "1px solid #000000",
        ],
        textShadow: [
          "0 0 0px rgba(255,215,0,0)",
          "0 0 10px rgba(255,215,0,0.8)",
          "0 0 0px rgba(255,215,0,0)",
        ],
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      };
      animateControl.start(animation);
      prevValue.current = rightText;
    }
  }, [
    rightText,
    animateControl,
    isAnimationsEnabled,
    isAnimationComponent,
    operation,
    colorChange,
  ]);
  return (
    <div className="status-bar-cell" title={ariaLabel} aria-label={ariaLabel}>
      <span className="status-bar-span">{leftText}</span>
      {centerText && <span className="status-bar-span">{centerText}</span>}
      <motion.span
        className="status-bar-span status-bar-span-border"
        animate={animateControl}
      >
        {rightText}
      </motion.span>
    </div>
  );
}

export default StatusBarBaseComponent;
