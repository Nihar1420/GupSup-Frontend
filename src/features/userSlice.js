import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/userService";

const initialState = {
  allContacts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const getAllContacts = createAsyncThunk(
  "users/getAllContacts",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await userService.getAllContactsService(userId);
      if (response) return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    clearState: (state) => {
      state.allContacts = [];
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllContacts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allContacts = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(getAllContacts.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { clearState } = userSlice.actions;
export default userSlice.reducer;
