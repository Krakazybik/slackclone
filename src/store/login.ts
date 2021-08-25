import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import slack from "../api/slack"

interface LoginState {
  token: string
  username: string
}

const initLocalJwtToken = () => {
  const token = localStorage.getItem("jwtToken")
  if (token) slack.setJwtToken(token)
  return token || ""
}

const initialState: LoginState = {
  token: initLocalJwtToken(),
  username: "",
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateToken(state: LoginState, action: PayloadAction<string>) {
      console.log("updateToken", action.payload)
      slack.setJwtToken(action.payload)
      localStorage.setItem("jwtToken", action.payload)
      state.token = action.payload
    },
  },
})

export const { updateToken } = loginSlice.actions
export default loginSlice.reducer
