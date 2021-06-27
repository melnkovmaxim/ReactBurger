import { Counter, CurrencyIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from './Ingredient.module.css';
import PropTypes from 'prop-types';

const Ingredient = (props) => {
  return (
    <div className={componentStyles.container} >
      <img src={props.image} className="pl-4 pr-4" />
      <span className={`mt-1 mb-1 text text_type_digits-default ${componentStyles.price}`}>
        <p className="pr-1">{props.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={`text text_type_main-default ${componentStyles.name}`}>{props.name}</p>
      {props.count > 0 
        ? <Counter count="1" size="default" />
        : null
      }
    </div>
  );
};

const IngredientPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});

Ingredient.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired
};

export default Ingredient;
