import { combineReducers } from '@reduxjs/toolkit';
import fuse from './fuse';
import i18n from './i18nSlice';
import countries from './countriesSlice';
import signInUser from './userSlice';
import profile from './userProfileSlice';
import company from './companySlice';

import payment from './shared/paymentSlice';
import machineTypes from './shared/machineTypesSlice';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    fuse,
    i18n,
    countries,
    signInUser,
    profile,
    company,
    payment,
    machineTypes,
    ...asyncReducers,
  });

  
  // Reset the redux store when user logged out.
   
  if (action.type === 'signInUser/userLoggedOut') {
    //state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
