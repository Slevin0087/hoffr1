import { field_components_type_ids } from "../../../Configs/FieldComponentsConfigs";
import { GAME_MODE_CLASSIC } from "../../../Configs/GameModes";
import {
  DECK_STORAGE_KEYS,
  DECKS_COMPONENTS_INITIAL_STATE,
} from "../../../Configs/PlayingCardsConfigs/DecksConfigs";
import storage from "../../../utils/Storage";
import { getTopCardsIds, shuffle } from "../../../utils/deckUtils";
import { reducersFns } from "../../../utils/reducersFns";

export const initStockCards = (state, action) => {
  const { pileId, cards } = action.payload;
  for (let i = 0; i < cards.length; i++) {
    reducersFns.addCard(cards[i], state.piles[pileId]);
  }
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const addCardOne = (state, action) => {
  const { cardId, fromPileId, toPileId } = action.payload;
  const fromPile = state.piles[fromPileId];
  const toPile = state.piles[toPileId];
  reducersFns.addCard(fromPile.cards[cardId], toPile);
  reducersFns.removeCard(cardId, fromPile);
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const updateCardOne = (state, action) => {
  const { cardId, pileId, changes } = action.payload;
  const currentPile = state.piles[pileId];
  const cardIndex = currentPile.cardsIds.indexOf(cardId);
  if (cardIndex === -1) return;
  currentPile.cards[cardId] = { ...currentPile.cards[cardId], ...changes };
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const resetDeck = (state) => {
  state.piles = DECKS_COMPONENTS_INITIAL_STATE;
  state.draggingCards = {};
  state.currentStockId = field_components_type_ids.stocks[0];
  state.currentWasteId = field_components_type_ids.wastes[0];
  state.tableausShirtCardsIds = [];
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const setDraggingCards = (state, action) => {
  state.draggingCards = action.payload;
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const clearDraggingCards = (state) => {
  state.draggingCards = {};
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const setTabsShirtCardsIds = (state, action) => {
  const { cardsIds } = action.payload;
  state.tableausShirtCardsIds = cardsIds;
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const addTabsShirtCardIdOne = (state, action) => {
  const { cardId } = action.payload;
  state.tableausShirtCardsIds.push(cardId);
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const removeTabsShirtCardsIds = (state) => {
  state.tableausShirtCardsIds = [];
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const removeTabsShirtCardIdOne = (state, action) => {
  const { cardId } = action.payload;
  state.tableausShirtCardsIds = state.tableausShirtCardsIds.filter(
    (id) => id !== cardId,
  );
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const shuffleStockCardsIds = (state, action) => {
  const { stockId } = action.payload;
  state.piles[stockId].cardsIds = shuffle(state.piles[stockId].cardsIds);
  const length = state.piles[stockId].cardsIds.length;
  for (let i = 0; i < length; i++) {
    const cardId = state.piles[stockId].cardsIds[i];
    state.piles[stockId].cards[cardId].position = i;
  }
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const resetIsDraggingCardsByPileId = (state, action) => {
  const { pileId } = action.payload;
  const pile = state.piles[pileId];
  for (const cardId of pile.cardsIds) {
    const card = pile.cards[cardId];
    if (card?.isDragging) card.isDragging = false;
  }
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const setIsDraggingCardsByCardId = (state, action) => {
  const { cardId, pileId, value } = action.payload;
  const pile = state.piles[pileId];
  const draggingCardsIds = getTopCardsIds(cardId, pile.cardsIds);
  for (const id of draggingCardsIds) {
    pile.cards[id].isDragging = value;
  }
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const setHintShowColorPileById = (state, action) => {
  const { pileId, value } = action.payload;
  state.piles[pileId].hintShowColor = value;
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const setHintShowColor = (state, action) => {
  const { fromCardsIds, fromPileId, toPileId, toPileTopCardId } =
    action.payload;
  console.log("setHintShowColor action.payload: ", action.payload);
  const currentFromPile = state.piles[fromPileId];
  const currentToPile = state.piles[toPileId];
  for (const cardId of fromCardsIds) {
    const cardIndex = currentFromPile.cardsIds.indexOf(cardId);
    if (cardIndex === -1) return;
    const changes = { hintShowColor: "green" };
    currentFromPile.cards[cardId] = {
      ...currentFromPile.cards[cardId],
      ...changes,
    };
  }
  if (toPileTopCardId === null) {
    state.piles[toPileId].hintShowColor = "yellow";
  } else {
    const cardIndex = currentToPile.cardsIds.indexOf(toPileTopCardId);
    if (cardIndex === -1) return;
    const changes = { hintShowColor: "yellow" };
    currentToPile.cards[toPileTopCardId] = {
      ...currentToPile.cards[toPileTopCardId],
      ...changes,
    };
  }
  storage.setItem(DECK_STORAGE_KEYS.DECK, state);
};

export const reducers = {
  initStockCards,
  addCardOne,
  updateCardOne,
  resetDeck,
  setDraggingCards,
  clearDraggingCards,
  setTabsShirtCardsIds,
  addTabsShirtCardIdOne,
  removeTabsShirtCardsIds,
  removeTabsShirtCardIdOne,
  shuffleStockCardsIds,
  resetIsDraggingCardsByPileId,
  setIsDraggingCardsByCardId,
  setHintShowColorPileById,
  setHintShowColor,
};
