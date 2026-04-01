// import { AchievementsConfig } from "../Configs/AchievementsConfigs";

// export const getAchievementActiveIcon = (achievementActiveId) => {
//   return AchievementsConfig?.find(
//     (achievement) => achievement?.id === achievementActiveId,
//   )?.icon;
// };

import { achievements } from "../Configs/AchievementsConfigs";

export const getAchievementActiveIcon = (achievementActiveId) => {
  return achievements?.[achievementActiveId]?.icon;
};
