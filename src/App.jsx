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
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Logout from "./pages/Logout/Logout";
import NonAuthRoute from "./components/NonAuthRoute/NonAuthRoute";
import IngredientDetails from "./components/IngredientDetails/IngredientDetails";
import ModalOverlay from "./components/ModalOverlay/ModalOverlay";

const App = () => {
  return (
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
              <NonAuthRoute path="/login" exact={true}>
                <Login />
              </NonAuthRoute>
              <NonAuthRoute path="/register" exact={true}>
                <Register />
              </NonAuthRoute>
              <ProtectedRoute path="/logout" exact={true}>
                <Logout />
              </ProtectedRoute>
              <NonAuthRoute path="/forgot-password" exact={true}>
                <PasswordForgot />
              </NonAuthRoute>
              <NonAuthRoute path="/reset-password" exact={true}>
                <PasswordReset />
              </NonAuthRoute>
              <ProtectedRoute path="/profile">
                <Profile />
              </ProtectedRoute>
              <Route path="/ingredients/:id">
                <ModalOverlay header="Детали ингредиента"><IngredientDetails /></ModalOverlay>
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
  );
};

export default App;
