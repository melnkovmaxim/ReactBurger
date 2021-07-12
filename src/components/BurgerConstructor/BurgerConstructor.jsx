import ConstructorIngredientList from "../ConstructorIngredientList/ConstructorIngredientList";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./BurgerConstructor.module.css";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/actions/OrderActions";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const isCreatedOrder = useSelector(store => store.order.isCreated);
  const [totalPrice, setTotalPrice] = useState();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState();
  const ingredients = useSelector(store => store.ingredients.selectedItems);
  console.log(ingredients);
  const bun = ingredients.filter((item) => item.type === "bun")[0];

  useEffect(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const fillingPrice = ingredients.reduce((total, current) => {
      if (current.type === "bun") return 0;
      
      return total += current.price
    }, 0);

    setTotalPrice(bunPrice + fillingPrice);
  }, [bun, ingredients]);

  const onClick = () => {
    dispatch(createOrder(bun, ingredients));
    
    if (isCreatedOrder) {
      setIsDetailsModalOpen(true);
    }
  };

  const onClose = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <>
      { isDetailsModalOpen && (
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}
      <div className={`pt-25 ${componentStyles.container}`}>
        <div className="ml-8">
          <ConstructorIngredientList bun={bun} ingredients={ingredients} />
          <div className={`mt-10 mr-4 ${componentStyles.flexContainer}`}>
            <span className={`mr-10 ${componentStyles.bottomMenuWrapper}`}>
              <p className="mr-4 text text_type_digits-medium">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </span>
            <Button type="primary" size="large" onClick={() => onClick()}>
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
