import React from "react";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Switch, Route, Redirect, useLocation, useHistory } from "react-router-dom";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch location={(history.action === "PUSH" && background) || location}>
        <Route path="/" exact={true}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <div className="ml-5 mr-5" />
            <BurgerConstructor />
          </DndProvider>
        </Route>
      </Switch>

      <Route path="/ingredients/:id">
        {background && history.action === 'PUSH' ? (
          <Modal>
            <IngredientDetails headerAlign={"left"} />
          </Modal>
        ) : (
          <IngredientDetails />
        )}
      </Route>

      <Route path="/order" exact={true}>
        {background && history.action === 'PUSH' ? (
          <Modal>
            <OrderDetails />
          </Modal>
        ) : (
          <Redirect to="/" />
        )}
      </Route>
    </>
  );
};

export default Home;
