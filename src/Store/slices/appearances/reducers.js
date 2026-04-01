import { APPEARANCES_STORAGE_KEYS } from "../../../Configs/AppearancesConfigs";
import storage from "../../../utils/Storage";

export const setSelectedIdAppearanceByType = (state, action) => {
  const { type, id } = action.payload;
  state[type].selectedId = id;
  storage.setItem(APPEARANCES_STORAGE_KEYS.APPEARANCES, state);
};

export const addAppearanceIdToOwnedsIds = (state, action) => {
  const { type, id } = action.payload;
  state[type].ownedsIds.push(id);
  storage.setItem(APPEARANCES_STORAGE_KEYS.APPEARANCES, state);
};

export const reducers = {
  setSelectedIdAppearanceByType,
  addAppearanceIdToOwnedsIds,
};
