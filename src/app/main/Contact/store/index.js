import { combineReducers } from "@reduxjs/toolkit";
import contact from "./contactSlice";

const reducer = combineReducers({
  contact
});

export default reducer;