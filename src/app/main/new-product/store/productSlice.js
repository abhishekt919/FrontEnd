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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }) => {
      const response = await axios.put(`products/update/${id}`, data);
      return response.data; // Assuming the API returns the updated product
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
