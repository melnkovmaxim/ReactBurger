import componentStyles from './OrdersTape.module.css';
import OrderTapeCard from "../OrderTapeCard/OrderTapeCard";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { IOrdersTapeProps } from "../../interfaces/components/OrdersTape/IOrdersTapeProps";

const OrdersTape = ({ orders, originalIngredients }: IOrdersTapeProps): JSX.Element => {
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

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
});

const orderPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
});

OrdersTape.propTypes = PropTypes.shape({
  orders: PropTypes.arrayOf(orderPropTypes.isRequired).isRequired,
  originalIngredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}).isRequired;

export default OrdersTape;