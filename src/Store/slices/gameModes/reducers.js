export const setGameModeActiveId = (state, action) => {
  state.activeId = action.payload;
};

export const reducers = {
  setGameModeActiveId,
};
