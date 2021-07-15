import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "../ConstructorIngredientList/ConstructorIngredientList.module.css";
import clsx from "clsx";
import ConstructorIngredient from "../ConstructorIngredient/ConstructorIngredient";
import PropTypes from 'prop-types';
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { SELECT_INGREDIENT } from '../../services/actions/IngredientActions';
import { useCallback } from "react";

const ConstructorIngredientList = (props) => {
  const dispatch = useDispatch();
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch({ type: SELECT_INGREDIENT, itemId: item.id })
    },
  });

  const getIngredientData = (id) => {
    const ingredient = props.ingredients.filter(item => item._id === id)[0];
    const ingredientIndex = props.ingredients.indexOf(ingredient);
    return {
      ingredient,
      ingredientIndex
    };
  };

  return (
    <div ref={dropTarget} className={componentStyles.container}>
      {props.bun && (
      <div className="mb-4">
        <ConstructorIngredient
          getIngredientData={getIngredientData}
          type="top"
          isLocked={true}
          thumbnail={props.bun.image}
          text={props.bun.name.concat(" (верх)")}
          price={props.bun.price}
        />
      </div>
      )}
      <div className={ (clsx(componentStyles.ingredientList), componentStyles.ingredientList) }>
        {props.ingredients.filter(item => item.type !== 'bun').map((item, index) => (
          <div key={item._id} className={`${index !== 0 ? "mt-4" : ""} ${componentStyles.ingredientWrapper}`} >
            <ConstructorIngredient id={item._id} text={item.name} price={item.price} thumbnail={item.image} getIngredientData={getIngredientData}  >
              <div className="mr-2">
                <DragIcon type="primary" />
              </div>
            </ConstructorIngredient>
          </div>
        ))}
      </div>
      {props.bun && (
      <div className="mt-4">
        <ConstructorIngredient
           getIngredientData={getIngredientData}
          type="bottom"
          thumbnail={props.bun.image}
          isLocked={true}
          text={props.bun.name.concat(" (низ)")}
          price={props.bun.price}
        />
      </div>
      )}
    </div>
  );
};

const ingredientListPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

ConstructorIngredientList.propTypes = PropTypes.shape({
  bun: PropTypes.objectOf(ingredientListPropTypes.isRequired).isRequired,
  ingredients: PropTypes.arrayOf(ingredientListPropTypes.isRequired).isRequired
}).isRequired;

export default ConstructorIngredientList;
