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

export const getBookedEventsByUser = createAsyncThunk(
  "EventModule/getBookedEventsByUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.signInUser._id;
      if (!userId) throw new Error("User ID is missing");

      const response = await axios.get(`/booking/${userId}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching booked events:", error);
      return rejectWithValue(error.response?.data || "Error fetching booked events");
    }
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
