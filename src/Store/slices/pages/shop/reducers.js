import { SHOP_STORAGE_KEYS } from "../../../../Configs/ShopConfigs";
import storage from "../../../../utils/Storage";

export const setShopSelectedItemIdByCategoryId = (state, action) => {
  const { categoryId, id } = action.payload;
  state[categoryId].selectedId = id;
  storage.setItem(SHOP_STORAGE_KEYS.SHOP, state);
};

export const setActiveCategoryId = (state, action) => {
  state.activeCategoryId = action.payload;
  storage.setItem(SHOP_STORAGE_KEYS.SHOP, state);
};

export const addItemIdToOwneds = (state, action) => {
  const { categoryId, id } = action.payload;
  state[categoryId].ownedsItemsIds.push(id);
  storage.setItem(SHOP_STORAGE_KEYS.SHOP, state);
};

export const reducers = {
  setShopSelectedItemIdByCategoryId,
  setActiveCategoryId,
  addItemIdToOwneds,
};
