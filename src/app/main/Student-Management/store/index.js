import { combineReducers } from "@reduxjs/toolkit";
import students from "./studentSlice";
//import cart from "./cartSlice";

const reducer = combineReducers({
    students,
});

export default reducer;
