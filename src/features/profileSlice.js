import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAvatarService } from "../services/profileService";

export const setAvatarImage = createAsyncThunk(
  "users/setAvatarImage",
  async ({ avatarImage, userId }, thunkAPI) => {
    try {
      const response = await setAvatarService(avatarImage, userId);
      if (response) return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAvatarImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setAvatarImage.fulfilled, (state) => {
      state.isSuccess = true;
    });
    builder.addCase(setAvatarImage.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { clearState } = profileSlice.actions;
export default profileSlice.reducer;
