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

ConstructorIngredient.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool
};

export default ConstructorIngredient;
