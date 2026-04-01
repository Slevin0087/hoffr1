import cn from "classnames";
import PlayingCard from "../../../../../../Components/PlayingCard/PlayingCard";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectPileCardsIds } from "../../../../../../Store/slices/decks/selectors";
import { useRef } from "react";

function BaseTableau(props) {
  console.log("BaseTableau re-render");
  const { id, classNames, spanText } = props;
  const elementRef = useRef(null);
  const cardsIds = useSelector((state) =>
    selectPileCardsIds(state, id),
  );
  const topCardId = cardsIds?.[cardsIds.length - 1];
  console.log("BaseTableau cardsIds: ", cardsIds);

  const isSpanText = cardsIds?.length === 0;
  const classes = cn("pile", classNames);
  return (
    <Card id={id} ref={elementRef} className={classes}>
      {isSpanText && <span className="pile-span">{spanText}</span>}
      {cardsIds?.map((cardId) => {
        const isTopCardId = cardId === topCardId;
        return cardId ? (
          <PlayingCard key={cardId} cardId={cardId} pileId={id} isTopCard={isTopCardId}/>
        ) : null;
      })}
    </Card>
  );
}

export default BaseTableau;
