import { createSlice } from "@reduxjs/toolkit";
import { shuffle } from "../../../../utils/deckUtils";

export const createComponentSlice = ({ name, initialState }) =>
  createSlice({
    name,
    initialState,
    reducers: {
      addPlayingCardOne(state, action) {
        const { componentId, playingCard } = action.payload;
        const pile = state.entities[componentId];
        if (pile) {
          const updatedCard = {
            ...playingCard,
            pile: componentId,
            position: pile.playingCards.length,
          };
          pile.playingCards.push(updatedCard);
        }
      },
      addPlayingCardsMany(state, action) {
        const { componentId, playingCards } = action.payload;
        const pile = state.entities[componentId];
        if (pile) {
          for (const card of playingCards) {
            const updatedCard = {
              ...card,
              pile: componentId,
              position: pile.playingCards.length,
            };
            pile.playingCards.push(updatedCard);
          }
        }
      },
      removePlayingCardOne(state, action) {
        const { componentId, playingCardId } = action.payload;
        const pile = state.entities[componentId];
        if (pile) {
          pile.playingCards = pile.playingCards.filter(
            (card) => card.id !== playingCardId,
          );
        }
      },
      removePlayingCardsAll(state, action) {
        const { componentId } = action.payload;
        const pile = state.entities[componentId];
        if (pile) {
          pile.playingCards = [];
        }
      },
      shufflePile: (state, action) => {
        const { id } = action.payload;
        const pile = state.entities[id];
        if (pile) {
          const shuffledPlayingCards = shuffle([...pile.playingCards]);
          pile.playingCards = shuffledPlayingCards;
        }
      },
      updatePlayingCardOne: (state, action) => {
        const { componentId, playingCard, changes } = action.payload;
        const pile = state.entities[componentId];
        if (pile) {
          const cardIndex = pile.playingCards.findIndex(
            (card) => card.id === playingCard.id,
          );
          if (cardIndex === -1) {
            return;
          }
          pile.playingCards[cardIndex] = {
            ...pile.playingCards[cardIndex],
            ...changes,
          };
        }
      },
      updatePlayingCardsMany: (state, action) => {
        const { componentId, playingCards, changes } = action.payload;
        const pile = state.entities[componentId];
        if (pile) {
          for (const card of playingCards) {
            const cardIndex = pile.playingCards.indexOf(card);
            if (cardIndex === -1) {
              continue;
            }
            pile.playingCards[cardIndex] = {
              ...pile.playingCards[cardIndex],
              ...changes,
            };
          }
        }
      },
    },
  });
