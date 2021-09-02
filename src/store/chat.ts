import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import SocketAPI from '../api/socket';
import SlackAPI from '../api/slack';
import { addChannel, clearChannelsState, removeFromChannels } from './channels';
import { addMessage, clearMessageState, getMessages } from './messages';
import { clearLoginState, ILoginState } from './login';

const REACT_APP_SOCKET_HOST =
  process.env.REACT_APP_SOCKET_HOST || 'http://localhost:5000';

let socket: SocketAPI;

interface IChatState {
  currentChannelId: number;
}

const initialState: IChatState = {
  currentChannelId: 1,
};

const fetchChatData = createAsyncThunk(
  'channels/fetchChatData',
  async (argument, thunkAPI) => {
    try {
      const response = await SlackAPI.getChannels();
      response.channels.forEach((channel) =>
        thunkAPI.dispatch(addChannel(channel))
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const newMessage = createAsyncThunk(
  'chat/newMessage',
  async (message: string, thunkAPI) => {
    const state = thunkAPI.getState() as { chat: IChatState };
    socket.emit('newMessage', {
      message,
      channelId: state.chat.currentChannelId,
    });
  }
);

export const newChannel = createAsyncThunk(
  'chat/newChannel',
  async (channelName: string) => {
    socket.emit('newChannel', { name: channelName });
  }
);

export const joinChannel = createAsyncThunk(
  'chat/joinChannel',
  async (channelId: number, thunkAPI) => {
    // TODO: Catch errors
    try {
      await thunkAPI.dispatch(getMessages(channelId));
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
    socket.emit('joinChannel', { channelId });
    return channelId;
  }
);

export const removeChannel = createAsyncThunk(
  'chat/removeChannel',
  async (channelId: number) => {
    socket.emit('removeChannel', { id: channelId });
  }
);

export const subscribeMessages = createAsyncThunk(
  'chat/subscribeMessages',
  async (data, thunkAPI) => {
    socket.on('newMessage', (message) =>
      thunkAPI.dispatch(addMessage(message))
    );
  }
);

const subscribeChannels = createAsyncThunk(
  'chat/subscribeChannels',
  async (data, thunkAPI) => {
    socket.on('newChannel', (channelName) =>
      thunkAPI.dispatch(addChannel(channelName))
    );
  }
);

const subscribeRemoveChannel = createAsyncThunk(
  'chat/subscribeRemoveChannel',
  async (data, thunkAPI) => {
    socket.on('removeChannel', (message) =>
      thunkAPI.dispatch(removeFromChannels(message.id))
    );
  }
);

const subscribeRenameChannel = createAsyncThunk(
  'chat/subscribeRenameChannel',
  async (data, thunkAPI) => {
    socket.on('renameChannel', (message) =>
      thunkAPI.dispatch(addMessage(message))
    );
  }
);

export const startChat = createAsyncThunk(
  'chat/startChat',
  async (data, thunkAPI) => {
    const state = thunkAPI.getState() as {
      login: ILoginState;
      chat: IChatState;
    };
    socket = new SocketAPI(REACT_APP_SOCKET_HOST, state.login.token);
    try {
      await thunkAPI.dispatch(fetchChatData());
      await thunkAPI.dispatch(subscribeChannels());
      await thunkAPI.dispatch(subscribeRemoveChannel());
      await thunkAPI.dispatch(subscribeRenameChannel());
      await thunkAPI.dispatch(subscribeMessages());
      await thunkAPI.dispatch(joinChannel(state.chat.currentChannelId));
    } catch (error) {
      console.log(error);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    switchChannel(state, action: PayloadAction<number>) {
      state.currentChannelId = action.payload;
    },
    clearChatState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newMessage.fulfilled, (state, action) => {
      console.log(action);
    });

    builder.addCase(fetchChatData.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(fetchChatData.rejected, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(joinChannel.fulfilled, (state, action) => {
      state.currentChannelId = action.payload;
    });
  },
});

export const { switchChannel, clearChatState } = chatSlice.actions;

export const exitChat = createAsyncThunk(
  'chat/exitChat',
  async (data, thunkAPI) => {
    await thunkAPI.dispatch(clearLoginState());
    await thunkAPI.dispatch(clearChatState());
    await thunkAPI.dispatch(clearChannelsState());
    await thunkAPI.dispatch(clearMessageState());
    socket.close();
  }
);

export default chatSlice.reducer;
