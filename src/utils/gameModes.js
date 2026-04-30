import { field_components_default_state } from "../Configs/FieldComponentsConfigs";
import { GAME_MODES_ITEMS } from "../Configs/GameModes";

export const getActiveGameModeScoring = (currentGameModeId) => {
  return GAME_MODES_ITEMS[currentGameModeId]?.scoring;
};

export const getActiveGameModeRules = (currentGameModeId) => {
  return GAME_MODES_ITEMS[currentGameModeId]?.rules;
};

export const getPointsByGameMode = (currentGameModeId, payload) => {
  const scoring = getActiveGameModeScoring(currentGameModeId);
  if (!scoring) return null;
  const { fromPileId, toPileId, cardId } = payload;
  if (!fromPileId || !toPileId || !cardId) return null;
  const fromPileData = field_components_default_state[fromPileId];
  const toPileData = field_components_default_state[toPileId];
  const toPileType = scoring?.moved?.to?.[toPileData?.type];
  const data = toPileType?.from?.[fromPileData?.type];
  return data ? data : null;
};

export const getFlipPointsByGameMode = (currentGameModeId, payload) => {
  const scoring = getActiveGameModeScoring(currentGameModeId);
  const { pileId } = payload;
  const pileData = field_components_default_state[pileId];
  const data = scoring?.flipped?.[pileData?.type];
  return data ? data : null;
};

export const getGameModeRulesByType = (currentGameModeId, type) => {
  const rules = getActiveGameModeRules(currentGameModeId);
  return rules?.[type];
};
