import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "productModule/getProducts",
  async (limit) => {
    const response = await axios.get(`/product/get`);
    const data = await response.data;
    return data;
  }
);

export const getProductById = createAsyncThunk(
  'productModule/product/getProductById',
  async (id) => {
    const response = await axios.get(`/product/get/${id}`);
    const data = await response.data;
    return data === undefined ? null : data.data;
  }
);


export const createProduct = createAsyncThunk(
  'productModule/createProduct',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post(`/product/create`, inputJson);
    const data = await response.data;
    return data;
  }
);

export const updateProfile = createAsyncThunk(
  'productModule/update',
  async (input, { dispatch, getState }) => {
    const { _id } = getState().productModule.product;
    const response = await axios.patch(`/update-profile/${_id}`, input);

    const data = await response.data;
    if (data.messageId === 200) {
      if(!input.type){
        dispatch(showMessage({ message: data.message }));
      }
      return data.user;
    } else {
      dispatch(showMessage({ message: data.message }));
      return null;
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
