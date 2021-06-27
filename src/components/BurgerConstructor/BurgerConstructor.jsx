import ConstructorIngredientList from "../ConstructorIngredientList/ConstructorIngredientList";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./BurgerConstructor.module.css";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const BurgerConstructor = (props) => {
  const [ingredients, setIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setIngredients(props.ingredients);
    setTotalPrice(props.ingredients.reduce((total, current) => (total += current.price), 0))
  });

  return (
    <div className={`pt-25 ${componentStyles.container}`}>
      <div className="ml-8">
        <ConstructorIngredientList ingredients={ingredients} />
        <div className={`mt-10 mr-4 ${componentStyles.flexContainer}`}>
          <span className={`mr-10 ${componentStyles.bottomMenuWrapper}`}>
            <p className="mr-4 text text_type_digits-medium">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </span>
          <Button type="primary" size="large">Оформить заказ</Button>
        </div>
      </div>
    </div>
  );
};

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};

export default BurgerConstructor;
