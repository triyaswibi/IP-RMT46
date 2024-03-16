import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import toast from "../utils/toastify.js";

const initialState = {
  isLogin: false
};

export const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async ({userData, navigate}) => {
    try {
      let { data } = await axios({
        url: "/login",
        method: "POST",
        data: userData,
      });
      localStorage.setItem("token", data.access_token);
      navigate("/vechile");
    } catch (error) {
      toast(error.response?.data?.message || error.message, "error");
    }
  }
);

export const handleCreateUser = createAsyncThunk(
  "user/handleCreateUser",
  async ({form, navigate}) => {
    try {
      await axios({
        url: "/register",
        method: "POST",
        data: form,
      });
      navigate("/login");
    } catch (error) {
      toast(error.response?.data?.message || error.message, "error");
    }
  }
);

export const handleLogout = createAsyncThunk(
  "user/handleLogout",
  async (navigate) => {
    localStorage.clear()
    navigate("/login")
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state) => {
      state.isLogin = true;
    });
    builder.addCase(handleLogout.fulfilled, (state) => {
      state.isLogin = false;
    });
  },
});

export const { setIsLogin } = userSlice.actions

export const selectLoginState = (state) => state.user;

export default userSlice.reducer;
