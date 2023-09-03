import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerService } from "../services/authService";

const initialState = {
  registeredUser: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const register = createAsyncThunk(
  "user/register",
  async ({ userName, userEmail, userPassword, userConfirmPassword }) => {
    const response = await registerService(
      userName,
      userEmail,
      userPassword,
      userConfirmPassword
    );
    if (response) return response;
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
      state.registeredUser = action.payload.data;
      state.isSuccess = true;
    });
    builder.addCase(register.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { clearRegisteredUser } = authSlice.actions;
export default authSlice.reducer;
