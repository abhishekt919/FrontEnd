import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from "app/store/fuse/messageSlice";

export const getUserById = createAsyncThunk(
  'userStore/user/getUserById',
  async (id) => {
    const response = await axios.get(`/users/get/${id}`);
    const data = await response.data;
    return data === undefined ? null : data.data;
  }
);

export const deleteUser = createAsyncThunk(
  'userStore/user/deleteUser',
  async (val, { dispatch, getState }) => {
    const { _id } = getState().userStore.user;
    const response = await axios.delete(`/users/delete/${_id}`);
    const data = await response.data;
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'userStore/user/updateUser',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.patch(`/users/update/`, inputJson);
    const data = await response.data;
    return data;
  }
);

export const createUser = createAsyncThunk(
  'userStore/user/createUser',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post(`/users/create`, inputJson);

    const data = await response.data;
    return data;
  }
);

export const downloadUsers = createAsyncThunk(
  'userStore/users/downloadUsers',
  async (companyId, { dispatch, getState }) => {
    const response = await axios.get(`/users/download/${companyId}`);
    const data = await response.data;
    if (data.messageId === 200) {
      dispatch(showMessage({ message: data.message }));
    } else {
      dispatch(showMessage({ message: data.message, variant: "error" }));
    }
    return data;
  }
);

export const getUserPermissionsByUserId = createAsyncThunk(
  "userStore/user/getUserPermissionsByUserId",
  async (id) => {
    const response = await axios.get(`/users/permissions/get/${id}`);
    const data = await response.data;
    return data === undefined ? null : data.data;
  }
);

export const updateUserPermissionsByUserId = createAsyncThunk(
  "userStore/user/updateUserPermissionsByUserId",
  async (inputJson, { dispatch }) => {
    const response = await axios.patch(`/users/permissions/update`, inputJson);
    const data = await response.data;
    if (data.messageId === 200) {
      dispatch(showMessage({ message: data.message }));
    } else {
      dispatch(showMessage({ message: data, variant: "error" }));
    }
    return data === undefined ? null : data.data;
  }
);

const userSlice = createSlice({
  name: 'userStore/user',
  initialState: {
    downloadData: null
  },
  reducers: {
    resetUserForm: () => null,
    newUser: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          firstName: '',
          lastName: '',
          email: '',
          role: '',
          username: '',
          lastLoginEnabled: false
        },
      }),
    },
  },
  extraReducers: {
    [getUserById.fulfilled]: (state, action) => action.payload,
    [createUser.fulfilled]: (state, action) => action.payload,
    [deleteUser.fulfilled]: (state, action) => null,
    [updateUser.fulfilled]: (state, action) => null,
    [downloadUsers.fulfilled]: (state, action) => ({
      ...state,
      downloadData: action.payload.data,
    }),
    [getUserPermissionsByUserId.fulfilled]: (state, action) => action.payload,
    [updateUserPermissionsByUserId.fulfilled]: (state, action) => action.payload
  },
});

export const { newUser, resetUserForm } = userSlice.actions;

export const selectUser = ({ userStore }) => userStore.user;

export default userSlice.reducer;
