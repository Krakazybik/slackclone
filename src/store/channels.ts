import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import SlackAPI, { IChannel } from "../api/slack"

interface IChannelsState {
  channels: Array<IChannel>
  messages: Array<string>
  currentChannelId: number
}

const initialState: IChannelsState = {
  channels: [],
  messages: [],
  currentChannelId: -1,
}

export const fetchChannels = createAsyncThunk(
  "channels/getChannels",
  async (arg, thunkAPI) => {
    try {
      const response = await SlackAPI.getChannels()
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue("Error")
    }
  }
)

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      state.channels = action.payload.channels
      state.messages = action.payload.messages
      state.currentChannelId = action.payload.currentChannelId
    })
    builder.addCase(fetchChannels.rejected, (state, action) => {
      console.log(action.payload)
    })
  },
})

export default channelsSlice.reducer
