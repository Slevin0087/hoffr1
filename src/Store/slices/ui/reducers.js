import { ANIMATIONS_ON, UI_STORE_KEYS } from "../../../Configs/UIConfigs";
import storage from "../../../utils/Storage";

export const setActivePageId = (state, action) => {
  state.activePageId = action.payload;
  storage.setItem(UI_STORE_KEYS.UI, state);
};
export const setReducedMotion = (state, action) => {
  state.reducedMotion = action.payload;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const reducers = {
  setActivePageId,
  setReducedMotion,
};
