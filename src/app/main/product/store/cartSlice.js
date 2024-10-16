import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("productModule/getCart", async () => {
  const response = await axios.get(`/cart`);
  const data = await response.data;
  return data;
});

const cartSlice = createSlice({
  name: "productModule",
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

export const selectCartData = ({ productModule }) => productModule;

export default cartSlice.reducer;
