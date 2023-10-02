import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageService from "../services/messageService";

const initialState = {
  messages: [],
  messageSent: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const sendMessage = createAsyncThunk(
  "message/send-message",
  async ({ senderId, getterId, message }, thunkAPI) => {
    const response = await messageService.sendMessageService(
      senderId,
      getterId,
      message
    );
    if (response) return response;
    else thunkAPI.rejectWithValue(response);
  }
);

export const getUserMessages = createAsyncThunk(
  "message/getUserMessages",
  async ({ senderId, getterId }, thunkAPI) => {
    const response = await messageService.getUserMessageService(
      senderId,
      getterId
    );
    if (response) return response;
    else thunkAPI.rejectWithValue(response);
  }
);

const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    clearState: (state) => {
      state.messages = [];
      state.messageSent = [];
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
    },
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.messageSent = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(sendMessage.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getUserMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(getUserMessages.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { clearState, setMessages } = messageSlice.actions;
export default messageSlice.reducer;
