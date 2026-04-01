import { createListenerMiddleware } from "@reduxjs/toolkit";
import { incrementRedeals, setIsEventsInDeck, updateCardOne } from "./slice";
import {
  clickCard,
  clickStock,
  dealCards,
  dealCardsFromStockToTableaus,
  flipCards,
  flipTopCardOne,
} from "./thunks";
import { addUndo } from "../undo/slice";
import {
  animationsTypes,
  sides,
} from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { delay, getAnimationMoveDuration } from "../../../utils/helpers";
import {
  incrementSessionState,
  incrementSessionStateByType,
} from "../game/slice";
import {
  gameSessionStateTypes,
  gameStateTypesValuesKeys,
} from "../../../Configs/GameConfigs";
import {
  selectAnimationsEnabled,
  selectSettingsByType,
} from "../settings/selectors";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import { calculateScoreByGameMode } from "../../../utils/gameModes";
import { field_components_type_ids } from "../../../Configs/FieldComponentsConfigs";
import { selectCard, selectPileCardsIds } from "./selectors";
import { getTopCardId } from "../../../utils/deckUtils";

const deckListeners = createListenerMiddleware();

deckListeners.startListening({
  actionCreator: dealCardsFromStockToTableaus.pending,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setIsEventsInDeck(true));
  },
});

deckListeners.startListening({
  actionCreator: dealCardsFromStockToTableaus.fulfilled,
  effect: async (action, listenerApi) => {
    console.log(
      "deckListeners dealCardsFromStockToTableaus.fulfilled: ",
      action,
    );
    const state = listenerApi.getState();
    const { willFlips } = action.payload;
    const isAnimationsEnabled = selectAnimationsEnabled(state);
    if (isAnimationsEnabled) {
      await delay(getAnimationMoveDuration(animationsTypes.flip));
    }
    for (const { cardId, pileId, sideType } of willFlips) {
      listenerApi.dispatch(
        flipTopCardOne({
          cardId,
          pileId,
          sideType,
        }),
      );
    }
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});

deckListeners.startListening({
  actionCreator: dealCardsFromStockToTableaus.rejected,
  effect: async (action, listenerApi) => {
    console.log(
      "deckListeners dealCardsFromStockToTableaus.rejected: ",
      action,
    );
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});

// deckListeners.startListening({
//   actionCreator: dealCards.pending,
//   effect: async (action, listenerApi) => {
//     listenerApi.dispatch(setIsEventsInDeck(true));
//   },
// });

deckListeners.startListening({
  actionCreator: dealCards.fulfilled,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const { isDealed, cardsIds, toPileId } = action.payload;
    if (!isDealed) {
      return;
    }
    const isAnimationsEnabled = selectAnimationsEnabled(state);
    if (isAnimationsEnabled) {
      for (const cardId of cardsIds) {
        listenerApi.dispatch(
          updateCardOne({
            pileId: toPileId,
            cardId,
            changes: {
              isAnimating: true,
              activeAnimations: [animationsTypes.move],
            },
          }),
        );
      }
      const animationMoveDuration = getAnimationMoveDuration();
      await delay(animationMoveDuration);
      for (const cardId of cardsIds) {
        listenerApi.dispatch(
          updateCardOne({
            pileId: toPileId,
            cardId,
            changes: {
              isAnimating: false,
              activeAnimations: [],
            },
          }),
        );
      }
    }
  },
});

deckListeners.startListening({
  actionCreator: dealCards.rejected,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});

deckListeners.startListening({
  actionCreator: clickCard.pending,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setIsEventsInDeck(true));
  },
});

deckListeners.startListening({
  actionCreator: clickCard.fulfilled,
  effect: async (action, listenerApi) => {
    const isCanMove = action.payload.isCanMove;
    if (!isCanMove) {
      listenerApi.dispatch(setIsEventsInDeck(false));
      return;
    }
    // const isDealed = action.payload.isDealed;
    // if (!isDealed) {
    //   listenerApi.dispatch(setIsEventsInDeck(false));
    //   return;
    // }
    const {
      fromPileId,
      isCanFlip,
      flipCardId,
      toPileId,
      cardsIds,
      cardClickId,
    } = action.payload;
    console.log("clickCard.fulfilled action.payload: ", action.payload);
    const deals = await listenerApi
      .dispatch(
        dealCards({
          id: cardClickId,
          isMoveUp: true,
          cardsIds,
          fromPileId,
          toPileId,
        }),
      )
      .unwrap();
    if (deals.isDealed) {
      const state = listenerApi.getState();
      const isAnimationsEnabled = selectAnimationsEnabled(state);
      const activeGameModeState = selectSettingsByType(
        state,
        gameSettingsTypes.gameMode,
      );
      if (isAnimationsEnabled) {
        await delay(getAnimationMoveDuration(animationsTypes.move) / 2);
      }
      if (isCanFlip && flipCardId) {
        const flips = await listenerApi
          .dispatch(
            flipCards({
              id: cardClickId,
              cardsIds: [flipCardId],
              pileId: fromPileId,
              sideType: sides.face,
            }),
          )
          .unwrap();
        if (flips.isFlipped) {
          console.log("flips.isFlipped: ", flips.isFlipped);
        }
      }
      // const state = listenerApi.getState();
      // const isAnimationsEnabled = selectAnimationsEnabled(state);
      // const activeGameModeState = selectSettingsByType(
      //   state,
      //   gameSettingsTypes.gameMode,
      // );
      // if (isAnimationsEnabled) {
      //   await delay(getAnimationMoveDuration(animationsTypes.move) / 2);
      // }

      // const { fromPileId } = action.payload;
      // const tableausIds = field_components_type_ids.tableaus;
      // const isFromTableau = tableausIds.includes(fromPileId);
      // if (isFromTableau) {
      //   const tableauCardsIds = selectPileCardsIds(state, fromPileId);
      //   const tableauCardId = getTopCardId(tableauCardsIds);
      //   console.log("tableauCardId: ", tableauCardId);
      //   const card = selectCard(state, tableauCardId);
      //   if (card?.side === sides.shirt) {
      //     const flips = await listenerApi
      //       .dispatch(
      //         flipCards({
      //           cardsIds: [tableauCardId],
      //           pileId: fromPileId,
      //           sideType: sides.face,
      //         }),
      //       )
      //       .unwrap();
      // if (flips.isFlipped) {
      //   result.isFlipped = true;
      //   result.flippeds.push(flips);
      //   const payload = {
      //     fromPileId,
      //   };
      //   const { count, operation } = calculateFlipPointsByGameMode(
      //     activeGameModeState.value,
      //     payload,
      //   );
      //   console.log("isFlipped points: ", count, operation);
      //   if (count > 0) {
      //     const resultPoints = calculatePoints(count, card.value);
      //     result.points.flipping = {
      //       count: resultPoints,
      //       operation,
      //     };
      //   }
      // }
      // }
    }
    // const isFliped = action.payload.isFlipped;
    // const score = calculateScoreByGameMode(
    //   activeGameModeState.value,
    //   action.payload,
    // );
    // const isScore = score.count > 0;
    // if (isScore) {
    //   console.log("fffffffff: ", score.value);
    //   listenerApi.dispatch(
    //     incrementSessionStateByType({
    //       type: gameSessionStateTypes.points,
    //       key: gameStateTypesValuesKeys.count,
    //       value: score.count,
    //       changesData: {
    //         cardId: action.payload.cardId,
    //         operation: score.operation,
    //         value: score.count,
    //       },
    //     }),
    //   );
    // }
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});

deckListeners.startListening({
  actionCreator: clickCard.rejected,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});

deckListeners.startListening({
  actionCreator: clickStock.pending,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setIsEventsInDeck(true));
  },
});

deckListeners.startListening({
  actionCreator: clickStock.fulfilled,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const isAnimationsEnabled = selectAnimationsEnabled(state);
    const activeGameModeState = selectSettingsByType(
      state,
      gameSettingsTypes.gameMode,
    );
    if (isAnimationsEnabled) {
      await delay(getAnimationMoveDuration(animationsTypes.move) / 2);
    }
    if (action.payload.reDealing) {
      listenerApi.dispatch(incrementRedeals());
    }
    console.log("clickStock.fulfilled action.payload: ", action.payload);
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});

deckListeners.startListening({
  actionCreator: clickStock.rejected,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});

deckListeners.startListening({
  actionCreator: flipTopCardOne.pending,
  effect: async (action, listenerApi) => {
    console.log("flipTopCardOne.pending: ", action);
    listenerApi.dispatch(setIsEventsInDeck(true));
  },
});

deckListeners.startListening({
  actionCreator: flipCards.fulfilled,
  effect: async (action, listenerApi) => {
    console.log("flipCards.fulfilled: ", action);
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});

deckListeners.startListening({
  actionCreator: flipCards.rejected,
  effect: async (action, listenerApi) => {
    console.log("flipCards.rejected: ", action);
    listenerApi.dispatch(setIsEventsInDeck(false));
  },
});

export default deckListeners;
