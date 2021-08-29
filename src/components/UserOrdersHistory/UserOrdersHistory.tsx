import { getIngredients } from "../../services/actions/IngredientActions";
import { useEffect } from "react";
import { WS_USER_ORDERS_CONNECTION_START, WS_USER_ORDERS_CONNECTION_CLOSED } from "../../services/actions/WsActions";
import OrdersTape from "../OrdersTape/OrdersTape";
import componentStyles from './UserOrdersHistory.module.css';
import { RootState } from "../../services/reducers/RootReducer";
import { IIngredient } from "../../interfaces/models/IIngredient";
import { useAppDispatch, useAppSelector } from "../../index";

const UserOrdersHistory = (): JSX.Element => {
  const originalIngredients: Array<IIngredient> = useAppSelector((store: RootState) => store.ingredients.items);
  const { userOrders } = useAppSelector((store: RootState) => store.ws);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: WS_USER_ORDERS_CONNECTION_START });

    return (() => {
      dispatch({ type: WS_USER_ORDERS_CONNECTION_CLOSED });
    });
  }, [dispatch]);

  useEffect(() => {
    if (!originalIngredients || originalIngredients.length < 1) {
      dispatch(getIngredients());
    }
  }, [dispatch, originalIngredients]);

  return (
    <div className={`ml-15 ${componentStyles.container}`}>
      <OrdersTape orders={userOrders} originalIngredients={originalIngredients} />
    </div>
  );
};

export default UserOrdersHistory;