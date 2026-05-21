import cn from "classnames";
import PlayingCard from "../../../../../../Components/PlayingCard/PlayingCard";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsHintShowPileById,
  selectPileCardsIds,
} from "../../../../../../Store/slices/decks/selectors";
import {
  dndAccepts,
  dropTypes,
} from "../../../../../../Configs/DecksConfigs";
import { useDrop } from "react-dnd";
import { selectIsEventsInDeck } from "../../../../../../Store/slices/game/selectors";
import { useEffect } from "react";
import { setIsHintShowPileById } from "../../../../../../Store/slices/decks/slice";
import { highlightDuration } from "../../../../../../Configs/FieldComponentsConfigs";

function BaseFoundation(props) {
  console.log("BaseFoundation re-render");
  const dispatch = useDispatch();
  const { id, type, classNames, spanText } = props;
  const cardsIds = useSelector((state) => selectPileCardsIds(state, id));
  const isHintShowing = useSelector((state) =>
    selectIsHintShowPileById(state, id),
  );
  const isEventsInDeck = useSelector(selectIsEventsInDeck);
  const topCardId = cardsIds?.[cardsIds.length - 1];
  const isEmpty = cardsIds?.length === 0;
  const dropData = { id, type, dropType: dropTypes.PILE, isCanDrop: isEmpty };

  const [dropOutput, drop] = useDrop({
    accept: dndAccepts.CARD,
    drop: () => dropData,
    canDrop: () => isEmpty,
    collect: (monitor) => {
      const isOver = monitor.isOver();
      const canDrop = monitor.canDrop();
      return { isOver, canDrop };
    },
  });

  useEffect(() => {
    if (!isHintShowing) return;
    const payload = { pileId: id, value: false };
    if (isEventsInDeck) {
      dispatch(setIsHintShowPileById(payload));
    } else {
      const timer = setTimeout(() => {
        dispatch(setIsHintShowPileById(payload));
      }, highlightDuration);
      return () => clearTimeout(timer);
    }
  }, [isHintShowing, isEventsInDeck, id, dispatch]);

  const isClassCanDrop = dropOutput.isOver && isEmpty;
  const classes = cn("pile", id, ...classNames, {
    "can-drop": isClassCanDrop,
    "isHint-showing": isHintShowing,
  });

  return (
    <Card id={id} ref={drop} className={classes}>
      {isEmpty && <span className="pile-span">{spanText}</span>}
      {cardsIds?.map((cardId) => {
        const isTopCardId = cardId === topCardId;
        return cardId ? (
          <PlayingCard
            key={cardId}
            cardId={cardId}
            pileId={id}
            isTopCard={isTopCardId}
          />
        ) : null;
      })}
    </Card>
  );
}

export default BaseFoundation;
