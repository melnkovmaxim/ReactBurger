import componentStyles from './OrdersTape.module.css';
import OrderTapeCard from "../OrderTapeCard/OrderTapeCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/IngredientActions";

const OrdersTape = ({ orders, originalIngredients }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!originalIngredients) {
      dispatch(getIngredients());
    }
  }, [dispatch, originalIngredients]);

  return (
    <div className={ componentStyles.container }>
      <div className={ `pr-2 ${ componentStyles.orderListWrapper }` }>
        { originalIngredients.length > 0 && orders && orders.map((item, index) =>
          (<div key={ item._id } className={`${index !== orders.length - 1 && 'mb-4'}`}>
            <OrderTapeCard order={ item } originalIngredients={ originalIngredients }/>
          </div>)
        ) }
      </div>
    </div>
  );
}

export default OrdersTape;