import Ingredient from "../Ingredient/Ingredient";
import componentStyles from './IngredientList.module.css';
import PropTypes from 'prop-types';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useRef, useState } from 'react';
import Modal from "../Modal/Modal";

const IngredientList = (props) => {
  const name = props.name;
  const ingredients = props.ingredients;
  const ingredientDetailsRef = useRef(null);
  const [selectedIngredient, setSelectedIngredient] = useState();

  const showIngredientDetails = () => {
    ingredientDetailsRef.current.show();
  };

  return (
    <div id={props.type}>
      <Modal ref={ingredientDetailsRef} header="Детали ингредиента" >
        { selectedIngredient && <IngredientDetails {...selectedIngredient} /> } 
      </Modal>
      <div className="mt-10">
        <h1 className="text text_type_main-medium">{name}</h1>
        <div className={`mt-6 ${componentStyles.ingredientWrapper}`}>
          {ingredients.map((item, index) => {
            const defaultCount = index === 0 ? 1 : 0;
            const bunCount = item._id === props.bunId ? 2 : defaultCount;

            return (<Ingredient
              key={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              count={bunCount}
              onClick={() => { 
                setSelectedIngredient(item); 
                showIngredientDetails(); 
              }}
            />)
          })}
        </div>
      </div>
    </div>
  );
};

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
