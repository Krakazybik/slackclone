import { RootState } from "./store"
import { IMessage } from "../api/slack"

const selectMessages = (state: RootState): Array<IMessage> =>
  state.messages.messages.filter(
    (message) => message.channelId === state.chat.currentChannelId
  )

export default selectMessages
