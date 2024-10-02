import { combineReducers } from "@reduxjs/toolkit";
import products from "./productSlice";

const reducer = combineReducers({
  products,
});

export default reducer;
