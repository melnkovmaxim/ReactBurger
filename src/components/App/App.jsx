import React from "react";
import componentStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import PasswordForgot from "../../pages/PasswordForgot/PasswordForgot";
import PasswordReset from "../../pages/PasswordReset/PasswordReset";
import Profile from "../../pages/Profile/Profile";
import NotFound from "../../pages/NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Logout from "../../pages/Logout/Logout";
import NonAuthRoute from "../NonAuthRoute/NonAuthRoute";
import Feed from "../../pages/Feed/Feed";

const App = () => {
  return (
    <div className={ componentStyles.content }>
      <Router>
        <div className={ componentStyles.header }>
          <AppHeader/>
        </div>
        <div className={ componentStyles.body }>
          <Switch>
            <Route path={ ["/", "/ingredients/:id", "/order"] } exact={ true }>
              <Home/>
            </Route>
            <Route path="/feed" exact={ true }>
              <Feed/>
            </Route>
            <NonAuthRoute path="/login" exact={ true }>
              <Login/>
            </NonAuthRoute>
            <NonAuthRoute path="/register" exact={ true }>
              <Register/>
            </NonAuthRoute>
            <ProtectedRoute path="/logout" exact={ true }>
              <Logout/>
            </ProtectedRoute>
            <NonAuthRoute path="/forgot-password" exact={ true }>
              <PasswordForgot/>
            </NonAuthRoute>
            <NonAuthRoute path="/reset-password" exact={ true }>
              <PasswordReset/>
            </NonAuthRoute>
            <ProtectedRoute path="/profile">
              <Profile/>
            </ProtectedRoute>
            <Route>
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
