export const setActiveIdAppearanceByType = (state, action) => {
  const { type, id } = action.payload;
  state[type].activeId = id;
};

export const addAppearanceIdToUnlockedsIds = (state, action) => {
  const { type, id } = action.payload;
  state[type].lockedsIds = state[type].lockedsIds.filter(
    (lockedId) => lockedId !== id,
  );
  state[type].unlockedsIds.push(id);
};

export const reducers = {
  setActiveIdAppearanceByType,
  addAppearanceIdToUnlockedsIds,
};
