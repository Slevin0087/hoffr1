import { appearancesObjs } from "../Configs/AppearancesConfigs";

export const getUnlockedsAppearancesIds = (allLockedsIds, allPoints) => {
  const unlockedsIds = [];
  for (const lockedId of allLockedsIds) {
    console.log("getUnlockedsAppearancesIds lockedId: ", lockedId);
    const appearance = appearancesObjs[lockedId];
    if (appearance.requiredPoints <= allPoints) {
      unlockedsIds.push({ id: lockedId, type: appearance.type });
    }
  }
  return unlockedsIds;
};
