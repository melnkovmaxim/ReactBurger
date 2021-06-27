import Ingredient from "../Ingredient/Ingredient";
import componentStyles from './IngredientList.module.css';
import PropTypes from 'prop-types';

const IngredientList = (props) => {
  const name = props.name;
  const ingredients = props.ingredients;

  return (
    <div id={props.type} className="mt-10">
      <h1 className="text text_type_main-medium">{name}</h1>
      <div className={`mt-6 ${componentStyles.ingredientWrapper}`}>
        {ingredients.map((item, index) => (
          <Ingredient
            key={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            count={ index === 0 ? 1 : 0 }
          />
        ))}
      </div>
    </div>
  );
};

const IngredientPropTypes = PropTypes.shape({
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired
};

export default IngredientList;
