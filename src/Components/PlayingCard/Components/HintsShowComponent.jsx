import { useMemo } from "react";
import { PLAYING_CARDS_STYLE_CONSTANT } from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { useSelector } from "react-redux";
import { selectCard, selectPile } from "../../../Store/slices/decks/selectors";
import {
  calculateHintShowTableauCard,
  getCardOffset2,
} from "../../../utils/deckUtils";
import PlayingCard from "../PlayingCard";
import useWindowSize from "../../../hooks/useWindowSize";

const CARD_WIDTH = `var(${PLAYING_CARDS_STYLE_CONSTANT.WIDTH})`;
const CARD_HEIGHT = `var(${PLAYING_CARDS_STYLE_CONSTANT.HEIGHT})`;

function HintsShowComponent(props) {
  const { height } = useWindowSize();
  const { pileId, hintsShowCarsIds } = props;
  const currentPile = useSelector((state) => selectPile(state, pileId));
  const firstCard = useSelector((state) =>
    selectCard(state, pileId, hintsShowCarsIds[0]),
  );

  const offsets = calculateHintShowTableauCard(
    hintsShowCarsIds,
    pileId,
    height,
  );

  const firstCardOffset = getCardOffset2(firstCard.id, currentPile, height);
  const cardPositions = useMemo(() => {
    if (!hintsShowCarsIds?.length) return [];

    return hintsShowCarsIds.map((cardId) => {
      const cardOffset = getCardOffset2(cardId, currentPile, height);
      return {
        x: cardOffset.x,
        y: cardOffset.y,
      };
    });
  }, [hintsShowCarsIds, currentPile, height]);

  const bounds = useMemo(() => {
    if (!cardPositions.length) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    return {
      minX: Math.min(...cardPositions.map((p) => p.x)),
      minY: Math.min(...cardPositions.map((p) => p.y)),
      maxX: Math.max(...cardPositions.map((p) => p.x)),
      maxY: Math.max(...cardPositions.map((p) => p.y)),
    };
  }, [cardPositions]);

  return (
    <div
      id="hints-layer"
      style={{
        position: "absolute",
        left: 0,
        top: firstCardOffset.y,
        zIndex: firstCard.position,
        width: `calc(${CARD_WIDTH} + ${bounds.maxX - bounds.minX}px)`,
        height: `calc(${CARD_HEIGHT} + ${bounds.maxY - bounds.minY}px)`,
        boxShadow:
          hintsShowCarsIds.length > 0 && `0 0 0 5px ${firstCard.hintShowColor}`,
      }}
    >
      {hintsShowCarsIds.map((cardId) => {
        const isTopCardId =
          cardId === hintsShowCarsIds[hintsShowCarsIds.length - 1];
        return (
          <PlayingCard
            key={cardId}
            cardId={cardId}
            pileId={pileId}
            isTopCardId={isTopCardId}
            isHintShowCardInTableauPile={true}
            isHintShowCardInTableauPileOverlapY={offsets[cardId].y}
          />
        );
      })}
    </div>
  );
}

export default HintsShowComponent;
