import { combineReducers } from "@reduxjs/toolkit";
import events from "./eventSlice";

const reducer = combineReducers({
    events
});

export default reducer;