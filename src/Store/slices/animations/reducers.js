import { ANIMATIONS_STORAGE_KEYS } from "../../../Configs/AnimationsConfigs";
import { ANIMATIONS_ON } from "../../../Configs/UIConfigs";
import storage from "../../../utils/Storage";

export const toggleAnimationsOn = (state) => {
  state.on =
    state.on === ANIMATIONS_ON.TRUE
      ? ANIMATIONS_ON.FALSE
      : ANIMATIONS_ON.TRUE;
  storage.setItem(ANIMATIONS_STORAGE_KEYS.ANIMATIONS, state);
};

export const setIsAnimatingCards = (state, action) => {
  state.entities.cards.isAnimating = action.payload;
  storage.setItem(ANIMATIONS_STORAGE_KEYS.ANIMATIONS, state);
};

export const reducers = { toggleAnimationsOn, setIsAnimatingCards };
