import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import SlackAPI, { IMessage } from '../api/slack';

interface IMessageState {
  messages: Array<IMessage>;
}

const initialState: IMessageState = {
  messages: [],
};

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (channelId: number, thunkAPI) => {
    try {
      return await SlackAPI.getMessages(channelId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      console.log(action.payload);
      state.messages.push(action.payload);
    },
    clearMessageState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = [];
      state.messages = action.payload;
    });
  },
});

export const { addMessage, clearMessageState } = messageSlice.actions;

export default messageSlice.reducer;
