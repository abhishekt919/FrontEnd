import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStudent = createAsyncThunk(
  "studentModule/getStudent",
  async (limit) => {
    const response = await axios.get(`/student/get-student`);
    const data = await response.data;
    return data;
  }
);

export const createStudent = createAsyncThunk(
  'studentModule/createStudent',
  async (inputJson, { dispatch, getState }) => {
    const response = await axios.post(`/student/add`, inputJson);
    const data = await response.data;
    return data;
  }
);


const studentSlice = createSlice({
  name: "studentModule",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: {
    [getStudent.fulfilled]: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export default studentSlice.reducer;
