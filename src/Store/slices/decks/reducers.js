import { field_components_type_ids } from "../../../Configs/FieldComponentsConfigs";
import {
  DECK_STORAGE_KEYS,
  DECKS_COMPONENTS_INITIAL_STATE,
} from "../../../Configs/PlayingCardsConfigs/DecksConfigs";
import storage from "../../../utils/Storage";
import { reducersFns } from "../../../utils/reducersFns";

export const initStockCards = (state, action) => {
  const { pileId, cards } = action.payload;
  const deckId = state.currentId;
  const pile = state.entities[deckId].piles[pileId];
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    reducersFns.addCard(card, pile);
  }
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const incrementRedeals = (state) => {
  const currentDeckId = state.currentId;
  state.entities[currentDeckId].currentStock.redeals += 1;
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const addCardOne = (state, action) => {
  const { cardId, fromPileId, toPileId } = action.payload;
  const deckId = state.currentId;
  const fromPile = state.entities[deckId].piles[fromPileId];
  const toPile = state.entities[deckId].piles[toPileId];
  const card = fromPile.cards[cardId];
  reducersFns.addCard(card, toPile);
  reducersFns.removeCard(cardId, fromPile);
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const updateCardOne = (state, action) => {
  const { cardId, pileId, changes } = action.payload;
  const currentDeckId = state.currentId;
  const currentPile = state.entities[currentDeckId].piles[pileId];
  const cardsIds = currentPile.cardsIds;
  const cards = currentPile.cards;
  const cardIndex = cardsIds.indexOf(cardId);
  if (cardIndex === -1) return;
  cards[cardId] = {
    ...cards[cardId],
    ...changes,
  };
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const cleaningCurrentDeck = (state) => {
  state.entities[state.currentId] = {
    ...state.entities[state.currentId],
    piles: DECKS_COMPONENTS_INITIAL_STATE,
    draggedCards: {},
    currentStock: { id: field_components_type_ids.stocks[0], redeals: 0 },
    currentWasteId: field_components_type_ids.wastes[0],
    isCanCardClick: true,
  };
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const setDraggedCards = (state, action) => {
  const currentDeckId = state.currentId;
  state.entities[currentDeckId].draggedCards = action.payload;
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const clearDraggedCards = (state) => {
  const currentDeckId = state.currentId;
  state.entities[currentDeckId].draggedCards = {};
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const setIsEventsInDeck = (state, action) => {
  const currentDeckId = state.currentId;
  state.entities[currentDeckId].isEventsInDeck = action.payload;
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const reducers = {
  initStockCards,
  incrementRedeals,
  addCardOne,
  updateCardOne,
  cleaningCurrentDeck,
  setDraggedCards,
  clearDraggedCards,
  setIsEventsInDeck,
};
