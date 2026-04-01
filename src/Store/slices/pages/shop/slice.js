import { createSlice } from "@reduxjs/toolkit";
import {
  SHOP_DEFAULT_STATE,
  SHOP_SLICE_NAME,
  SHOP_STORAGE_KEYS,
} from "../../../../Configs/ShopConfigs";
import storage from "../../../../utils/Storage";
import { reducers } from "./reducers";

export const initialState =
  storage.getItem(SHOP_STORAGE_KEYS.SHOP) || SHOP_DEFAULT_STATE;

export const shopSlice = createSlice({
  name: SHOP_SLICE_NAME,
  initialState,
  reducers,
});

export const {
  setShopSelectedItemIdByCategoryId,
  setActiveCategoryId,
  addItemIdToOwneds,
} = shopSlice.actions;
export default shopSlice.reducer;
