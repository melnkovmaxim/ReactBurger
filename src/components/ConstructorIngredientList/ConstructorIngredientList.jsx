import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientListStyle from "../ConstructorIngredientList/ConstructorIngredientList.module.css";
import clsx from "clsx";
import CustomConstructorIngredient from "../CustomConstructorIngredient/CustomConstructorIngredient";

const ConstructorIngredientList = (props) => {
  return (
    <div
      className={clsx(ingredientListStyle.list)}
      style={{
        maxHeight: "385px",
        overflowY: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {props.ingredients.map((item) => (
        <div className="mt-4" style={{ display: "flex", alignItems: "center" }}>
          <CustomConstructorIngredient
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            style={{ width: "100%" }}
          >
            <div className="mr-2">
              <DragIcon type="primary" />
            </div>
          </CustomConstructorIngredient>
        </div>
      ))}
    </div>
  );
};

export default ConstructorIngredientList;
