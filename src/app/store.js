import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import profileSlice from "../features/profileSlice";
import userSlice from "../features/userSlice";
import messageSlice from "../features/messageSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    users: userSlice,
    messages: messageSlice,
  },
});

export default store;
