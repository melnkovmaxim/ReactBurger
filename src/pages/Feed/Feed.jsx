import OrdersTape from "../../components/OrdersTape/OrdersTape";
import FeedStatistics from "../../components/FeedStatistics/FeedStatistics";
import componentStyles from './Feed.module.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_START
} from "../../services/actions/WsActions";
import { getIngredients } from "../../services/actions/IngredientActions";
import { Switch, useHistory, useLocation, Route, Redirect } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import OrderTapeCardDetails from "../../components/OrderTapeCardDetails/OrderTapeCardDetails";

const Feed = () => {
  const originalIngredients = useSelector(store => store.ingredients.items);
  const { orders, total, totalToday } = useSelector(store => store.ws);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch({ type: WS_ALL_ORDERS_CONNECTION_START });

    return (() => {
      dispatch({ type: WS_ALL_ORDERS_CONNECTION_CLOSED });
    });
  }, [dispatch]);

  useEffect(() => {
    if (!originalIngredients || originalIngredients.length < 1) {
      dispatch(getIngredients());
    }
  }, [dispatch]);

  return (
    <>
      <Switch location={ ((history.action === "PUSH" || history.action === "REPLACE") && background) || location }>
        <Route path="/feed" exact={true}>
          <div className={ `mt-8 ${ componentStyles.container }` }>
            <p className={ "text text_type_main-large" }>Лента заказов</p>
            <div className={ `mt-6 ${ componentStyles.innerContainer }` }>
              { orders && <OrdersTape orders={ orders } originalIngredients={ originalIngredients }/> }
              <div className="ml-15"/>
              { orders && <FeedStatistics orders={ orders } total={ total } totalToday={ totalToday }/> }
            </div>
          </div>
        </Route>
      </Switch>

      <Route path="/feed/:id">
        { background && (history.action === 'PUSH' || history.action === "REPLACE") ? (
          <Modal>
            <OrderTapeCardDetails/>
          </Modal>
        ) : (
          <OrderTapeCardDetails/>
        ) }
      </Route>
    </>
  )
};

export default Feed;