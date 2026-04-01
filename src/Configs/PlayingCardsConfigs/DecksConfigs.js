import { joinPath } from "../../utils/helpers";
import {
  field_components_type_ids,
  field_components_types,
} from "../FieldComponentsConfigs";

export const DECKS_SLICE_NAME = "decks";

export const DECKS_IDS = {
  DECK_0: "deck-0",
};

export const DECK_STORAGE_KEYS = {
  DECK: "deck",
};

export const DECKS_COMPONENTS_INITIAL_STATE = {
  [field_components_type_ids.stocks[0]]: {
    id: field_components_type_ids.stocks[0],
    type: field_components_types.stocks,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.wastes[0]]: {
    id: field_components_type_ids.wastes[0],
    type: field_components_types.wastes,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.foundations[0]]: {
    id: field_components_type_ids.foundations[0],
    type: field_components_types.foundations,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.foundations[1]]: {
    id: field_components_type_ids.foundations[1],
    type: field_components_types.foundations,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.foundations[2]]: {
    id: field_components_type_ids.foundations[2],
    type: field_components_types.foundations,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.foundations[3]]: {
    id: field_components_type_ids.foundations[3],
    type: field_components_types.foundations,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.tableaus[0]]: {
    id: field_components_type_ids.tableaus[0],
    type: field_components_types.tableaus,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.tableaus[1]]: {
    id: field_components_type_ids.tableaus[1],
    type: field_components_types.tableaus,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.tableaus[2]]: {
    id: field_components_type_ids.tableaus[2],
    type: field_components_types.tableaus,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.tableaus[3]]: {
    id: field_components_type_ids.tableaus[3],
    type: field_components_types.tableaus,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.tableaus[4]]: {
    id: field_components_type_ids.tableaus[4],
    type: field_components_types.tableaus,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.tableaus[5]]: {
    id: field_components_type_ids.tableaus[5],
    type: field_components_types.tableaus,
    cardsIds: [],
    cards: {},
  },
  [field_components_type_ids.tableaus[6]]: {
    id: field_components_type_ids.tableaus[6],
    type: field_components_types.tableaus,
    cardsIds: [],
    cards: {},
  },
};

export const DECKS_DEFAULT_STATE = {
  ids: [DECKS_IDS.DECK_0],
  entities: {
    [DECKS_IDS.DECK_0]: {
      id: DECKS_IDS.DECK_0,
      piles: DECKS_COMPONENTS_INITIAL_STATE,
      draggedCards: {},
      currentStock: { id: field_components_type_ids.stocks[0], redeals: 0 },
      currentWasteId: field_components_type_ids.wastes[0],
      isCanCardClick: true,
      isEventsInDeck: false,
    },
  },
  currentId: DECKS_IDS.DECK_0,
};

const DECKS_THUNKS_TYPES = {
  ANIMATE: "animate",
  CARD_FLIP: "cardFlip",
  FLIP_CARD_ONE: "flipCard",
  CLICK_STOCK: "clickStock",
  MOVE_CARD: "moveCard",
  CLICK_CARD: "clickCard",
  MOVE_CARDS: "moveCards",
  DEAL_CARDS: "dealCards",
  DEAL_CARD_ONE: "dealCardOne",
};

export const DECKS_THUNKS = {
  ANIMATE: joinPath([DECKS_SLICE_NAME, DECKS_THUNKS_TYPES.ANIMATE]),
  CARD_FLIP: joinPath([DECKS_SLICE_NAME, DECKS_THUNKS_TYPES.CARD_FLIP]),
  FLIP_CARD_ONE: joinPath([DECKS_SLICE_NAME, DECKS_THUNKS_TYPES.FLIP_CARD_ONE]),
  CLICK_STOCK: joinPath([DECKS_SLICE_NAME, DECKS_THUNKS_TYPES.CLICK_STOCK]),
  MOVE_CARD: joinPath([DECKS_SLICE_NAME, DECKS_THUNKS_TYPES.MOVE_CARD]),
  CLICK_CARD: joinPath([DECKS_SLICE_NAME, DECKS_THUNKS_TYPES.CLICK_CARD]),
  MOVE_CARDS: joinPath([DECKS_SLICE_NAME, DECKS_THUNKS_TYPES.MOVE_CARDS]),
  DEAL_CARDS: joinPath([DECKS_SLICE_NAME, DECKS_THUNKS_TYPES.DEAL_CARDS]),
  DEAL_CARD_ONE: joinPath([DECKS_SLICE_NAME, DECKS_THUNKS_TYPES.DEAL_CARD_ONE]),
};
