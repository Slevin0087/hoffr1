export const reducersFns = {
  addCard(card, currentPile) {
    console.log('addCard card.side ДО: ', card.side);
    
    currentPile.cardsIds.push(card.id);
    currentPile.cards[card.id] = {
      ...card,
      position: currentPile.cardsIds.length - 1,
      pileId: currentPile.id,
    };
    console.log('addCard card.side ПОСЛЕ: ', card.side);
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
