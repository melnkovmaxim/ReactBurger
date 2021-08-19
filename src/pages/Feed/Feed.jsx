import FeedTap from "../../components/FeedTap/FeedTap";
import FeedStatistics from "../../components/FeedStatistics/FeedStatistics";
import componentStyles from './Feed.module.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_PUBLIC_ORDERS_CONNECTION_CLOSED,
  WS_PUBLIC_ORDERS_CONNECTION_START
} from "../../services/actions/WsActions";
import { getIngredients } from "../../services/actions/IngredientActions";

const Feed = () => {
  const originalIngredients = useSelector(store => store.ingredients.items);
  const { orders, total, totalToday } = useSelector(store => store.ws);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_PUBLIC_ORDERS_CONNECTION_START });

    return (() => {
      dispatch({ type: WS_PUBLIC_ORDERS_CONNECTION_CLOSED });
    });
  }, [dispatch]);

  useEffect(() => {
    if (!originalIngredients || originalIngredients.length < 1) {
      dispatch(getIngredients());
    }
  }, [dispatch]);

  return (
    <div className={ `mt-8 ${ componentStyles.container }` }>
      <p className={ "text text_type_main-large" }>Лента заказов</p>
      <div className={ `mt-6 ${ componentStyles.innerContainer }` }>
        { orders && <FeedTap orders={ orders } originalIngredients={ originalIngredients }/> }
        <div className="ml-15"/>
        { orders && <FeedStatistics orders={ orders } total={ total } totalToday={ totalToday }/> }
      </div>
    </div>
  )
};

export default Feed;