import OrdersTape from "../../components/OrdersTape/OrdersTape";
import FeedStatistics from "../../components/FeedStatistics/FeedStatistics";
import componentStyles from './Feed.module.css';
import React, { useEffect } from "react";
import {
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_START
} from "../../services/actions/WsActions";
import { getIngredients } from "../../services/actions/IngredientActions";
import { Switch, useHistory, useLocation, Route } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import OrderTapeCardDetails from "../../components/OrderTapeCardDetails/OrderTapeCardDetails";
import { RootState } from "../../services/reducers/RootReducer";
import { History, Location, LocationState } from "history";
import { ILocationState } from "../../interfaces/pages/ILocationState";
import { IIngredient } from "../../interfaces/models/IIngredient";
import { useAppDispatch, useAppSelector } from "../../index";

const Feed = (): JSX.Element => {
  const originalIngredients: Array<IIngredient> = useAppSelector((store: RootState) => store.ingredients.items);
  const { allOrders, total, totalToday } = useAppSelector((store: RootState) => store.ws);
  const dispatch = useAppDispatch();
  const history: History<LocationState> = useHistory();
  const location: LocationState & ILocationState = useLocation();
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
  }, [dispatch, originalIngredients]);

  return (
    <>
      <Switch
        location={ ((history.action === "PUSH" || history.action === "REPLACE") && background as Location<unknown>) || location as Location<unknown> }>
        <Route path="/feed" exact={ true }>
          <div className={ `mt-8 ${ componentStyles.container }` }>
            <p className={ "text text_type_main-large" }>Лента заказов</p>
            <div className={ `mt-6 ${ componentStyles.innerContainer }` }>
              { allOrders && <OrdersTape orders={ allOrders } originalIngredients={ originalIngredients }/> }
              <div className="ml-15"/>
              { allOrders && <FeedStatistics orders={ allOrders } total={ total } totalToday={ totalToday }/> }
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