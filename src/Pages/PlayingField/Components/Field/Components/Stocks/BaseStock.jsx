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

function BaseStock(props) {
  const { height } = useWindowSize();
  const { id, classNames, spanText } = props;
  const dispatch = useDispatch();
  const cardsIds = useSelector((state) => selectPileCardsIds(state, id));
  const hintShowColor = useSelector((state) =>
    selectHintShowColorPileById(state, id),
  );
  const isEventsInDeck = useSelector(selectIsEventsInDeck);
  const isCanRedeals = useSelector(selectIsCanRedeals);
  const onClickStock = () => {
    console.log("onClickStock");
    dispatch(handleStockClick({ stockId: id }));
  };

  const isEmpty = cardsIds?.length === 0;

  const stockData = field_components_default_state[id];
  const portrait = stockData.overlap.portrait;
  const landscape = stockData.overlap.landscape;
  const overlap = height >= 600 ? portrait : landscape;
  const isSpanText = isEmpty && isCanRedeals;
  const isDisabled = !isCanRedeals && isEmpty;

  const classes = cn("pile", classNames);
  const opacity = isDisabled ? 0.5 : 1;
  const pointerEvents = isDisabled ? "none" : "auto";
  const boxShadow = hintShowColor
    ? `0 0 0 ${Math.abs(overlap.y) * cardsIds.length * 2}px ${hintShowColor}`
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
      {isSpanText && <span className="pile-span">{spanText}</span>}
      {cardsIds?.map((cardId) => (
        <PlayingCard key={cardId} cardId={cardId} pileId={id} />
      ))}
    </Card>
  );
}

export default BaseStock;
