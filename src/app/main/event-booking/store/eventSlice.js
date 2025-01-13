import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEvents = createAsyncThunk(
  "EventModule/getEvents",
  async () => {
    const response = await axios.get(`/events/events`);
    const data = await response.data;
    return data;
  }
);
export const createEvents = createAsyncThunk(
  'EventModule/createEvents',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post(`/events`, inputJson);
    const data = await response.data;
    return data;
  }
);

const eventSlice = createSlice({
    name: "EventModule",
    initialState: {
      data: [],
    },
    reducers: {},
    extraReducers: {
      [getEvents.fulfilled]: (state, action) => ({
        ...state,
        data: action.payload,
      }),
    },
  });
  
  export default eventSlice.reducer;