import IngredientIcon from "../IngredientIcon/IngredientIcon";
import componentStyles from './OrderTapeCardDetailsIngredient.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const OrderTapeCardDetailsIngredient = ({ ingredient, count }) => {
  return (
    <div className={componentStyles.container}>
      <IngredientIcon {...ingredient} />
      <p className={`ml-4 text text_type_main-default ${componentStyles.ingredientName}`}>{ingredient.name}</p>
      <div className={`ml-4 ${componentStyles.ingredientPrice}`}>
        <p className="mr-2 text text_type_digits-default">{count} x {ingredient.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
};

const ingredientPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_mobile: PropTypes.string.isRequired,
});

OrderTapeCardDetailsIngredient.propTypes = PropTypes.shape({
  ingredient: PropTypes.objectOf(ingredientPropTypes.isRequired).isRequired,
  count: PropTypes.number.isRequired
}).isRequired;

export default OrderTapeCardDetailsIngredient;