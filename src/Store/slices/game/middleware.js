import { createListenerMiddleware } from "@reduxjs/toolkit";
import { undoUse } from "../undo/thunks";
import { decrementSessionStateByType, incrementSessionState } from "./slice";
import {
  gameSessionStateTypes,
  gameStateTypesValuesKeys,
} from "../../../Configs/GameConfigs";
import { scoreOperations } from "../../../Configs/GameModes";

export const gameListeners = createListenerMiddleware();

gameListeners.startListening({
  actionCreator: undoUse.fulfilled,
  effect: async (action, listenerApi) => {
    console.log("gameListeners: ", action);
    listenerApi.dispatch(
      incrementSessionState({
        type: gameSessionStateTypes.moves,
        key: gameStateTypesValuesKeys.count,
      }),
    );
    const isScore = action.payload.score?.count > 0;
    if (isScore) {
      const score = action.payload.score;
      listenerApi.dispatch(
        decrementSessionStateByType({
          type: gameSessionStateTypes.points,
          key: gameStateTypesValuesKeys.count,
          value: score.count,
          changesData: {
            cardId: action.payload.cardId,
            operation:
              score.operation === scoreOperations.increment
                ? scoreOperations.decrement
                : scoreOperations.increment,
            value: score.count,
          },
        }),
      );
    }
  },
});
