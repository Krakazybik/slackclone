import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import SocketAPI from "../api/socket"
import SlackAPI from "../api/slack"
import { addChannel } from "./channels"
import { addMessage } from "./messages"

const socket = new SocketAPI("http://localhost:5000")

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

export const subscribeMessages = createAsyncThunk(
  "chat/subscribeMessages",
  async (data, thunkAPI) => {
    socket.on("newMessage", (message) => thunkAPI.dispatch(addMessage(message)))
  }
)

const subscribeChannels = createAsyncThunk(
  "chat/subscribeChannels",
  async (data, thunkAPI) => {
    socket.on("newChannel", (message) => thunkAPI.dispatch(addMessage(message)))
  }
)

const subscribeRemoveChannel = createAsyncThunk(
  "chat/subscribeRemoveChannel",
  async (data, thunkAPI) => {
    socket.on("removeChannel", (message) =>
      thunkAPI.dispatch(addMessage(message))
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
  reducers: {},
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

export default chatSlice.reducer
