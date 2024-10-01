import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCurrentBill = createAsyncThunk(
  'billing/getCurrentBill',
  async (input, { dispatch, getState }) => {
    const response = await axios.post('company/current-billing', input);
    const data = await response.data;
    return data;
  }
);

export const getBillingHistory = createAsyncThunk(
  'billing/getBillingHistory',
  async (input, { dispatch, getState }) => {
    const response = await axios.post('company/billing-history', input);
    const data = await response.data;
    return data;
  }
);

const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    data: null,
    history: []
  },
  reducers: {},
  extraReducers: {
    [getCurrentBill.fulfilled]: (state, action) => ({ ...state, data: action.payload.data }),
    [getBillingHistory.fulfilled]: (state, action) => ({ ...state, history: action.payload.data }),
  }
});

export const selectCurrentBill = ({ billing }) => billing.data;
export const selectBillingHistory = ({ billing }) => billing.history;

export default billingSlice.reducer;
