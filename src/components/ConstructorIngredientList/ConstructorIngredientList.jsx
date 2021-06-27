import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "../ConstructorIngredientList/ConstructorIngredientList.module.css";
import clsx from "clsx";
import ConstructorIngredient from "../ConstructorIngredient/ConstructorIngredient";
import PropTypes from 'prop-types';

const ConstructorIngredientList = (props) => {
  const bun = props.ingredients.filter((x) => x.type === "bun")[0];

  return (
    <div>
      {bun &&
      <div className="mb-4">
        <ConstructorIngredient
          key={bun._id}
          type="top"
          isLocked={true}
          thumbnail={bun.image}
          text={bun.name + " " + "(верх)"}
          price={bun.price}
        />
      </div>}
      <div className={ (clsx(componentStyles.ingredientList), componentStyles.ingredientList) }>
        {props.ingredients.map((item, index) => (
          <div className={`${index !== 0 ? "mt-4" : ""} ${componentStyles.ingredientWrapper}`} >
            <ConstructorIngredient key={item._id} text={item.name} price={item.price} thumbnail={item.image} >
              <div className="mr-2">
                <DragIcon type="primary" />
              </div>
            </ConstructorIngredient>
          </div>
        ))}
      </div>
      {bun && <div className="mt-4">
        <ConstructorIngredient
          key={bun._id}
          type="bottom"
          thumbnail={bun.image}
          isLocked={true}
          text={bun.name + " " + "(низ)"}
          price={bun.price}
        />
      </div>}
    </div>
  );
};

const IngredientListPropTypes = PropTypes.shape({
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});

ConstructorIngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientListPropTypes.isRequired).isRequired
};

export default ConstructorIngredientList;
