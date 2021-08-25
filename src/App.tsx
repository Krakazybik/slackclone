import React from "react"
import { Route, Switch } from "react-router-dom"
import Login from "./components/Login/Login"
import NotFound from "./components/tools/NotFound"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <div>o_O</div>
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
