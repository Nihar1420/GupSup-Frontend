import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import profileSlice from "../features/profileSlice";
import userSlice from "../features/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    users: userSlice,
  },
});

export default store;
