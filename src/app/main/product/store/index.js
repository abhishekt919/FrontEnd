import { combineReducers } from "@reduxjs/toolkit";
import products from "./productSlice";
import cart from "./cartSlice";

const reducer = combineReducers({
  products,
  cart
});

export default reducer;
