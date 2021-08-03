import React from "react";
import componentStyles from "./App.module.css";
import AppHeader from "./components/AppHeader/AppHeader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PasswordForgot from "./pages/PasswordForgot/PasswordForgot";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import Profile from "./pages/Profile/Profile";
import IngredientDetails from "./pages/IngredientDetails/IngredientDetails";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Logout from "./pages/Logout/Logout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_TOKENS } from './services/actions/AuthActions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_TOKENS, accessToken: localStorage.getItem('token')
                              , refreshToken: localStorage.getItem('refreshToken')})
  }, [dispatch]);

  return (
    <>
      <div className={componentStyles.content}>
        <Router>
          <div className={componentStyles.header}>
            <AppHeader />
          </div>
          <div className={componentStyles.body}>
            <Switch>
              <Route path="/" exact={true}>
                <Home />
              </Route>
              <Route path="/login" exact={true}>
                <Login />
              </Route>
              <Route path="/register" exact={true}>
                <Register />
              </Route>
              <ProtectedRoute path="/logout" exact={true}>
                <Logout />
              </ProtectedRoute>
              <Route path="/forgot-password" exact={true}>
                <PasswordForgot />
              </Route>
              <Route path="/reset-password" exact={true}>
                <PasswordReset />
              </Route>
              <ProtectedRoute path="/profile">
                <Profile />
              </ProtectedRoute>
              <Route path="/ingredients/:id">
                <IngredientDetails />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
