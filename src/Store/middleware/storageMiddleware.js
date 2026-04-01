import { GAME_STORAGE_KEYS } from "../../Configs/GameConfigs";
import { dealCardsFromStockToTableaus } from "../slices/decks/thunks";
import storage from "../../utils/Storage";

const actionsToWatch = [dealCardsFromStockToTableaus.fulfilled.type];
console.log("actionsToWatch: ", actionsToWatch);

export const storageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (actionsToWatch.includes(action.type)) {
    const state = store.getState();
    // if (action.type === dealCardsFromStockToTableaus.fulfilled.type) {
    //   console.log("fffffffffff");

    //   storage.setItem(GAME_STORAGE_KEYS.GAME, state.game);
    // }
  }
  return result;
};

export const loadState = () => {
  try {
    const serializedState = storage.getItem(GAME_STORAGE_KEYS.GAME);
    console.log("serializedState: ", serializedState);

    if (serializedState === null) {
      return undefined;
    }
    const { game } = serializedState;

    return game;
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};
