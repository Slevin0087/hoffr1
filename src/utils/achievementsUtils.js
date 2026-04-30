import { achievements } from "../Configs/AchievementsConfigs";

export const getAchIconById = (achId) => {
  return achievements?.[achId]?.icon;
};

export const getAchPropertyById = (achId, property) => {
  return achievements?.[achId]?.[property];
};