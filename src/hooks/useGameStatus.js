import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameStatus } from '../Store/slices/gameSlice';

export const useGameStatus = () => {
  const dispatch = useDispatch();
  const foundations = useSelector((state) => state.game.foundations);
  const status = useSelector((state) => state.game.status);

  useEffect(() => {
    if (status !== 'playing') {
      return;
    }

    const cardsInFoundations = Object.values(foundations).reduce(
      (count, pile) => count + pile.playingCards.length,
      0
    );

    if (cardsInFoundations === 52) {
      dispatch(setGameStatus('won'));
    }

    // TODO: Add loss condition check
    // A player loses if there are no more possible moves.
    // This is more complex and will be implemented later.

  }, [foundations, status, dispatch]);
};
