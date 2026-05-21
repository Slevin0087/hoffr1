export const setActiveAchievement = (state, action) => {
  const { activeId } = action.payload;
  state.activeId = activeId;
};

export const addAchInUnlocked = (state, action) => {
  const { id } = action.payload;
  state.activeId = id;
  state.unlockedIds.push(id);
  state.lockedIds = state.lockedIds.filter((lockedId) => lockedId !== id);
};

export const reducers = { setActiveAchievement, addAchInUnlocked };
