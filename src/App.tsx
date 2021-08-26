import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Login from "./components/Login/Login"
import NotFound from "./components/tools/NotFound"
import selectToken from "./store/login-selector"
import { fetchChannels } from "./store/channels"
import Slack from "./components/Slack/Slack"

function App() {
  const jwtToken = useSelector(selectToken)
  const dispatch = useDispatch()
  const onClickChannels = () => {
    dispatch(fetchChannels())
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Slack />

          {!jwtToken && <Redirect to="*/login" />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
}

export default App
