import { Counter, CurrencyIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from './Ingredient.module.css';
import PropTypes from 'prop-types';

const Ingredient = (props) => {
  return (
    <div className={componentStyles.container} onClick={props.onClick} >
      <img src={props.image} alt={props.name} className="pl-4 pr-4" />
      <span className={`mt-1 mb-1 text text_type_digits-default ${componentStyles.price}`}>
        <p className="pr-1">{props.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={`text text_type_main-default ${componentStyles.name}`}>{props.name}</p>
        {
          props.count > 0 &&
          (<Counter count={props.count} size="default" />)
        }
    </div>
  );
};

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

export default Ingredient;
