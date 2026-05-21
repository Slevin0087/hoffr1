export const reducersFns = {
  addCard(card, currentPile) {
    currentPile.cardsIds.push(card.id);
    currentPile.cards[card.id] = {
      ...card,
      position: currentPile.cardsIds.length - 1,
      pileId: currentPile.id,
    };
  },
  removeCard(cardId, currentPile) {
    delete currentPile.cards[cardId];
    currentPile.cardsIds = currentPile.cardsIds.filter((id) => id !== cardId);
  },
  addMultipleCards(pile, cards) {
    cards.forEach((card, index) => {
      this.addCard(pile, card, index);
    });
  },
};
