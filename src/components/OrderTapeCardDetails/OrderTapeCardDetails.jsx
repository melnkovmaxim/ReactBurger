import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getIngredients } from "../../services/actions/IngredientActions";
import componentStyles from './OrderTapeCardDetails.module.css';
import getOrderReadableDate from "../../utils/Date";
import { getOrderTotalCost, getReadableOrderStatus } from "../../utils/Order";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { WS_ALL_ORDERS_CONNECTION_CLOSED, WS_ALL_ORDERS_CONNECTION_START } from "../../services/actions/WsActions";
import OrderTapeCardDetailsIngredient from "../OrderTapeCardDetailsIngredient/OrderTapeCardDetailsIngredient";

const OrderTapeCardDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const originalIngredients = useSelector(store => store.ingredients.items);
  const { orders } = useSelector(store => store.ws);
  const [currentOrder, setCurrentOrder] = useState();
  const [mappedIngredients, setMappedIngredients] = useState([]);

  useEffect(() => {
    dispatch({ type: WS_ALL_ORDERS_CONNECTION_START });

    return (() => {
      dispatch({ type: WS_ALL_ORDERS_CONNECTION_CLOSED });
    });
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setCurrentOrder(orders.find(item => item._id === id));
    }
  }, [orders]);

  useEffect(() => {
    if (!originalIngredients || originalIngredients.length < 1) {
      dispatch(getIngredients());
      return;
    }

    const mappedIngredients = currentOrder && currentOrder.ingredients && currentOrder.ingredients.map(item => {
      const originalIngredient = originalIngredients.find(original => original._id === item);
      return {
        _id: originalIngredient._id,
        price: originalIngredient.price,
        image_mobile: originalIngredient.image_mobile,
        name: originalIngredient.name
      };
    });
    setMappedIngredients(mappedIngredients);
  }, [dispatch, originalIngredients, currentOrder]);

  return (
    <div className={ componentStyles.container }>
      { currentOrder && mappedIngredients ?
        (<div className={ `pt-10` }>
          <p className="text text_type_digits-default">#{ currentOrder.number }</p>
          <p className="mt-10 text text_type_main-medium">{ currentOrder.name }</p>
          <p className={`mt-3 text text_type_main-default ${componentStyles.status}`}>{ getReadableOrderStatus(currentOrder.status) }</p>
          <p className="mt-15 text text_type_main-medium">Состав:</p>
          <div className={ `mt-6 pr-6 ${ componentStyles.ingredients }` }>
            { mappedIngredients.map((item, index) =>
              (<div className={index !== 0 ? "mt-4" : ""}>
                <OrderTapeCardDetailsIngredient ingredient={ item }
                                                count={ mappedIngredients.filter(item => item._id === item._id).length }/>
              </div>)
            ) }
          </div>
          <div className={`mt-10 ${componentStyles.footer}`}>
            <p className="text text_type_main-default text_color_inactive">{ getOrderReadableDate(currentOrder.createdAt) }</p>
            <div className={ componentStyles.price }>
              <p className="text text_type_digits-default mr-2">{ mappedIngredients && getOrderTotalCost(mappedIngredients) }</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>)
        : "Заказ не найден"
      }
    </div>
  );
}

export default OrderTapeCardDetails;