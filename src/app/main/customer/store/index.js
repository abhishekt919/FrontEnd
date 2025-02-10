import { combineReducers } from "@reduxjs/toolkit";
import customer from "./customerSlice";

const reducer = combineReducers({
    customer
});

export default reducer;