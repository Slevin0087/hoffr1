export const setShopSelectedItemIdByCategoryId = (state, action) => {
  const { categoryId, id } = action.payload;
  state[categoryId].selectedId = id;
};

export const setActiveCategoryId = (state, action) => {
  state.activeCategoryId = action.payload;
};

export const addItemIdToOwneds = (state, action) => {
  const { categoryId, id } = action.payload;
  state[categoryId].ownedsItemsIds.push(id);
};

export const reducers = {
  setShopSelectedItemIdByCategoryId,
  setActiveCategoryId,
  addItemIdToOwneds,
};
