import ConstructorIngredientList from "../ConstructorIngredientList/ConstructorIngredientList";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./BurgerConstructor.module.css";

const BurgerConstructor = (props) => {
  const totalPrice = props.ingredients.reduce(
    (total, current) => (total += current.price), 0
  );

  return (
    <div className={`pt-25 ${componentStyles.container}`}>
      <div className="ml-8">
        <ConstructorIngredientList ingredients={props.ingredients} />
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

export default BurgerConstructor;
