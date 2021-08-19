import { getIngredients } from "../../services/actions/IngredientActions";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_USER_ORDERS_CONNECTION_START, WS_USER_ORDERS_CONNECTION_CLOSED } from "../../services/actions/WsActions";
import OrdersTape from "../OrdersTape/OrdersTape";
import componentStyles from './UserOrdersHistory.module.css';

const UserOrdersHistory = () => {
  const originalIngredients = useSelector(store => store.ingredients.items);
  const { userOrders } = useSelector(store => store.ws);
  const dispatch = useDispatch();

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
  }, [dispatch]);

  return (<div className={`ml-15 ${componentStyles.container}`}><OrdersTape orders={userOrders} originalIngredients={originalIngredients}/></div>);
};

export default UserOrdersHistory;