import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getProfile = createAsyncThunk(
  'userProfile/get',
  async (input, { dispatch, getState }) => {
    const response = await axios.post('user-auth/get-profile', input);

    const data = await response.data;
    if (data.messageId === 200) {
      return data.user;
    } else {
      return null;
    }
  }
);

export const updateProfile = createAsyncThunk(
  'userProfile/update',
  async (input, { dispatch, getState }) => {
    const response = await axios.patch('user-auth/update-profile', input);

    const data = await response.data;
    if (data.messageId === 200) {
      if(!input.type){
        dispatch(showMessage({ message: data.message }));
      }
      return data.user;
    } else {
      dispatch(showMessage({ message: data.message }));
      return null;
    }
  }
);

export const sendMobileVerifyCode = createAsyncThunk(
  'userProfile/sendMobileVerifyCode',
  async (input, { dispatch, getState }) => {
    const response = await axios.post('user-auth/send-mobile-verify-code', input);

    const data = await response.data;
    if (data.messageId === 200) {
      return data;
    } else {
      dispatch(showMessage({ message: data.message }));
      return null;
    }
  }
);

export const verifyMobile = createAsyncThunk(
  'userProfile/verifyMobile',
  async (input, { dispatch, getState }) => {
    const response = await axios.post('user-auth/mobile-verification', input);

    const data = await response.data;
    if (data.messageId === 200) {
      dispatch(showMessage({ message: data.message }));
      return data;
    } else {
      return data;
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: null,
  reducers: {},
  extraReducers: {
    [getProfile.pending]: (state, action) => action.payload,
    [getProfile.fulfilled]: (state, action) => action.payload,
    [updateProfile.pending]: (state, action) => action.payload,
    [updateProfile.fulfilled]: (state, action) => action.payload
  },
});

export const userProfile = ({ profile }) => profile;

export default userProfileSlice.reducer;


