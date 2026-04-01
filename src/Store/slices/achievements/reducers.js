import { ACHIEVEMENTS_STORAGE_KEYS } from "../../../Configs/AchievementsConfigs";
import storage from "../../../utils/Storage";

export const setActiveAchievement = (state, action) => {
  const { activeId } = action.payload;
  state.achievements.activeId = activeId;
  storage.setItem(ACHIEVEMENTS_STORAGE_KEYS.ACHIEVEMENTS, state);
};

export const reducers = { setActiveAchievement };
