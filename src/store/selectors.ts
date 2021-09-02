import { RootState } from './store';
import { IChannel, IMessage } from '../api/slack';

export const selectToken = (state: RootState): string => state.login.token;

export const selectMessages = (state: RootState): Array<IMessage> =>
  state.messages.messages;

export const selectChannels = (state: RootState): Array<IChannel> =>
  state.channels.channels;

export const selectCurrentChannel = (state: RootState): number =>
  state.chat.currentChannelId;
