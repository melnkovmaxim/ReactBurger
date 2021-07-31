import React from "react";
import componentStyles from "./App.module.css";
import AppHeader from "./components/AppHeader/AppHeader";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";

const App = () => {
    return (
        <>
            <div className={componentStyles.content}>
                <div className={componentStyles.header}>
                    <AppHeader />
                </div>
                <Router>
                    <Switch>
                        <Route path="/" exact={true}>
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </>
    );
}

export default App;