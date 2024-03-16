import { configureStore } from "@reduxjs/toolkit";
import vechileReducer from "./features/vechileSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    vechile: vechileReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
});