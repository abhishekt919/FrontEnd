import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getContact = createAsyncThunk(
  "ContactModule/getContact",
  async (limit) => {
    const response = await axios.get(`/get/getContact`);
    const data = await response.data;
    return data;
  }
);
export const createContact = createAsyncThunk(
  'ContactModule/createContact',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post(`/addContact`, inputJson);
    const data = await response.data;
    return data;
  }
);

const contactSlice = createSlice({
    name: "ContactModule",
    initialState: {
      data: [],
    },
    reducers: {},
    extraReducers: {
      [getContact.fulfilled]: (state, action) => ({
        ...state,
        data: action.payload,
      }),
    },
  });
  
  export default contactSlice.reducer;