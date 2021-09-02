import { combineReducers } from 'redux';
import login from './login';
import chat from './chat';
import channels from './channels';
import messages from './messages';

const reducers = combineReducers({
  login,
  chat,
  channels,
  messages,
});
export default reducers;
