import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login/Login';
import Header from './components/Slack/Header/Header';
import Profile from './components/Slack/Profile/Profile';
import styles from './App.module.scss';
import { startChat } from './store/chat';
import Chat from './components/Slack/Chat/Chat';
import Channels from './components/Channels/Channels';
import { selectToken } from './store/selectors';
import Exit from './components/tools/Exit';

const App: React.FC = () => {
  const jwtToken = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwtToken) dispatch(startChat());
  }, [jwtToken]);

  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/">
          {jwtToken ? <Redirect to="/channels" /> : <Redirect to="/login" />}

          <div className={styles.slack_wrapper}>
            <Header />
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/channels">
              <Channels />
            </Route>
            <Route path="/exit">
              <Exit />
            </Route>
            <div className={styles.slack_main}>
              <Chat />
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
