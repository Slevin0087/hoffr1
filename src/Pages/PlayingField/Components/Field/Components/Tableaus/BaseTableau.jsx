import cn from "classnames";
import PlayingCard from "../../../../../../Components/PlayingCard/PlayingCard";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHintShowColorPileById,
  selectTableauHintsShowCardsIdsById,
} from "../../../../../../Store/slices/decks/selectors";
import { useDrop } from "react-dnd";
import {
  dndAccepts,
  dropTypes,
} from "../../../../../../Configs/PlayingCardsConfigs/DecksConfigs";
import { selectIsEventsInDeck } from "../../../../../../Store/slices/game/selectors";
import { useEffect } from "react";
import { setHintShowColorPileById } from "../../../../../../Store/slices/decks/slice";
import { highlightDuration } from "../../../../../../Configs/FieldComponentsConfigs";
import HintsShowComponent from "../../../../../../Components/PlayingCard/Components/HintsShowComponent";

function BaseTableau(props) {
  console.log("BaseTableau re-render");
  const dispatch = useDispatch();
  const { id, type, classNames, spanText } = props;
  const hintShowColor = useSelector((state) =>
    selectHintShowColorPileById(state, id),
  );

  const { hintsShowCarsIds, restCardsIds } = useSelector((state) =>
    selectTableauHintsShowCardsIdsById(state, id),
  );
  const cardsIds = [...hintsShowCarsIds, ...restCardsIds];
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
  const boxShadow = hintShowColor ? `0 0 0 3px ${hintShowColor}` : "";

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

  const isClassCanDrop = dropOutput.isOver && isEmpty;
  const classes = cn("pile", ...classNames, { "can-drop": isClassCanDrop });
  return (
    <Card id={id} ref={drop} className={classes} style={{ boxShadow }}>
      {isEmpty && <span className="pile-span">{spanText}</span>}
      {restCardsIds?.map((cardId) => {
        const isTopCardId = cardId === topCardId;
        return cardId ? (
          <PlayingCard
            key={cardId}
            cardId={cardId}
            pileId={id}
            isTopCard={isTopCardId}
            isTableauPileType={true}
          />
        ) : null;
      })}
      {hintsShowCarsIds?.length > 0 ? (
        <HintsShowComponent pileId={id} hintsShowCarsIds={hintsShowCarsIds} />
      ) : null}
    </Card>
  );
}

export default BaseTableau;
