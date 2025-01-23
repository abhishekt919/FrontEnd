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
  "EventModule/createEvents",
  async (inputJson) => {
    const response = await axios.post(`/events`, inputJson);
    return response.data;
  }
);

export const bookEvents = createAsyncThunk(
  "EventModule/bookEvents",
  async (inputJson) => {
    const response = await axios.post(`/booking`, inputJson);
    return response.data;
  }
);

const eventSlice = createSlice({
  name: "EventModule",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default eventSlice.reducer;
