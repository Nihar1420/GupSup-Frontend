import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService, registerService } from "../services/authService";
import { toast } from "react-toastify";

const initialState = {
  registeredUser: [],
  loggedInUser: [],
  isSuccess: false,
  isError: "",
  isLoading: false,
};

export const register = createAsyncThunk(
  "user/register",
  async (
    { userName, userEmail, userPassword, userConfirmPassword },
    thunkAPI
  ) => {
    try {
      const response = await registerService(
        userName,
        userEmail,
        userPassword,
        userConfirmPassword
      );
      if (response) return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ userEmail, userPassword }, thunkAPI) => {
    try {
      const response = await loginService(userEmail, userPassword);
      if (response) return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    clearRegisteredUser: (state) => {
      state.registeredUser = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.registeredUser = action.payload.data;
        state.isSuccess = true;
        toast.success(action.payload.message);
      } else if (action.payload.status === 400) {
        state.isError = action.payload.message;
        toast.error(action.payload.message);
      }
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isError = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.loggedInUser = action.payload.data;
        state.isSuccess = true;
        toast.success(action.payload.message);
      } else if (action.payload.status === 400) {
        state.isError = action.payload.message;
        toast.error(action.payload.message);
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isError = action.payload;
    });
  },
});

export const { clearRegisteredUser } = authSlice.actions;
export default authSlice.reducer;
