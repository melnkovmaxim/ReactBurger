import ConstructorIngredientList from "../ConstructorIngredientList/ConstructorIngredientList";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import elementStyles from "./BurgerConstructor.module.css";

const BurgerConstructor = (props) => {
  const totalPrice = props.ingredients.reduce(
    (total, current) => (total += current.price), 0
  );

  return (
    <div className={`pt-25 ${elementStyles.element}`}>
      <div className="ml-8">
        <ConstructorIngredientList ingredients={props.ingredients} />

        <div className="mt-10 mr-4" style={{ display: "flex" }}>
          <div className={`mr-10 ${elementStyles.bottomMenuWrapper}`}>
            <span className="mr-4 text text_type_digits-medium">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large">Оформить заказ</Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
