import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIngredients } from "../../services/actions/IngredientActions";
import componentStyles from './OrderTapeCardDetails.module.css';
import getOrderReadableDate from "../../utils/Date";
import { getOrderTotalCost, getReadableOrderStatus, getUniqueOrderIngredients } from "../../utils/Order";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { WS_ALL_ORDERS_CONNECTION_CLOSED, WS_ALL_ORDERS_CONNECTION_START } from "../../services/actions/WsActions";
import OrderTapeCardDetailsIngredient from "../OrderTapeCardDetailsIngredient/OrderTapeCardDetailsIngredient";
import { IOrderTapCardDetailParams } from "../../interfaces/components/OrderTapCardDetails/IOrderTapCardDetailParams";
import { RootState } from "../../services/reducers/RootReducer";
import { IIngredient } from "../../interfaces/models/IIngredient";
import { IOrder } from "../../interfaces/models/IOrder";
import { useAppDispatch, useAppSelector } from "../../index";

const OrderTapeCardDetails = (): JSX.Element => {
  const { id } = useParams<IOrderTapCardDetailParams>();
  const dispatch = useAppDispatch();
  const originalIngredients: Array<IIngredient> = useAppSelector((store: RootState) => store.ingredients.items);
  const { allOrders } = useAppSelector((store: RootState) => store.ws);
  const [currentOrder, setCurrentOrder] = useState<IOrder | undefined>();
  const [mappedIngredients, setMappedIngredients] = useState<Array<IIngredient> | undefined>();

  useEffect(() => {
    dispatch({ type: WS_ALL_ORDERS_CONNECTION_START });

    return (() => {
      dispatch({ type: WS_ALL_ORDERS_CONNECTION_CLOSED });
    });
  }, [dispatch]);

  useEffect(() => {
    if (allOrders) {
      setCurrentOrder(allOrders.find(item => item._id === id));
    }
  }, [allOrders, id]);

  useEffect(() => {
    if (!originalIngredients || originalIngredients.length < 1) {
      dispatch(getIngredients());
      return;
    }

    const mappedIngredients: Array<IIngredient> = currentOrder?.ingredients
      .map(item => originalIngredients.find(original => original._id === item))
      .filter(item => item) as Array<IIngredient>;

    setMappedIngredients(mappedIngredients);
  }, [dispatch, originalIngredients, currentOrder]);

  return (
    <div className={ componentStyles.container }>
      { currentOrder && mappedIngredients ?
        (<div className={ `pt-15 pb-15` }>
          <p className="text text_type_digits-default">#{ currentOrder.number }</p>
          <p className="mt-10 text text_type_main-medium">{ currentOrder.name }</p>
          <p className={`mt-3 text text_type_main-default ${componentStyles.status}`}>{ getReadableOrderStatus(currentOrder.status) }</p>
          <p className="mt-15 text text_type_main-medium">Состав:</p>
          <div className={ `mt-6 pr-6 ${ componentStyles.ingredients }` }>
            { Array.from(getUniqueOrderIngredients(mappedIngredients).values())
              .sort((a, b) => b[0].type === "bun" ? 1 : -1)
              .map((value, index) =>
                (<div key={value[0]._id} className={index !== 0 ? "mt-4" : ""}>
                  <OrderTapeCardDetailsIngredient ingredient={ value[0] } count={ value.length }/>
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