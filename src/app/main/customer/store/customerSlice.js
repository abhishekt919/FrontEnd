import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCustomer = createAsyncThunk(
  "CustomerModule/get-customer",
  async (limit) => {
    const response = await axios.get(`/get-customer`);
    const data = await response.data;
    console.log("Customer: ", response.data)
    return data;
  }
);

const customerSlice = createSlice({
    name: "CustomerModule",
    initialState: {
      data: [],
    },
    reducers: {},
    extraReducers: {
      [getCustomer.fulfilled]: (state, action) => ({
        ...state,
        data: action.payload,
      }),
    },
  });
  
  export default customerSlice.reducer;