import ConstructorIngredientList from "../ConstructorIngredientList/ConstructorIngredientList";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./BurgerConstructor.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/actions/OrderActions";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "../../utils/Cookie";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState();
  const ingredients = useSelector(
    (store) => store.ingredients.constructorItems
  );
  const bun = ingredients.find((item) => item.type === "bun");
  const history = useHistory();
  const createOrderRequestPending = useSelector(store => store.order.createOrderRequestPending);

  useEffect(() => {
    const bunsPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce((total, current) => {
      if (current.type === "bun") return total;

      return (total += current.price);
    }, 0);

    setTotalPrice(bunsPrice + ingredientsPrice);
  }, [bun, ingredients]);

  useEffect(() => {
    if (history.location.state && history.location.state.isRepeatAction) {
      onClick();
      const location = { ...history.location, isRepeatAction: false }
      history.replace({ ...location });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const onClick = () => {
    if (createOrderRequestPending) {
      return;
    }

    if (!getAccessToken()) {
      history.push("/login", { from: history.location.pathname });
      return;
    }

    const bunId = bun ? bun._id : "";
    dispatch(
      createOrder(
        bunId,
        ingredients
          .filter((ingredient) => ingredient._id !== bunId)
          .map((ingredient) => ingredient._id)
      )
    );

    history.push('/order', {background: history.location});
  };

  return (
    <>
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

export default BurgerConstructor;
