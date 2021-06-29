import Ingredient from "../Ingredient/Ingredient";
import componentStyles from './IngredientList.module.css';
import PropTypes from 'prop-types';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useRef } from 'react';

const IngredientList = (props) => {
  const name = props.name;
  const ingredients = props.ingredients;
  const ingredientDetailsRef = useRef(null);

  const showIngredientDetails = () => {
    ingredientDetailsRef.current.show();
  };

  return (
    <>
      <IngredientDetails ref={ingredientDetailsRef}/>
      <div id={props.type} className="mt-10">
        <h1 className="text text_type_main-medium">{name}</h1>
        <div className={`mt-6 ${componentStyles.ingredientWrapper}`}>
          {ingredients.map((item, index) => (
            <Ingredient
              key={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              count={index === 0 ? 1 : 0 }
              onClick={showIngredientDetails}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const IngredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired
};

export default IngredientList;
