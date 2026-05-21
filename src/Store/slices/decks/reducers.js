import { field_components_type_ids } from "../../../Configs/FieldComponentsConfigs";
import { DECKS_COMPONENTS_INITIAL_STATE } from "../../../Configs/DecksConfigs";
import { getTopCardsIds, shuffle } from "../../../utils/deckUtils";
import { reducersFns } from "../../../utils/reducersFns";

export const initStockCards = (state, action) => {
  const { pileId, cards } = action.payload;
  for (let i = 0; i < cards.length; i++) {
    reducersFns.addCard(cards[i], state.piles[pileId]);
  }
};

export const addCardOne = (state, action) => {
  const { cardId, fromPileId, toPileId } = action.payload;
  const fromPile = state.piles[fromPileId];
  const toPile = state.piles[toPileId];
  reducersFns.addCard(fromPile.cards[cardId], toPile);
  reducersFns.removeCard(cardId, fromPile);
};

export const updateCardOne = (state, action) => {
  const { cardId, pileId, changes } = action.payload;
  const currentPile = state.piles[pileId];
  const cardIndex = currentPile.cardsIds.indexOf(cardId);
  if (cardIndex === -1) return;
  currentPile.cards[cardId] = { ...currentPile.cards[cardId], ...changes };
};

export const resetDeck = (state) => {
  state.piles = DECKS_COMPONENTS_INITIAL_STATE;
  state.draggingCards = {};
  state.currentStockId = field_components_type_ids.stocks[0];
  state.currentWasteId = field_components_type_ids.wastes[0];
  state.tableausShirtCardsIds = [];
};

export const setDraggingCards = (state, action) => {
  state.draggingCards = action.payload;
};

export const clearDraggingCards = (state) => {
  state.draggingCards = {};
};

export const setTabsShirtCardsIds = (state, action) => {
  const { cardsIds } = action.payload;
  state.tableausShirtCardsIds = cardsIds;
};

export const addTabsShirtCardIdOne = (state, action) => {
  const { cardId } = action.payload;
  state.tableausShirtCardsIds.push(cardId);
};

export const removeTabsShirtCardsIds = (state) => {
  state.tableausShirtCardsIds = [];
};

export const removeTabsShirtCardIdOne = (state, action) => {
  const { cardId } = action.payload;
  state.tableausShirtCardsIds = state.tableausShirtCardsIds.filter(
    (id) => id !== cardId,
  );
};

export const shuffleCardsByPileId = (state, action) => {
  const { pileId } = action.payload;
  if (state.piles[pileId].cardsIds.length > 1) {
    state.piles[pileId].cardsIds = shuffle(state.piles[pileId].cardsIds);
    const length = state.piles[pileId].cardsIds.length;
    for (let i = 0; i < length; i++) {
      const cardId = state.piles[pileId].cardsIds[i];
      state.piles[pileId].cards[cardId].position = i;
    }
  }
};

export const resetIsDraggingCardsByPileId = (state, action) => {
  const { pileId } = action.payload;
  const pile = state.piles[pileId];
  for (const cardId of pile.cardsIds) {
    const card = pile.cards[cardId];
    if (card?.isDragging) card.isDragging = false;
  }
};

export const setIsDraggingCardsByCardId = (state, action) => {
  const { cardId, pileId, value } = action.payload;
  const pile = state.piles[pileId];
  const draggingCardsIds = getTopCardsIds(cardId, pile.cardsIds);
  for (const id of draggingCardsIds) {
    pile.cards[id].isDragging = value;
  }
};

export const setIsHintShowPileById = (state, action) => {
  console.log("setIsHintShowPileById: ");
  const { pileId, value } = action.payload;
  state.piles[pileId].isHintShowing = value;
};

export const setIsHintShowing = (state, action) => {
  const { fromCardsIds, fromPileId, toPileId, toPileTopCardId } =
    action.payload;
  console.log("setIsHintShowing action.payload: ", action.payload);
  const currentFromPile = state.piles[fromPileId];
  const currentToPile = state.piles[toPileId];
  for (const cardId of fromCardsIds) {
    const cardIndex = currentFromPile.cardsIds.indexOf(cardId);
    if (cardIndex === -1) return;
    const changes = { isHintShowing: true };
    currentFromPile.cards[cardId] = {
      ...currentFromPile.cards[cardId],
      ...changes,
    };
  }
  if (toPileTopCardId === null) {
    state.piles[toPileId].isHintShowing = true;
  } else {
    const cardIndex = currentToPile.cardsIds.indexOf(toPileTopCardId);
    if (cardIndex === -1) return;
    const changes = { isHintShowing: true };
    currentToPile.cards[toPileTopCardId] = {
      ...currentToPile.cards[toPileTopCardId],
      ...changes,
    };
  }
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
  shuffleCardsByPileId,
  resetIsDraggingCardsByPileId,
  setIsDraggingCardsByCardId,
  setIsHintShowPileById,
  setIsHintShowing,
};
