import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./ConstructorIngredient.module.css";
import PropTypes from 'prop-types';

const ConstructorIngredient = (props) => {
  return (
    <div className={componentStyles.container}>
      <div>{props.children ?? <div className="ml-8"></div>}</div>
      <div className={componentStyles.ingredientWrapper}>
        <ConstructorElement {...props} />
      </div>
    </div>
  );
};

const IngredientPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});

ConstructorIngredient.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired
};

export default ConstructorIngredient;
