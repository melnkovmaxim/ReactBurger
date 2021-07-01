import Ingredient from "../Ingredient/Ingredient";
import componentStyles from './IngredientList.module.css';
import PropTypes from 'prop-types';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useRef, useState } from 'react';
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const IngredientList = (props) => {
  const name = props.name;
  const ingredients = props.ingredients;
  const ingredientDetailsRef = useRef(null);
  const [selectedIngredient, setSelectedIngredient] = useState();

  const showIngredientDetails = () => {
    ingredientDetailsRef.current.show();
  };

  return (
    <>
      <ModalOverlay ref={ingredientDetailsRef} header="Детали ингредиента" >
        { selectedIngredient && <IngredientDetails {...selectedIngredient} /> } 
      </ModalOverlay>
      <div className="mt-10">
        <h1 className="text text_type_main-medium">{name}</h1>
        <div className={`mt-6 ${componentStyles.ingredientWrapper}`}>
          {ingredients.map((item, index) => (
            <Ingredient
              key={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              count={index === 0 ? 1 : 0 }
              onClick={() => { 
                setSelectedIngredient(item); 
                showIngredientDetails(); 
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
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
