import ConstructorIngredientList from "../ConstructorIngredientList/ConstructorIngredientList";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./BurgerConstructor.module.css";
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";

const BurgerConstructor = (props) => {
  const orderDetailsRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setTotalPrice(props.ingredients.reduce((total, current) => (total += current.price), 0))
  }, [props.ingredients]);

  const onClick = () => {
    orderDetailsRef.current.show();
  };

  return (
    <>
      <OrderDetails ref={orderDetailsRef} />
      <div className={`pt-25 ${componentStyles.container}`}>
        <div className="ml-8">
          <ConstructorIngredientList ingredients={props.ingredients} />
          <div className={`mt-10 mr-4 ${componentStyles.flexContainer}`}>
            <span className={`mr-10 ${componentStyles.bottomMenuWrapper}`}>
              <p className="mr-4 text text_type_digits-medium">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </span>
            <Button type="primary" size="large" onClick={onClick}>
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </>
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
