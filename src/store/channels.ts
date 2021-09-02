import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChannel } from '../api/slack';

interface IChannelsState {
  channels: Array<IChannel>;
}

const initialState: IChannelsState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, action: PayloadAction<IChannel>) {
      state.channels.push(action.payload);
    },
    removeFromChannels(state, action: PayloadAction<number>) {
      state.channels = state.channels.filter(
        (channel) => channel.id !== action.payload
      );
    },
    clearChannelsState() {
      return initialState;
    },
  },
});

export const { addChannel, removeFromChannels, clearChannelsState } =
  channelsSlice.actions;

export default channelsSlice.reducer;
