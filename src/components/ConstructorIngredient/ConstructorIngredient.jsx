import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./ConstructorIngredient.module.css";

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

export default ConstructorIngredient;
