import IngredientIcon from "../IngredientIcon/IngredientIcon";
import componentStyles from './OrderTapeCardDetailsIngredient.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderTapeCardDetailsIngredient = ({ ingredient, count }) => {
  return (
    <div className={componentStyles.container}>
      <IngredientIcon {...ingredient} />
      <p className={`ml-4 text text_type_main-default ${componentStyles.ingredientName}`}>{ingredient.name}</p>
      <div className={`ml-4 ${componentStyles.ingredientPrice}`}>
        <p className="mr-2 text text_type_digits-default">{count} x {ingredient.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
};

export default OrderTapeCardDetailsIngredient;