import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios";

const initialState = {
  vechiles: [],
};

export const fetchVechiles = createAsyncThunk(
  "vechile/fetchVechiles",
  async (param, { rejectWithValue }) => {
    try {
      let { data } = await axios({
        url: "/vechile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const vechileSlice = createSlice({
  name: "vechile",
  initialState,
  reducers: {
    setVechile: (state, action) => {
      state.vechiles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVechiles.fulfilled, (state, action) => {
      state.vechiles = action.payload;
    });
  },
});

export const { setVechile } = vechileSlice.actions;

export const selectVechileState = (state) => state.vechile;

export default vechileSlice.reducer;
