import React, { useState } from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import "./App.css";
import ChangePass from "./Components/ChangePass";
import ForgotPass from "./Components/ForgotPass";
import Login from "./Components/Login";
import Protected from "./Components/Protected";
import Register from "./Components/Register";

export const AppContext = React.createContext();

function App() {
  const [log, setLog] = useState(false);
  return (
    <div className="App">
      <Router>
        <Switch>
          <AppContext.Provider value={[log, setLog]}>
            <Route path="/protected" component={Protected} />
            <Route path="/login" component={Login} />
            <Route exact path="/forgotpassword" component={ForgotPass} />
            <Route exact path="/register" component={Register} />
            <Route path="/resetpassword/:id/:token" component={ChangePass} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </AppContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
