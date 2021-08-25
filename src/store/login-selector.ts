import { RootState } from "./store"

const selectToken = (state: RootState) => state.login.token
export default selectToken
