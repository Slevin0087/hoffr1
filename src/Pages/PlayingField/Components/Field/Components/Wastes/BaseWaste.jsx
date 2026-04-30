import cn from "classnames";
import PlayingCard from "../../../../../../Components/PlayingCard/PlayingCard.jsx";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectPileCardsIds } from "../../../../../../Store/slices/decks/selectors";

function BaseWaste(props) {
  console.log("BaseWaste re-render");
  const { id, classNames, spanText } = props;
  const cardsIds = useSelector((state) => selectPileCardsIds(state, id));
  const topCardId = cardsIds?.[cardsIds.length - 1];
  const isSpanText = cardsIds?.length === 0;
  const classes = cn("pile", classNames);
  
  return (
    <Card id={id} className={classes}>
      {isSpanText && <span className="pile-span">{spanText}</span>}
      {cardsIds?.map((cardId, index) => {
        const isTopCardId = cardId === topCardId;
        if (index === cardsIds.length - 1) {
          return cardId ? (
            <PlayingCard
              key={cardId}
              cardId={cardId}
              pileId={id}
              isTopCard={isTopCardId}
            />
          ) : null;
        }
        return cardId ? (
          <PlayingCard
            key={index}
            cardId={cardId}
            pileId={id}
            isTopCard={isTopCardId}
          />
        ) : null;
      })}
    </Card>
  );
}

export default BaseWaste;
