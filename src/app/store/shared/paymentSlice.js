import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const listCreditCards = createAsyncThunk(
    'payment/listCreditCards',
    async (inputJson, { dispatch, getState }) => {
        const response = await axios.post(`/payment/list-credit-cards`, inputJson);
        const data = await response.data;
        return data;
    }
);

export const addCreditCard = createAsyncThunk(
    'payment/addCreditCard',
    async (inputJson, { dispatch, getState }) => {
        const response = await axios.post(`/payment/add-credit-card`, inputJson);
        const data = await response.data;
        return data;
    }
);

export const deleteCreditCard = createAsyncThunk(
    'payment/deleteCreditCard',
    async (inputJson, { dispatch, getState }) => {
        const response = await axios.post(`/payment/delete-credit-card`, inputJson);
        const data = await response.data;
        return data;
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        savedCreditCards: [],
    },
    reducers: {},
    extraReducers: {
        [listCreditCards.fulfilled]: (state, action) => ({ ...state, savedCreditCards: action.payload.data }),
        [addCreditCard.fulfilled]: (state, action) => action.payload,
        [deleteCreditCard.fulfilled]: (state, action) => action.payload,
    }
});

export const selectCreditCards = ({ payment }) => payment.savedCreditCards;

export default paymentSlice.reducer;
