import ConstructorIngredientList from "../ConstructorIngredientList/ConstructorIngredientList";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./BurgerConstructor.module.css";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/actions/OrderActions";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "../../utils/Cookie";
import { RootState } from "../../services/reducers/RootReducer";
import { History } from "history";
import LocationState = History.LocationState;
import { IConstructorIngredient } from "../../interfaces/models/IConstructorIngredient";
import { IBurgerConstructorLocationState } from "../../interfaces/components/BurgerConstructor/IBurgerConstructorLocationState";

const BurgerConstructor = (): JSX.Element => {
  const dispatch: Dispatch<any> = useDispatch();
  const [totalPrice, setTotalPrice] = useState<number>();
  const ingredients: Array<IConstructorIngredient> = useSelector(
    (store: RootState) => store.ingredients.constructorItems
  );
  const bun: IConstructorIngredient | undefined = ingredients.find((item) => item.type === "bun");
  const history: History<LocationState & IBurgerConstructorLocationState> = useHistory();
  const createOrderRequestPending = useSelector((store: RootState) => store.order.createOrderRequestPending);

  useEffect(() => {
    const bunsPrice: number = bun ? bun.price * 2 : 0;
    const ingredientsPrice: number = ingredients.reduce((total, current) => {
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
      history.push("/login", { from: history.location.pathname, isRepeatAction: false });
      return;
    }

    const bunId: string = bun ? bun._id : "";
    dispatch(
      createOrder(
        bunId,
        ingredients
          .filter((ingredient) => ingredient._id !== bunId)
          .map((ingredient) => ingredient._id)
      )
    );

    history.push('/order', { background: history.location } as IBurgerConstructorLocationState);
  };

  return (
    <>
      <div className={ `pt-25 ${ componentStyles.container }` }>
        <div className="ml-8">
          <ConstructorIngredientList bun={ bun } ingredients={ ingredients }/>
          <div className={ `mt-10 mr-4 ${ componentStyles.flexContainer }` }>
            <span className={ `mr-10 ${ componentStyles.bottomMenuWrapper }` }>
              <p className="mr-4 text text_type_digits-medium">{ totalPrice }</p>
              <CurrencyIcon type="primary"/>
            </span>
            <Button type="primary" size="large" onClick={ () => onClick() }>
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerConstructor;
