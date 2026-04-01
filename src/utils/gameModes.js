import {
  field_components_default_state,
  field_components_names,
} from "../Configs/FieldComponentsConfigs";
import { GAME_MODES_ITEMS } from "../Configs/GameModes";

export const getActiveGameModeScoring = (currentGameModeId) => {
  return GAME_MODES_ITEMS[currentGameModeId]?.scoring;
};

export const calculateScoreByGameMode = (currentGameModeId, payload) => {
  const scoring = getActiveGameModeScoring(currentGameModeId);
  const { fromPileId, toPileId } = payload;
  const fromPileData = field_components_default_state[fromPileId];
  const toPileData = field_components_default_state[toPileId];
  const toPileType = scoring?.moved?.to?.[toPileData?.type];
  const data = toPileType?.from?.[fromPileData?.type];
  return data ? data : { count: 0, operation: "" };
};

export const isIncrementScore = (toPileId) => {
  const foundationName = field_components_names.foundation;
  const isToFoundationPile = toPileId.startsWith(foundationName);
  return isToFoundationPile ? true : false;
};

export const calculateFlipPointsByGameMode = (currentGameModeId, payload) => {
  const scoring = getActiveGameModeScoring(currentGameModeId);
  const { fromPileId } = payload;
  const fromPileData = field_components_default_state[fromPileId];
  console.log("fromPileData: ", fromPileData);
  const data = scoring?.flipped?.[fromPileData?.type];
  console.log('data: ', scoring?.flipped);
  return data ? data : { count: 0, operation: "" };
};
