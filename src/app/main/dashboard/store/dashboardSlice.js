import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsersCount = createAsyncThunk(
  'dashboardApp/dashboard/getUsersCount',
  async (companyId) => {
    const response = await axios.get(`/users/count/${companyId}`);
    const data = await response.data;
    return data;
  }
);

export const getMachinesCount = createAsyncThunk(
  'dashboardApp/dashboard/getMachinesCount',
  async (companyId) => {
    const response = await axios.get(`/machines/count/${companyId}`);
    const data = await response.data;
    return data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboardApp/dashboard',
  initialState: {
    usersCount: null,
    machinesCount: null
  },
  reducers: {},
  extraReducers: {
    [getUsersCount.fulfilled]: (state, action) => ({ ...state, usersCount: action.payload.data }),
    [getMachinesCount.fulfilled]: (state, action) => ({ ...state, machinesCount: action.payload.data })
  },
});

export const selectUsersCount = ({ dashboardApp }) => dashboardApp.dashboard.usersCount;
export const selectMachinesCount = ({ dashboardApp }) => dashboardApp.dashboard.machinesCount;

export default dashboardSlice.reducer;
