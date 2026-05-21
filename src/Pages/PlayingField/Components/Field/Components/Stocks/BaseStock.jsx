import cn from "classnames";
import PlayingCard from "../../../../../../Components/PlayingCard/PlayingCard";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import {
  selectIsHintShowPileById,
  selectPileCardsIds,
} from "../../../../../../Store/slices/decks/selectors";
import { handleStockClick } from "../../../../../../Store/slices/game/thunks";
import {
  selectIsCanRedeals,
  selectIsEventsInDeck,
} from "../../../../../../Store/slices/game/selectors";
import { useEffect } from "react";
import {
  // field_components_default_state,
  highlightDuration,
  span_text,
} from "../../../../../../Configs/FieldComponentsConfigs";
import { setIsHintShowPileById } from "../../../../../../Store/slices/decks/slice";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { decrementRedeals } from "../../../../../../Store/slices/game/slice";
import { selectIsNeedByRedealsShowing } from "../../../../../../Store/slices/ui/selectors";
import { setIsNeedByRedealsShowing } from "../../../../../../Store/slices/ui/slice";

function BaseStock(props) {
  const { id, classNames, spanText } = props;
  const dispatch = useDispatch();
  const cardsIds = useSelector((state) => selectPileCardsIds(state, id));
  const isHintShowing = useSelector((state) =>
    selectIsHintShowPileById(state, id),
  );
  console.log("BaseStock: ", isHintShowing);
  const isEventsInDeck = useSelector(selectIsEventsInDeck);
  const isCanRedeals = useSelector(selectIsCanRedeals);
  const isNeedByRedealsShowing = useSelector(selectIsNeedByRedealsShowing);
  const onClickStock = () => {
    if (isNeedByRedealsShowing) {
      dispatch(setIsNeedByRedealsShowing(false));
      dispatch(decrementRedeals());
      return;
    }
    dispatch(handleStockClick({ stockId: id }));
  };

  const isEmpty = cardsIds?.length === 0;

  const isSpanText = isEmpty && isCanRedeals;

  const classes = cn("pile", id, classNames, {
    "isHint-showing": isHintShowing,
  });
  const spanClasses = cn("pile-span", {
    "pile-span-need-by-redeals": isNeedByRedealsShowing,
  });
  console.log('BaseStock: ', classes);
  const needByRedealsText = span_text.needByRedealsText;

  const resultSpanText = isSpanText ? spanText : needByRedealsText;
  const opacity = 1;
  const pointerEvents = "auto";

  useEffect(() => {
    if (!isHintShowing) return;
    const payload = { pileId: id, value: false };
    if (isEventsInDeck) dispatch(setIsHintShowPileById(payload));
    else {
      const timer = setTimeout(() => {
        dispatch(setIsHintShowPileById(payload));
      }, highlightDuration);
      return () => clearTimeout(timer);
    }
  }, [isHintShowing, isEventsInDeck, id, dispatch]);

  return (
    <Card
      id={id}
      className={classes}
      onClick={onClickStock}
      style={{ opacity, pointerEvents }}
    >
      {(isSpanText || isNeedByRedealsShowing) && (
        <AnimatePresence mode="wait">
          <motion.span
            className={spanClasses}
            initial={isNeedByRedealsShowing ? { scale: 0, opacity: 0 } : false}
            animate={
              isNeedByRedealsShowing
                ? {
                    scale: [0.8, 1.1, 0.8],
                    opacity: [1, 1, 1],
                    transition: {
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : { scale: 1, opacity: 1 }
            }
            exit={isNeedByRedealsShowing ? { scale: 0, opacity: 0 } : false}
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
