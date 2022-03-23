import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import $ from "jquery"; 
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import themeFile from "./utils/theme";
import JwtDecode from "jwt-decode";
import  AuthRoute from "./utils/AuthRoute";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { getUserData, logOut } from "./redux/action/userAction";
import { SET_AUTHENTICATED } from "./redux/Types";
import Axios from "axios";
import User from "./pages/User";
const theme = createMuiTheme(themeFile);
const token = localStorage.getItem("FBIdToken");
Axios.defaults.baseURL =
  "https://us-central1-socialape-dde38.cloudfunctions.net/api";
if (token) {
  const decodedToken = JwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOut());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED});
    Axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            {/* Routing path */}
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/signup" component={Signup} />
                  <Route exact path="/users/:handle" component={User} />
                  <Route exact path="/users/:handle/scream/:screamId" component={User} />
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
