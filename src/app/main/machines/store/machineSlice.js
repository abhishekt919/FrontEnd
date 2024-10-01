import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMachineById = createAsyncThunk(
  'machineModule/machine/getMachineById',
  async (id) => {
    const response = await axios.get(`/machines/get/${id}`);
    const data = await response.data;
    return data === undefined ? null : data.data;
  }
);

export const deleteMachine = createAsyncThunk(
  'machineModule/machine/deleteMachine',
  async (val, { dispatch, getState }) => {
    const { _id } = getState().machineModule.machine;
    const response = await axios.delete(`/machines/delete/${_id}`);
    const data = await response.data;
    return data;
  }
);

export const updateMachine = createAsyncThunk(
  'machineModule/machine/updateMachine',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.patch(`/machines/update/`, inputJson);
    const data = await response.data;
    return data;
  }
);

export const createMachine = createAsyncThunk(
  'machineModule/machine/createMachine',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post(`/machines/create`, inputJson);

    const data = await response.data;
    return data;
  }
);

const machineSlice = createSlice({
  name: 'machineModule/machine',
  initialState: null,
  reducers: {
    resetMachineForm: () => null,
    newMachine: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          locationName: '',
          machineType: '',
          cabinetSerialNumber: '',
          programSerialNumber: '',
          sentry: false,
          atm: false,
          tito: false
        },
      }),
    },
  },
  extraReducers: {
    [getMachineById.fulfilled]: (state, action) => action.payload,
    [createMachine.fulfilled]: (state, action) => action.payload,
    [deleteMachine.fulfilled]: (state, action) => null,
    [updateMachine.fulfilled]: (state, action) => null,
  },
});

export const { newMachine, resetMachineForm } = machineSlice.actions;

export const selectMachine = ({ machineModule }) => machineModule.machine;

export default machineSlice.reducer;
