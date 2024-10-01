import { combineReducers } from '@reduxjs/toolkit';
import company from './companySlice';

const reducer = combineReducers({
  company
});

export default reducer;
