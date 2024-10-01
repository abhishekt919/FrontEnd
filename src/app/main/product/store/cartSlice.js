import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk(
    "cartModule/getCart",
    async (limit) => {
      const response = await axios.get(`/cart`);
      const data = await response.data;
      return data;
    }
  );

  const cartSlice = createSlice({
    name: "cartModule",
    initialState: {
      data: [],
    },
    reducers: {},
    extraReducers: {
      [getCart.fulfilled]: (state, action) => ({
        ...state,
        data: action.payload,
      }),
    },
  });
  
  export default cartSlice.reducer;
  