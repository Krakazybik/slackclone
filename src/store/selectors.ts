import { RootState } from './store';
import { IMessage } from '../api/slack';

export const selectToken = (state: RootState) => state.login.token;

export const selectMessages = (state: RootState): Array<IMessage> =>
  state.messages.messages;

export const selectChannels = (state: RootState) => state.channels.channels;

export const selectCurrentChannel = (state: RootState) =>
  state.chat.currentChannelId;
