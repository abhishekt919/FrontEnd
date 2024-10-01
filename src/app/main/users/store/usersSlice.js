import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk(
  'userStore/users/getUsers',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.get(`/users/list/${inputJson.companyId}/${inputJson.status}`);
    const data = await response.data;
    return data.data;
  }
);

const usersAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

export const { selectAll: selectUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.userStore.users);

const usersSlice = createSlice({
  name: 'userStore/users',
  initialState: usersAdapter.getInitialState({
    searchText: ''
  }),
  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: usersAdapter.setAll
  },
});

export const { setSearchText } = usersSlice.actions;

export const selectSearchText = ({ userStore }) => userStore.users.searchText;

export default usersSlice.reducer;
