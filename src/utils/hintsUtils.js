import { selectTopCardIdByPileId } from "../Store/slices/decks/selectors";
import {
  setHintShowColorPileById,
  updateCardOne,
} from "../Store/slices/decks/slice";

export const setHintShowColor = (dispatch, getState, data) => {
  const { fromCardsIds, fromPileId, toPileId, isToPile } = data;
  console.log("setHintShowColor data: ", data);
  for (const fromCardId of fromCardsIds) {
    dispatch(
      updateCardOne({
        cardId: fromCardId,
        pileId: fromPileId,
        changes: { hintShowColor: "green" },
      }),
    );
  }
  if (isToPile) {
    console.log("setHintShowColor isToPile");
    dispatch(
      setHintShowColorPileById({
        pileId: toPileId,
        value: "yellow",
      }),
    );
  } else {
    const toCardId = selectTopCardIdByPileId(getState(), toPileId);
    dispatch(
      updateCardOne({
        cardId: toCardId,
        pileId: toPileId,
        changes: { hintShowColor: "yellow" },
      }),
    );
  }
};
