import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios";

const initialState = {
  vechiles: [],
  categories: [],
};

export const fetchVechiles = createAsyncThunk(
  "vechile/fetchVechiles",
  async (param, { rejectWithValue }) => {
    try {
      const { data } = await axios({
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

export const fetchCreateVechiles = createAsyncThunk(
  "vechile/fetchCreateVechiles",
  async ({form, categories, navigate}, { rejectWithValue }) => {
    try {
      await axios({
        url: "/vechile",
        method: "POST",
        data: { ...form, categories },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/vechile");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "vechile/fetchCategory",
  async (param, { rejectWithValue }) => {
    try {
      const { data } = await axios({
        url: "/category",
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
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { setVechile } = vechileSlice.actions;

export const selectVechileState = (state) => state.vechile;

export default vechileSlice.reducer;
