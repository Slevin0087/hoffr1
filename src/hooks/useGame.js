import { cleaningCurrentDeck, initStockCards } from "../Store/slices/decks/slice";
import { createDeckAndShuffle } from "../utils/deckUtils";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameStatus } from "../Store/slices/game/slice";
import { GAME_STATUSES } from "../Configs/GameConfigs";
import { dealCardsFromStockToTableaus } from "../Store/slices/decks/thunks";
import { selectStockId } from "../Store/slices/decks/selectors";

export const useGame = () => {
  const dispatch = useDispatch();
  const stockId = useSelector(selectStockId);
  const newGame = useCallback(() => {
    dispatch(setGameStatus(GAME_STATUSES.LOADING));
    const cards = createDeckAndShuffle();
    dispatch(cleaningCurrentDeck());
    dispatch(
      initStockCards({
        pileId: stockId,
        cards,
      }),
    );
    console.log('ПЕРЕД dealCardsFromStockToTableaus');
    
    dispatch(dealCardsFromStockToTableaus({ stockId }));
  }, [dispatch, stockId]);

  return { newGame };
};
