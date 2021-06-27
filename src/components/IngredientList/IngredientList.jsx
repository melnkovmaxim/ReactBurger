import Ingredient from "../Ingredient/Ingredient";
import componentStyles from './IngredientList.module.css';

const IngredientList = (props) => {
  const name = props.name;
  const ingredients = props.ingredients;

  return (
    <div id={props.type}>
      <h1>{name}</h1>
      <div className={componentStyles.ingredientWrapper}>
        {ingredients.map((i) => (
          <Ingredient
            id={i._id}
            name={i.name}
            price={i.price}
            image={i.image}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
