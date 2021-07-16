import Ingredient from "../Ingredient/Ingredient";
import componentStyles from './IngredientList.module.css';
import PropTypes from 'prop-types';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useState } from 'react';
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ADD_CONSTRUCTOR_INGREDIENT, VIEW_INGREDIENT } from "../../services/actions/IngredientActions";
import { forwardRef } from "react";
import { InView } from "react-intersection-observer";

const IngredientList = forwardRef((props, ref) => {
  const name = props.name;
  const dispatch = useDispatch();
  const ingredients = props.ingredients;
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState();
  const viewedIngredient = useSelector(store => store.ingredients.viewedItem);

  const showIngredientDetails = () => {
    setIsDetailsModalOpen(true);
  };

  const onClose = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <div ref={ref} id={props.type}>
      <InView onChange={props.handleScroll(props.type)} threshold={[0, 0.25, 0.5, 0.75, 1]}>
        { isDetailsModalOpen && (
          <Modal onClose={onClose} header="Детали ингредиента" >
            { viewedIngredient && <IngredientDetails {...viewedIngredient} /> } 
          </Modal>
        )}
        <div className="mt-10">
          <h1 className="text text_type_main-medium">{name}</h1>
          <div className={`mt-6 ${componentStyles.ingredientWrapper}`}>
            {ingredients.map((item, index) => {
              const defaultCount = index === 0 ? 1 : 0;
              const bunCount = item._id === props.bunId ? 2 : defaultCount;

              return (<Ingredient
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                count={bunCount}
                onClick={() => { 
                  dispatch({ type: VIEW_INGREDIENT, item: item });
                  dispatch({ type: ADD_CONSTRUCTOR_INGREDIENT, itemId: item._id });
                  showIngredientDetails(); 
                }}
              />)
            })}
          </div>
        </div>
      </InView>
    </div>
  );
});

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
});

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};

export default IngredientList;
