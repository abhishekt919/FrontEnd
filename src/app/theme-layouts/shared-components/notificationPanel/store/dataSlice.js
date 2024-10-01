import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getNotifications = createAsyncThunk(
  'notificationPanel/data/getNotifications',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post('company/notifications/get-latest-10', inputJson);
    const data = await response.data;
    return data;
  });


export const markAsReadAll = createAsyncThunk(
  'notificationPanel/data/markAsReadAll',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post('company/notifications/mark-read', inputJson);
    const data = await response.data;
    return data;
  });

export const deleteAll = createAsyncThunk(
  'notificationPanel/data/deleteAll',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post('/company/notifications/delete-all', inputJson);
    const data = await response.data;
    return data;
  });

export const deleteNotification = createAsyncThunk(
  'notificationPanel/data/deleteNotification',
  async (_id, { dispatch, getState }) => {
    const response = await axios.delete(`/company/notifications/delete/${_id}`);
    const data = await response.data;
    return data;
  });

const dataSlice = createSlice({
  name: 'notificationPanel/data',
  initialState: {
    notifications: []
  },
  reducers: {},
  extraReducers: {
    [getNotifications.fulfilled]: (state, action) => ({ ...state, notifications: action.payload.data }),
    [markAsReadAll.fulfilled]: (state, action) => ({ ...state, notifications: action.payload.data }),
    [deleteNotification.fulfilled]: (state, action) => ({ ...state, notifications: action.payload.data }),
    [deleteAll.fulfilled]: (state, action) => ({ ...state, notifications: action.payload.data }),
  },
});

export const selectNotifications = ({ notificationPanel }) => notificationPanel.data.notifications;

export default dataSlice.reducer;
