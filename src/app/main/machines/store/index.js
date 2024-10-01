import { combineReducers } from '@reduxjs/toolkit';
import machine from './machineSlice';
import machines from './machinesSlice';

const reducer = combineReducers({
  machine,
  machines
});

export default reducer;
