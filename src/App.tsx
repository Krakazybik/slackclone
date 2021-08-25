import React, { useEffect, useState } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import Login from "./components/Login/Login"
import { JWTContext, AuthContext } from "./components/tools/contexts"
import NotFound from "./components/tools/NotFound"

function App() {
  const [jwtToken, setJwtToken] = useState<string>("")

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken")
    if (storedToken) setJwtToken(storedToken)
  }, [])

  return (
    <div className="App">
      <JWTContext.Provider value={{ jwtToken, setJwtToken }}>
        <AuthContext.Provider value={!!jwtToken}>
          <Switch>
            <Route exact path="/">
              <div>o_O</div>
              {!jwtToken && <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </AuthContext.Provider>
      </JWTContext.Provider>
    </div>
  )
}

export default App
