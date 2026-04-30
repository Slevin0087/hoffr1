import { joinPath } from "../../utils/helpers";
import {
  field_components_type_ids,
  field_components_types,
} from "../FieldComponentsConfigs";
import { GAME_MODE_CLASSIC } from "../GameModes";

export const DECKS_SLICE_NAME = "decks";

export const DECKS_IDS = {
  DECK_0: "deck-0",
};

export const DECK_STORAGE_KEYS = {
  DECK: "deck",
};

export const typesForUndo = {
  clickCard: "clickCard",
  clickStock: "clickStock",
};

export const dndAccepts = {
  CARD: "CARD",
  PILE: "PILE",
};

export const dropTypes = {
  CARD: "CARD",
  PILE: "PILE",
};

export const DECKS_COMPONENTS_INITIAL_STATE = {
  [field_components_type_ids.stocks[0]]: {
    id: field_components_type_ids.stocks[0],
    type: field_components_types.stocks,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.wastes[0]]: {
    id: field_components_type_ids.wastes[0],
    type: field_components_types.wastes,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.foundations[0]]: {
    id: field_components_type_ids.foundations[0],
    type: field_components_types.foundations,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.foundations[1]]: {
    id: field_components_type_ids.foundations[1],
    type: field_components_types.foundations,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.foundations[2]]: {
    id: field_components_type_ids.foundations[2],
    type: field_components_types.foundations,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.foundations[3]]: {
    id: field_components_type_ids.foundations[3],
    type: field_components_types.foundations,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.tableaus[0]]: {
    id: field_components_type_ids.tableaus[0],
    type: field_components_types.tableaus,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.tableaus[1]]: {
    id: field_components_type_ids.tableaus[1],
    type: field_components_types.tableaus,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.tableaus[2]]: {
    id: field_components_type_ids.tableaus[2],
    type: field_components_types.tableaus,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.tableaus[3]]: {
    id: field_components_type_ids.tableaus[3],
    type: field_components_types.tableaus,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.tableaus[4]]: {
    id: field_components_type_ids.tableaus[4],
    type: field_components_types.tableaus,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.tableaus[5]]: {
    id: field_components_type_ids.tableaus[5],
    type: field_components_types.tableaus,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
  [field_components_type_ids.tableaus[6]]: {
    id: field_components_type_ids.tableaus[6],
    type: field_components_types.tableaus,
    cards: {},
    cardsIds: [],
    hintShowColor: "",
  },
};

export const DECKS_DEFAULT_STATE = {
  id: DECKS_IDS.DECK_0,
  piles: DECKS_COMPONENTS_INITIAL_STATE,
  draggingCards: {},
  currentStockId: field_components_type_ids.stocks[0],
  currentWasteId: field_components_type_ids.wastes[0],
  tableausShirtCardsIds: [],
};

export const DECKS_THUNKS_TYPES = {
  DEAL_CARD_ONE: "dealCardOne",
};

export const DECKS_THUNKS = {
  DEAL_CARD_ONE: joinPath([DECKS_SLICE_NAME, DECKS_THUNKS_TYPES.DEAL_CARD_ONE]),
};
