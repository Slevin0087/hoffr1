import cn from "classnames";
import PlayingCard from "../../../../../../Components/PlayingCard/PlayingCard";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import {
  selectHintShowColorPileById,
  selectPileCardsIds,
} from "../../../../../../Store/slices/decks/selectors";
import { handleStockClick } from "../../../../../../Store/slices/game/thunks";
import {
  selectIsCanRedeals,
  selectIsEventsInDeck,
} from "../../../../../../Store/slices/game/selectors";
import { useEffect } from "react";
import {
  field_components_default_state,
  highlightDuration,
} from "../../../../../../Configs/FieldComponentsConfigs";
import { setHintShowColorPileById } from "../../../../../../Store/slices/decks/slice";
import useWindowSize from "../../../../../../hooks/useWindowSize";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { decrementRedeals } from "../../../../../../Store/slices/game/slice";

function BaseStock(props) {
  const { height } = useWindowSize();
  const { id, classNames, spanText, needByRedealsText } = props;
  const dispatch = useDispatch();
  const cardsIds = useSelector((state) => selectPileCardsIds(state, id));
  const hintShowColor = useSelector((state) =>
    selectHintShowColorPileById(state, id),
  );
  const isEventsInDeck = useSelector(selectIsEventsInDeck);
  const isCanRedeals = useSelector(selectIsCanRedeals);
  const onClickStock = () => {
    if (isNeedByRedeals) {
      console.log("onClickStock isNeedByRedeals: ", isNeedByRedeals);
      dispatch(decrementRedeals());
      return;
    }
    console.log("onClickStock");
    dispatch(handleStockClick({ stockId: id }));
  };

  const isEmpty = cardsIds?.length === 0;

  const isNeedByRedeals = isEmpty && !isCanRedeals;

  const stockData = field_components_default_state[id];
  const portrait = stockData.overlap.portrait;
  const landscape = stockData.overlap.landscape;
  const overlap = height >= 600 ? portrait : landscape;
  const isSpanText = isEmpty && isCanRedeals;
  // const isDisabled = !isCanRedeals && isEmpty;

  const classes = cn("pile", classNames);
  const spanClasses = cn("pile-span", {
    "pile-span-need-by-redeals": isNeedByRedeals,
  });

  const resultSpanText = isSpanText ? spanText : needByRedealsText;
  // const opacity = isDisabled ? 0.5 : 1;
  const opacity = 1;
  // const pointerEvents = isDisabled ? "none" : "auto";
  const pointerEvents = "auto";
  const boxShadow = hintShowColor
    ? // ? `0 0 0 ${isEmpty ? height / 100 : Math.abs(overlap.y) * cardsIds.length * 2}px ${hintShowColor}`
      `0 0 0 ${height / 100}px ${hintShowColor}`
    : "";

  useEffect(() => {
    if (!hintShowColor) return;
    const payload = { pileId: id, value: "" };
    if (isEventsInDeck) {
      dispatch(setHintShowColorPileById(payload));
    } else {
      const timer = setTimeout(() => {
        dispatch(setHintShowColorPileById(payload));
      }, highlightDuration);
      return () => clearTimeout(timer);
    }
  }, [hintShowColor, isEventsInDeck, id, dispatch]);

  return (
    <Card
      id={id}
      className={classes}
      onClick={onClickStock}
      style={{ boxShadow, opacity, pointerEvents }}
    >
      {(isSpanText || isNeedByRedeals) && (
        <AnimatePresence mode="wait">
          <motion.span
            className={spanClasses}
            initial={isNeedByRedeals ? { scale: 0, opacity: 0 } : false}
            animate={
              isNeedByRedeals
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 1, 1],
                    transition: {
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : { scale: 1, opacity: 1 }
            }
            exit={isNeedByRedeals ? { scale: 0, opacity: 0 } : false}
          >
            {resultSpanText}
          </motion.span>
        </AnimatePresence>
      )}
      {cardsIds?.map((cardId) => (
        <PlayingCard key={cardId} cardId={cardId} pileId={id} />
      ))}
    </Card>
  );
}

export default BaseStock;
