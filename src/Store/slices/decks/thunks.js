import { delay } from "../../../utils/helpers";
import { addCardOne, updateCardOne } from "./slice";
import { field_components_type_ids } from "../../../Configs/FieldComponentsConfigs";
import {
  selectCanMoveCardToPile,
  selectCard,
  selectIsEventsInDeck,
  selectPile,
  selectPileCardsIds,
  selectWasteId,
} from "./selectors";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DECKS_THUNKS } from "../../../Configs/PlayingCardsConfigs/DecksConfigs";
import {
  getNTopCardsIds,
  getPrevTopCardId,
  getTopCardId,
  getTopCardsIds,
} from "../../../utils/deckUtils";
import { sides } from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { selectSettingsByType } from "../settings/selectors";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import {
  calculateFlipPointsByGameMode,
  calculateScoreByGameMode,
} from "../../../utils/gameModes";
import { calculatePoints } from "../../../utils/gameSliceUtils";

export const dealCardsFromStockToTableaus = createAsyncThunk(
  DECKS_THUNKS.DEAL_CARDS,
  async ({ stockId }, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = {
        stockId,
        dealeds: [],
        willFlips: [],
        isDealCardsFromStockToTableaus: false,
        message: "No dealCardsFromStockToTableaus",
      };
      const tableausIds = field_components_type_ids.tableaus;
      const tableausCounts = tableausIds.length;
      await delay(5);
      for (
        let tableauCount = 0;
        tableauCount < tableausCounts;
        tableauCount++
      ) {
        for (let cardCount = 0; cardCount <= tableauCount; cardCount++) {
          const state = getState();
          const stockPile = selectPile(state, stockId);
          const topStockCardsId = getTopCardId(stockPile.cardsIds);
          const toPileId = tableausIds[tableauCount];
          const deals = await dispatch(
            dealCards({
              cardsIds: [topStockCardsId],
              fromPileId: stockId,
              toPileId,
            }),
          ).unwrap();
          if (deals.isDealed) {
            result.dealeds.push(deals);
            const isSideFace = cardCount === tableauCount;
            if (isSideFace) {
              const state = getState();
              const cardsIds = selectPileCardsIds(state, toPileId);
              const topCardId = getTopCardId(cardsIds);
              result.willFlips.push({
                cardId: topCardId,
                pileId: toPileId,
                sideType: sides.face,
              });
            }
          }
          result.isDealCardsFromStockToTableaus = true;
        }
      }
      return result;
    } catch (error) {
      return rejectWithValue({
        isDealCardsFromStockToTableaus: false,
        message: error.message,
        error,
      });
    }
  },
  {
    condition: ({ stockId }) => {
      console.log("stockId: ", stockId);
      if (!stockId) {
        return false;
      }
      return true;
    },
  },
);

export const dealCards = createAsyncThunk(
  DECKS_THUNKS.DEAL_CARD_ONE,
  async (
    { id = "", isMoveUp = false, cardsIds, fromPileId, toPileId },
    { dispatch },
  ) => {
    const result = {
      id,
      isMoveUp,
      isDealed: false,
      cardsIds: [],
      fromPileId,
      toPileId,
      message: `Deal cardsIds: ${cardsIds} from ${fromPileId} to ${toPileId}`,
    };
    for (const cardId of cardsIds) {
      console.log("цикл в dealCards: ", cardId);
      dispatch(
        addCardOne({
          cardId,
          fromPileId,
          toPileId,
        }),
      );
      result.cardsIds.push(cardId);
      console.log("result.cardsIds: ", result.cardsIds);
    }
    result.isDealed = true;
    return result;
  },
  {
    condition: ({ cardsIds, fromPileId, toPileId }) => {
      if (cardsIds.length === 0 || !fromPileId || !toPileId) {
        return false;
      }
      return true;
    },
  },
);

export const clickCard = createAsyncThunk(
  DECKS_THUNKS.CLICK_CARD,
  async (card, { dispatch, getState, rejectWithValue, requestId }) => {
    try {
      console.log("requestId: ", requestId);
      const result = {
        cardId: card?.id,
        fromPileId: card?.pileId,
        isCanMove: false,
        isCanFlip: false,
        flipCardId: null,
        toPileId: null,
        cardsIds: [],
        cardClickId: requestId,
        // isDealed: false,
        // dealeds: [],
        message: `Click cardId: ${card?.id}`,
        // points: {
        //   dealing: null,
        // },
      };
      const state = getState();
      const fromPileId = card?.pileId;
      const foundationsIds = field_components_type_ids.foundations;
      const tableausIds = field_components_type_ids.tableaus;
      const isCardFromTableau = tableausIds.includes(fromPileId);

      // const activeGameModeState = selectSettingsByType(
      //   state,
      //   gameSettingsTypes.gameMode,
      // );

      const cardsIds = isCardFromTableau
        ? getTopCardsIds(card.id, selectPileCardsIds(state, fromPileId))
        : [card.id];
      if (cardsIds.length === 0) {
        result.message = `Click cardId: ${card?.id} - no cardsIds`;
        return result;
      }
      const targetPiles =
        cardsIds.length === 1
          ? [...foundationsIds, ...tableausIds]
          : tableausIds;
      for (const targetPileId of targetPiles) {
        const isCanMove = selectCanMoveCardToPile(state, targetPileId, card);
        if (isCanMove) {
          if (isCardFromTableau) {
            const tableauCardsIds = selectPileCardsIds(state, fromPileId);
            const tableauPrevCardId = getPrevTopCardId(tableauCardsIds);
            const tableauPrevCard = selectCard(
              state,
              fromPileId,
              tableauPrevCardId,
            );
            const isCardShirtSide = tableauPrevCard?.side === sides.shirt;
            if (isCardShirtSide) {
              result.isCanFlip = true;
              result.flipCardId = tableauPrevCardId;
            }
          }
          result.isCanMove = isCanMove;
          result.toPileId = targetPileId;
          result.cardsIds = cardsIds;
          return result;
          // const deals = await dispatch(
          //   dealCards({
          //     cardsIds,
          //     fromPileId,
          //     toPileId: targetPileId,
          //   }),
          // ).unwrap();
          // if (deals.isDealed) {
          //   result.isDealed = deals.isDealed;
          //   result.dealeds.push(deals);
          //   result.toPileId = targetPileId;
          //   const payload = {
          //     fromPileId,
          //     toPileId: targetPileId,
          //   };
          //   const { count, operation } = calculateScoreByGameMode(
          //     activeGameModeState.value,
          //     payload,
          //   );
          //   if (count > 0) {
          //     const resultPoints = calculatePoints(count, card.value);
          //     result.points.dealing = {
          //       count: resultPoints,
          //       operation,
          //     };
          //   }
          //   return result;
          // }
        }
      }
      return result;
    } catch (error) {
      console.log("clickCard catch error: ", error);
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (card, { getState }) => {
      if (!card) return false;
      const state = getState();
      const isEventsInDeck = selectIsEventsInDeck(state);
      console.log("condition isEventsInDeck: ", isEventsInDeck);
      if (isEventsInDeck) return false;
      return true;
    },
  },
);

export const clickStock = createAsyncThunk(
  DECKS_THUNKS.CLICK_STOCK,
  async (stockId, { dispatch, getState }) => {
    const result = {
      isDealed: false,
      isFlipped: false,
      dealeds: [],
      flippeds: [],
      fromPileId: null,
      toPileId: null,
      reDealing: false,
    };
    const state = getState();
    const stockCardsIds = selectPileCardsIds(state, stockId);
    const wasteId = selectWasteId(state);
    if (stockCardsIds.length === 0) {
      const wasteCardsIds = selectPileCardsIds(state, wasteId);
      if (wasteCardsIds.length > 0) {
        result.fromPileId = wasteId;
        result.toPileId = stockId;
        result.reDealing = true;
        for (let i = wasteCardsIds.length - 1; i >= 0; i--) {
          const cardId = wasteCardsIds[i];
          const deals = await dispatch(
            dealCards({
              cardsIds: [cardId],
              fromPileId: wasteId,
              toPileId: stockId,
            }),
          ).unwrap();
          if (deals.isDealed) {
            result.dealeds.push(deals);
            const flips = await dispatch(
              flipCards({
                cardsIds: [cardId],
                pileId: stockId,
                sideType: sides.shirt,
              }),
            ).unwrap();
            if (flips.isFlipped) {
              result.flippeds.push(flips);
            }
          }
        }
        result.isDealed = result.dealeds.length > 0;
        result.isFlipped = result.flippeds.length > 0;
      }
      return result;
    } else {
      result.fromPileId = stockId;
      result.toPileId = wasteId;
      const dealingCards = selectSettingsByType(
        state,
        gameSettingsTypes.dealingCards,
      );
      const dealingCardsValue = parseInt(dealingCards.value);
      const stockTopCardsIds = getNTopCardsIds(
        stockCardsIds,
        dealingCardsValue,
      );
      const deals = await dispatch(
        dealCards({
          cardsIds: stockTopCardsIds,
          fromPileId: stockId,
          toPileId: wasteId,
        }),
      ).unwrap();
      if (deals.isDealed) {
        console.log("deals.isDealed: ", deals.isDealed);
        result.isDealed = true;
        result.dealeds.push(deals);
        const flips = await dispatch(
          flipCards({
            cardsIds: stockTopCardsIds,
            pileId: wasteId,
            sideType: sides.face,
          }),
        ).unwrap();
        if (flips.isFlipped) {
          result.isFlipped = true;
          result.flippeds.push(flips);
        }
      }
      return result;
    }
  },
  {
    condition: (stockId, { getState }) => {
      if (!stockId) return false;
      const state = getState();
      const isEventsInDeck = selectIsEventsInDeck(state);
      console.log("clickStock condition isEventsInDeck: ", isEventsInDeck);
      if (isEventsInDeck) return false;
      return true;
    },
  },
);

export const flipTopCardOne = createAsyncThunk(
  DECKS_THUNKS.FLIP_CARD_ONE,
  async ({ cardId, pileId, sideType }, { dispatch }) => {
    const result = {
      fliped: false,
      cardId,
      pileId,
      sideType,
    };
    dispatch(
      updateCardOne({
        cardId,
        pileId,
        changes: { side: sideType },
      }),
    );
    result.fliped = true;
    return result;
  },
  {
    condition: ({ cardId, pileId, sideType }) => {
      if (!cardId || !pileId || !sideType) return false;
      return true;
    },
  },
);

export const flipCards = createAsyncThunk(
  DECKS_THUNKS.FLIP_CARD_ONE,
  async ({ id = "", cardsIds, pileId, sideType }, { dispatch }) => {
    const result = {
      id,
      isFlipped: false,
      cardsIds: [],
      pileId,
      sideType,
    };
    for (const cardId of cardsIds) {
      dispatch(
        updateCardOne({
          cardId,
          pileId,
          changes: { side: sideType },
        }),
      );
      result.cardsIds.push(cardId);
    }
    result.isFlipped = true;
    return result;
  },
  {
    condition: ({ cardsIds, pileId, sideType }) => {
      console.log("flipCards condition: ", { cardsIds, pileId, sideType });
      if (!cardsIds || !pileId || !sideType) return false;
      return true;
    },
  },
);
