import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IMessage } from "../api/slack"

interface IMessageState {
  messages: Array<IMessage>
}

const initialState: IMessageState = {
  messages: [],
}

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload)
    },
    clearMessageState() {
      return initialState
    },
  },
})

export const { addMessage, clearMessageState } = messageSlice.actions

export default messageSlice.reducer
