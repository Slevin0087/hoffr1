import cn from "classnames";
import PlayingCard from "../../../../../../Components/PlayingCard/PlayingCard";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { clickStock } from "../../../../../../Store/slices/decks/thunks";
import { selectPileCardsIds } from "../../../../../../Store/slices/decks/selectors";

function BaseStock(props) {
  const { id, classNames, spanText } = props;
  const dispatch = useDispatch();
  const cardsIds = useSelector((state) => selectPileCardsIds(state, id));
  const onClickStock = () => {
    console.log("onClickStock");
    dispatch(clickStock(id));
  };
  const topCardId = cardsIds?.[cardsIds.length - 1];
  const isSpanText = !cardsIds?.length;
  const classes = cn("pile", classNames);

  return (
    <Card id={id} className={classes} onClick={onClickStock}>
      {isSpanText && <span className="pile-span">{spanText}</span>}
      {cardsIds?.map((cardId) => (
        <PlayingCard
          key={cardId}
          cardId={cardId}
          pileId={id}
          isTopCard={cardId === topCardId}
        />
      ))}
    </Card>
  );
}

export default BaseStock;
