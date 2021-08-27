import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Login from "./components/Login/Login"
import NotFound from "./components/tools/NotFound"
import selectToken from "./store/login-selector"
import { fetchChannels } from "./store/channels"
import Slack from "./components/Slack/Slack"
import Header from "./components/Slack/Header/Header"
import Profile from "./components/Slack/Profile/Profile"

import styles from "./App.module.scss"

function App() {
  const jwtToken = useSelector(selectToken)
  const dispatch = useDispatch()
  const onClickChannels = () => {
    dispatch(fetchChannels())
  }

  return (
    <div className={styles.app}>
      <Switch>
        <Route path="/">
          {!jwtToken && <Redirect to="/login" />}
          <div className={styles.slack_wrapper}>
            <Header />
            <Route path="/profile">
              <Profile />
            </Route>
            <div className={styles.slack_main}>sdd</div>
          </div>
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  )
}

export default App
