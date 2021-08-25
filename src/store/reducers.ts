import { combineReducers } from "redux"
import login from "./login"
import channels from "./channels"

const reducers = combineReducers({ login, channels })
export default reducers
