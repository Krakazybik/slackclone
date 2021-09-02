import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SlackAPI from '../api/slack';

export interface ILoginState {
  token: string;
  username: string;
}

const initLocalJwtToken = () => {
  const token = localStorage.getItem('jwtToken');
  if (token) SlackAPI.setJwtToken(token);
  return token || '';
};

const initUserName = () => {
  const userName = localStorage.getItem('username');
  return userName || '';
};

export const loginUser = createAsyncThunk(
  'login/login',
  async (
    { login, password }: { login: string; password: string },
    thunkAPI
  ) => {
    try {
      return await SlackAPI.login(login, password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: ILoginState = {
  token: initLocalJwtToken(),
  username: initUserName(),
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearLoginState() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('username');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      SlackAPI.setJwtToken(action.payload.token);
      localStorage.setItem('jwtToken', action.payload.token);
      localStorage.setItem('username', action.payload.username);
    });
  },
});
export const { clearLoginState } = loginSlice.actions;

export default loginSlice.reducer;
