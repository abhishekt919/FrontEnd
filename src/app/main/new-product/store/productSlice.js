import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "productModule/getProducts",
  async (limit) => {
    const response = await axios.get(`/products/get-all`);
    const data = await response.data;
    return data;
  }
);

export const createProduct = createAsyncThunk(
  'productModule/createProduct',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post(`/products/add`, inputJson);
    const data = await response.data;
    return data;
  }
);
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`products/delete/${productId}`);
      dispatch(getProducts);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "productModule",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export default productSlice.reducer;
