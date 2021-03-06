import componentStyles from './OrderDetails.module.css';
import accessIcon from '../../images/graphics.png';
import { RootState } from "../../services/reducers/RootReducer";
import { IOrderReducerState } from "../../interfaces/services/reducers/OrderReducer/IOrderReducerState";
import { useAppSelector } from "../../index";

const OrderDetails = (): JSX.Element => {
  const order: IOrderReducerState = useAppSelector((store: RootState) => store.order);

  return (
    <>
      { order.createOrderRequestFailed
        ? <p
          className={ `pt-30 pb-30 text text_type_main-default ${ componentStyles.textCenter }` }>{ order.createOrderRequestError }</p>
        : (
          <div className={ `pt-30 pb-30 ${ componentStyles.container }` }>
            <p className={ `text text_type_digits-large ${ componentStyles.orderNumber }` }>{ order.orderNumber }</p>
            <p className={ `mt-8 text text_type_main-medium ${ componentStyles.orderIdentifier }` }>идентификатор
              заказа</p>
            <img src={ accessIcon } alt="Заказ готов" className={ `mt-15 ${ componentStyles.icon }` }></img>
            <p className="mt-15 text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="mt-2 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
              станции</p>
          </div>
        )
      }
    </>
  );
};

export default OrderDetails;
