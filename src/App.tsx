import React, { useEffect } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Login from "./components/Login/Login"
import selectToken from "./store/login-selector"
import Header from "./components/Slack/Header/Header"
import Profile from "./components/Slack/Profile/Profile"
import styles from "./App.module.scss"
import { startChat } from "./store/chat"
import Chat from "./components/Slack/Chat/Chat"

const App: React.FC = () => {
  const jwtToken = useSelector(selectToken)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startChat())
  }, [jwtToken, dispatch])

  const handleClickLogout = () => {
    localStorage.clear()
  }

  return (
    <div className={styles.app}>
      <button type="button" onClick={handleClickLogout}>
        Logout
      </button>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/">
          {!jwtToken && <Redirect to="/login" />}
          <div className={styles.slack_wrapper}>
            <Header />
            <Route path="/profile">
              <Profile />
            </Route>
            <div className={styles.slack_main}>
              <Chat />
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App
