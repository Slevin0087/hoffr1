import {
  PLAYING_CARD_SUITS,
  PLAYING_CARD_VALUES,
} from "../Configs/PlayingCardsConfigs/PlayingCardsConfigs";

export const calculateFacesPosition = (
  cardSuit,
  cardValue,
  manyColumns,
  manyLines,
) => {
  const suitIndex = [
    PLAYING_CARD_SUITS.HEARTS,
    PLAYING_CARD_SUITS.DIAMONDS,
    PLAYING_CARD_SUITS.CLUBS,
    PLAYING_CARD_SUITS.SPADES,
  ].indexOf(cardSuit);
  const valueIndex = PLAYING_CARD_VALUES.indexOf(cardValue);

  const x = (100 / (manyColumns - 1)) * valueIndex;
  const y = (100 / (manyLines - 1)) * suitIndex;

  return { x, y };
};
