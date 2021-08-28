import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import SocketAPI from "../api/socket"
import SlackAPI from "../api/slack"
import { addChannel, removeFromChannels } from "./channels"
import { addMessage } from "./messages"

const socket = new SocketAPI("http://srv.evgeraskin.ru:5000")

interface IChatState {
  currentChannelId: number
}

const initialState: IChatState = {
  currentChannelId: 1,
}

const fetchChatData = createAsyncThunk(
  "channels/fetchChatData",
  async (arg, thunkAPI) => {
    try {
      const response = await SlackAPI.getChannels()

      response.channels.forEach((channel) =>
        thunkAPI.dispatch(addChannel(channel))
      )

      response.messages.forEach((message) => {
        thunkAPI.dispatch(addMessage(message))
      })

      return response
    } catch (err) {
      return thunkAPI.rejectWithValue("Error")
    }
  }
)

export const newMessage = createAsyncThunk(
  "chat/newMessage",
  async (message: string, thunkAPI) => {
    const state = thunkAPI.getState() as {
      chat: { currentChannelId: number }
      login: { username: string }
    }
    console.log(state)
    socket.emit("newMessage", {
      message,
      name: state.login.username,
      channelId: state.chat.currentChannelId,
    })
  }
)

export const newChannel = createAsyncThunk(
  "chat/newChannel",
  async (channelName: string) => {
    socket.emit("newChannel", { name: channelName })
  }
)

export const removeChannel = createAsyncThunk(
  "chat/removeChannel",
  async (channelId: number) => {
    socket.emit("removeChannel", { id: channelId })
  }
)

export const subscribeMessages = createAsyncThunk(
  "chat/subscribeMessages",
  async (data, thunkAPI) => {
    socket.on("newMessage", (message) => thunkAPI.dispatch(addMessage(message)))
  }
)

const subscribeChannels = createAsyncThunk(
  "chat/subscribeChannels",
  async (data, thunkAPI) => {
    socket.on("newChannel", (channelName) =>
      thunkAPI.dispatch(addChannel(channelName))
    )
  }
)

const subscribeRemoveChannel = createAsyncThunk(
  "chat/subscribeRemoveChannel",
  async (data, thunkAPI) => {
    socket.on("removeChannel", (message) =>
      thunkAPI.dispatch(removeFromChannels(message.id))
    )
  }
)

const subscribeRenameChannel = createAsyncThunk(
  "chat/subscribeRenameChannel",
  async (data, thunkAPI) => {
    socket.on("renameChannel", (message) =>
      thunkAPI.dispatch(addMessage(message))
    )
  }
)

export const startChat = createAsyncThunk(
  "chat/subscribeRenameChannel",
  async (data, thunkAPI) => {
    try {
      await thunkAPI.dispatch(fetchChatData())
      await thunkAPI.dispatch(subscribeChannels())
      await thunkAPI.dispatch(subscribeRemoveChannel())
      await thunkAPI.dispatch(subscribeRenameChannel())
      await thunkAPI.dispatch(subscribeMessages())
    } catch (err) {
      console.log(err)
    }
  }
)

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    switchChannel(state, action: PayloadAction<number>) {
      state.currentChannelId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newMessage.fulfilled, (state, action) => {
      console.log(action)
    })

    builder.addCase(fetchChatData.fulfilled, (state, action) => {
      state.currentChannelId = action.payload.currentChannelId
    })
    builder.addCase(fetchChatData.rejected, (state, action) => {
      console.log(action.payload)
    })
  },
})

export const { switchChannel } = chatSlice.actions

export default chatSlice.reducer
