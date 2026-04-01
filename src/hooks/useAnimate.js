import { useSelector } from "react-redux";

export const useAnimate = (cardId) => {
  const animatingCardId = useSelector((state) => state.decks.animatingCardId);
  const isFaceUpAnimating = useSelector(
    (state) => state.decks.isFaceUpAnimating,
  );
  const isMoveAnimating = useSelector((state) => state.decks.isMoveAnimating);
  const isAnimating = animatingCardId === cardId;  
  const animate =
    isAnimating && isFaceUpAnimating ? { rotateY: 180 } : { rotateY: 0 };
  return { isAnimating, isMoveAnimating, animate };
};
