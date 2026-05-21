import { ANIMATIONS_ON } from "../../../Configs/UIConfigs";

export const toggleAnimationsOn = (state) => {
  state.on =
    state.on === ANIMATIONS_ON.TRUE ? ANIMATIONS_ON.FALSE : ANIMATIONS_ON.TRUE;
};

export const setIsAnimatingCards = (state, action) => {
  state.entities.cards.isAnimating = action.payload;
};

export const reducers = { toggleAnimationsOn, setIsAnimatingCards };
