import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCompanyList = createAsyncThunk(
  'companyApp/company/getCompanyList',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.get(`/company/list-affiliated/${inputJson.companyId}/${inputJson.page + 1}/${inputJson.perPage}`);
    const data = await response.data;
    return data;
  }
);

export const onApproveCompany = createAsyncThunk(
  'companyApp/company/onApproveCompany',
  async (input, { dispatch, getState }) => {
    const response = await axios.post('company/approve-company', input);
    const data = await response.data;
    return data;
  }
);

const companySlice = createSlice({
  name: 'companyApp/company',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyList.fulfilled, (state, { payload }) => {
      state.data = payload.data
    })
  },
});

export const selectAllCompany = ({ companyApp }) => companyApp.company.data;

export default companySlice.reducer;
