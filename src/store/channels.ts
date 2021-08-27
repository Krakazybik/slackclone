import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IChannel } from "../api/slack"

interface IChannelsState {
  channels: Array<IChannel>
}

const initialState: IChannelsState = {
  channels: [],
}

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannel(state, action: PayloadAction<IChannel>) {
      state.channels.push(action.payload)
    },
  },
})

export const { addChannel } = channelsSlice.actions

export default channelsSlice.reducer
