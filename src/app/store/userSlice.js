import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import axios from 'axios';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import settingsConfig from 'app/configs/settingsConfig';

export const setUser = createAsyncThunk('signInUser/setUser', async (signInUser, { dispatch, getState }) => {
  /*
    You can redirect the logged-in user to a specific route depending on his role
    */
  if (signInUser.loginRedirectUrl) {
    settingsConfig.loginRedirectUrl = signInUser.loginRedirectUrl;
  }
  if(signInUser?.lastLoginEnabled){
    const response = await axios.get(process.env.REACT_APP_IP_INFO);
    const data = await response.data;
    let userAgent = window?.navigator?.userAgent;
    let browserName = "";
    let osName = "";
    if(userAgent){
      if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "Chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "Firefox";
      } else if (userAgent.match(/safari/i)) {
        browserName = "Safari";
        osName = "macOS";
      } else if (userAgent.match(/opr\//i)) {
        browserName = "Opera";
      } else if (userAgent.match(/edg/i)) {
        browserName = "Edge";
      } else {
        browserName = "Others";
      }
    }
  
    let loginActivity = {
      browser: browserName,
      osName: window?.navigator?.userAgentData ? window.navigator?.userAgentData?.platform : osName,
      ip: data?.ip,
      timezone: data?.timezone,
      location: {
        city: data?.city,
        region: data?.region,
        country: data?.country
      },
      dateTime: new Date()
    }
  
    let input = {
      _id: signInUser._id,
      lastLogin: loginActivity
    }
  
    const updateUserRes = await axios.patch('user-auth/update-profile', input);
  }
  return signInUser;
});

export const updateUserSettings = createAsyncThunk(
  'signInUser/updateSettings',
  async (settings, { dispatch, getState }) => {
    const { signInUser } = getState();
    const newUser = _.merge({}, signInUser, { data: { settings } });

   return newUser;
  }
);

export const logoutUser = () => async (dispatch, getState) => {
  const { signInUser } = getState();

  if (!signInUser.role || signInUser.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: '/',
  });

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const loginAsUser = createAsyncThunk(
  'userStore/user/loginAsUser',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post(`/user-auth/login-as`, inputJson);

    const data = await response.data;
    return data;
  }
);

const initialState = {
  role: [],
  data: {}
};

const userSlice = createSlice({
  name: 'signInUser',
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {
    [updateUserSettings.fulfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => action.payload
  },
});

export const { userLoggedOut } = userSlice.actions;

export const userSession = ({ signInUser }) => signInUser;

export default userSlice.reducer;
