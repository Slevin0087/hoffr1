import { ACHIEVEMENTS_STORAGE_KEYS } from "../../../Configs/AchievementsConfigs";
import storage from "../../../utils/Storage";

export const setActiveAchievement = (state, action) => {
  const { activeId } = action.payload;
  state.activeId = activeId;
  storage.setItem(ACHIEVEMENTS_STORAGE_KEYS.ACHIEVEMENTS, state);
};

export const addAchInUnlocked = (state, action) => {
  const { id } = action.payload;
  state.activeId = id;
  state.unlockedIds.push(id);
  state.lockedIds = state.lockedIds.filter((lockedId) => lockedId !== id);
  storage.setItem(ACHIEVEMENTS_STORAGE_KEYS.ACHIEVEMENTS, state);
};

export const reducers = { setActiveAchievement, addAchInUnlocked };
