import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import profileSlice from "../features/profileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice
  },
});

export default store;
