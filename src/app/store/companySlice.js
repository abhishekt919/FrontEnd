import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getCompany = createAsyncThunk(
  'company/get',
  async (companyId, { dispatch, getState }) => {
    const response = await axios.get('company/get/' + companyId);
    const data = await response.data;
    return data;
  }
);

export const getAffiliatedCompany = createAsyncThunk(
  'company/getAffiliatedCompany',
  async (companyId, { dispatch, getState }) => {
    const response = await axios.get(`/company/affiliated/` + companyId);
    const data = await response.data;
    return data;
  }
);

export const getMyCompanyList = createAsyncThunk(
  'company/getMyCompanyList',
  async (companyId, { dispatch, getState }) => {
    const response = await axios.get(`/company/affiliated-and-my/` + companyId);
    const data = await response.data;
    return data;
  }
);

export const updateCompany = createAsyncThunk(
  'company/update',
  async (input, { dispatch, getState }) => {
    const response = await axios.patch('company/update', input);

    const data = await response.data;
    if (data.messageId === 200) {
      dispatch(showMessage({ message: data.message }));
      return data;
    } else {
      dispatch(showMessage({ message: data.message }));
      return null;
    }
  }
);

export const updateCompanyRedux = createAsyncThunk(
  'company/updateCompanyRedux',
  async (inputJson, { dispatch, getState }) => {
    return inputJson;
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyData: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getCompany.fulfilled, (state, { payload }) => {
      state.companyData = payload.data
    }),
    builder.addCase(updateCompany.fulfilled, (state, { payload }) => {
      state.companyData = payload.data
    }),
    builder.addCase(updateCompanyRedux.fulfilled, (state, { payload }) => {
      let stateData = state.companyData.activeModules[payload.index];
      if (payload.type === "selectedEmail") {
        stateData.selectedEmail = payload.value;
      } else if (payload.type === "sendEmail") {
        stateData.sendEmail = payload.value;
      }
    })
  },
});

export const selectCompany = ({ company }) => company.companyData;

export default companySlice.reducer;
