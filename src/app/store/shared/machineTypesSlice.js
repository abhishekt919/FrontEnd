import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getActiveMachineTypes = createAsyncThunk(
  'machineTypes/getActiveMachineTypes',
  async () => {
    const response = await axios.get(`/machine-type/active`);
    const data = await response.data;
    return data;
  }
);

export const getAffiliateMachineTypes = createAsyncThunk(
  'machineTypes/getAffiliateMachineTypes',
  async (companyId, { dispatch, getState }) => {
    const response = await axios.get(`/machine-type/affiliate/` + companyId);
    const data = await response.data;
    return data;
  }
);

const machineTypesSlice = createSlice({
  name: 'machineTypes',
  initialState: {
    active: [],
    companyMachineTypes: []
  },
  reducers: {},
  extraReducers: {
    [getActiveMachineTypes.fulfilled]: (state, action) => ({ ...state, active: action.payload.data }),
    [getAffiliateMachineTypes.fulfilled]: (state, action) => ({ ...state, companyMachineTypes: action.payload.data })
  },
});

export const selectMachineTypes = ({ machineTypes }) => machineTypes.active;
export const selectCompanyMachineTypes = ({ machineTypes }) => machineTypes.companyMachineTypes;

export default machineTypesSlice.reducer;
