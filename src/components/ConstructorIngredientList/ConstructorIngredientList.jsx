import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import elementStyles from "../ConstructorIngredientList/ConstructorIngredientList.module.css";
import clsx from "clsx";
import CustomConstructorIngredient from "../CustomConstructorIngredient/CustomConstructorIngredient";

const ConstructorIngredientList = (props) => {
  const bun = props.ingredients.filter((x) => x.type === "bun")[0];
  return (
    <div>
      <div className="mb-4">
        <CustomConstructorIngredient
          type="top"
          isLocked={true}
          thumbnail={bun.image}
          text={bun.name + " " + "(верх)"}
          price={bun.price}
        />
      </div>
      <div className={ (clsx(elementStyles.ingredientList), elementStyles.ingredientList) }>
        {props.ingredients.map((item, index) => (
          <div className={`${index !== 0 ? "mt-4" : ""} ${elementStyles.ingredientWrapper}`} >
            <CustomConstructorIngredient text={item.name} price={item.price} thumbnail={item.image} >
              <div className="mr-2">
                <DragIcon type="primary" />
              </div>
            </CustomConstructorIngredient>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <CustomConstructorIngredient
          type="bottom"
          thumbnail={bun.image}
          isLocked={true}
          text={bun.name + " " + "(низ)"}
          price={bun.price}
        />
      </div>
    </div>
  );
};

export default ConstructorIngredientList;
