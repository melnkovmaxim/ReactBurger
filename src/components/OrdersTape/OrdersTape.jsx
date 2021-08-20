import componentStyles from './OrdersTape.module.css';
import OrderTapeCard from "../OrderTapeCard/OrderTapeCard";
import { Link, useLocation } from "react-router-dom";

const OrdersTape = ({ orders, originalIngredients }) => {
  const location = useLocation();

  return (
    <div className={ componentStyles.container }>
      <div className={ `pr-2 ${ componentStyles.orderListWrapper }` }>
        { originalIngredients.length > 0 && orders && orders.sort((a, b) => b.number - a.number).map((item, index) =>
          item.ingredients && item.ingredients.length &&
          (<div key={ item._id } className={ index !== orders.length - 1 ? 'mb-4' : '' }>
              <Link className={ `${ componentStyles.link }` }
                    to={ { pathname: location.pathname + '/' + item._id, state: { background: location }, } }>
                <OrderTapeCard order={ item } originalIngredients={ originalIngredients }/>
              </Link>
          </div>)
        ) }
      </div>
    </div>
  );
}

export default OrdersTape;