import { createSlice } from "@reduxjs/toolkit";
import {
  SHOP_DEFAULT_STATE,
  SHOP_SLICE_NAME,
} from "../../../Configs/ShopConfigs";
import { reducers } from "./reducers";

export const initialState = SHOP_DEFAULT_STATE;

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
