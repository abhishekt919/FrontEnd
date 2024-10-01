import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getMachines = createAsyncThunk(
  "machineModule/machines/getMachines",
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.get(`/machines/list/${inputJson.companyId}/${inputJson.status}/${inputJson.page + 1}/${inputJson.perPage}`
    );
    const data = await response.data;
    return data;
  }
);

export const searchMachines = createAsyncThunk(
  "machineModule/machines/searchMachines",
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post("/machines/search", inputJson);
    const data = await response.data;
    if (data.messageId === 200) {
      dispatch(showMessage({ message: data.message }));
    } else {
      dispatch(showMessage({ message: data.message, variant: "error" }));
    }
    return data;
  }
);

export const downloadMachines = createAsyncThunk(
  "machineModule/machines/downloadMachines",
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post("/machines/download", inputJson);
    const data = await response.data;
    if (data.messageId === 200) {
      dispatch(showMessage({ message: data.message }));
    } else {
      dispatch(showMessage({ message: data.message, variant: "error" }));
    }
    return data;
  }
);

export const verifyMachine = createAsyncThunk(
  'machineModule/machine/verifyMachine',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.patch(`/machines/verify`, inputJson);
    const data = await response.data;
    return data;
  }
);

export const getMachineStats = createAsyncThunk(
  'machineModule/machine/getMachineStats',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post(`/machines/get-statistics`, inputJson);
    const data = await response.data;
    return data;
  }
);

export const getMachineEvents = createAsyncThunk(
  'machineModule/machine/getMachineEvents',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post(`/machines/get-events`, inputJson);
    const data = await response.data;
    return data;
  }
);

const machinesSlice = createSlice({
  name: "machineModule/machines",
  initialState: {
    data: [],
    downloadData: null
  },
  reducers: {},
  extraReducers: {
    [getMachines.fulfilled]: (state, action) => ({
      ...state,
      data: action.payload.data,
    }),
    [searchMachines.fulfilled]: (state, action) => ({
      ...state,
      data: action.payload.data,
    }),
    [downloadMachines.fulfilled]: (state, action) => ({
      ...state,
      downloadData: action.payload.data,
    })
  },
});

export const selectMachines = ({ machineModule }) => machineModule.machines.data;

export default machinesSlice.reducer;

