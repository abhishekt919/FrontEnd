import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getTimezones = createAsyncThunk(
    'timeZone/get',
    async (params, { dispatch, getState }) => {
        const response = await axios.get('shared-module/get-timezones');

        const data = await response.data;
        if (data.messageId === 200) {
            return data.data;
        } else {
            dispatch(showMessage({ message: data.message }));
            return null;
        }
    }
);

export const updateTimezone = createAsyncThunk(
    'timeZone/update',
    async (input, { dispatch, getState }) => {
        const response = await axios.patch('admin-auth/update-profile', input);

        const data = await response.data;
        if (data.messageId === 200) {
            dispatch(showMessage({ message: data.message }));
            return;
        } else {
            dispatch(showMessage({ message: data.message }));
            return null;
        }
    }
);

const timeZoneSlice = createSlice({
    name: 'timeZone',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getTimezones.pending]: (state, action) => action.payload,
        [getTimezones.fulfilled]: (state, action) => action.payload,
        [updateTimezone.pending]: (state, action) => action.payload,
        [updateTimezone.fulfilled]: (state, action) => action.payload,
    },
});

export const timeZone = ({ timezone }) => timezone;

export default timeZoneSlice.reducer;
