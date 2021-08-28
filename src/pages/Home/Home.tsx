import React from "react";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Switch, Route, Redirect, useLocation, useHistory } from "react-router-dom";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import {History, Location} from "history";
import LocationState = History.LocationState;
import {ILocationState} from "../../interfaces/pages/ILocationState";

const Home = (): JSX.Element => {
  const history: History<LocationState>  = useHistory();
  const location: LocationState & ILocationState  = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={ ((history.action === "PUSH" || history.action === "REPLACE") && (background as Location<unknown>)) || (location as Location<unknown>) }>
        <Route path="/" exact={ true }>
          <DndProvider backend={ HTML5Backend }>
            <BurgerIngredients/>
            <div className="ml-5 mr-5"/>
            <BurgerConstructor/>
          </DndProvider>
        </Route>
      </Switch>

      <Route path="/ingredients/:id">
        { background && history.action === 'PUSH' ? (
          <Modal>
            <IngredientDetails headerAlign={ "left" }/>
          </Modal>
        ) : (
          <IngredientDetails/>
        ) }
      </Route>

      <Route path="/order" exact={ true }>
        { background && (history.action === 'PUSH' || history.action === "REPLACE") ? (
          <Modal>
            <OrderDetails/>
          </Modal>
        ) : (
          <Redirect to="/"/>
        ) }
      </Route>
    </>
  );
};

export default Home;
