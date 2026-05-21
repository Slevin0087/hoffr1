import { createSelector } from "@reduxjs/toolkit";

export const selectShop = (state) => state.shop;

export const selectShopCategoryById = createSelector(
  [(state) => selectShop(state), (_, id) => id],
  (shop, id) => shop[id],
);

export const selectShopSelectedItemByCategoryId = createSelector(
  [(state, categoryId) => selectShopCategoryById(state, categoryId)],
  (category) => category.selectedId,
);

export const selectShopOwnedsIdsByCategoryId = createSelector(
  [(state, categoryId) => selectShopCategoryById(state, categoryId)],
  (category) => category.ownedsItemsIds,
);

export const selectShopActiveCategoryId = createSelector(
  [(state) => selectShop(state)],
  (shop) => shop.activeCategoryId,
);

export const selectBalance = createSelector(
  [(state) => selectShop(state)],
  (shop) => shop.balance,
);

export const selectShopIsOwnedById = createSelector(
  [
    (state, categoryId) => selectShopOwnedsIdsByCategoryId(state, categoryId),
    (_, __, itemId) => itemId,
  ],
  (ownedsItemsIds, itemId) => ownedsItemsIds.includes(itemId),
);
