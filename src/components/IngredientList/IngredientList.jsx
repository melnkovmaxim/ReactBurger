import Ingredient from "../Ingredient/Ingredient";
import listStyle from "./IngredientList.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientList = (props) => {
  const name = props.name;
  const ingredients = props.ingredients;

  return (
    <div id={props.type}>
      <h1>{name}</h1>
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          gridTemplateColumns: "repeat(2, auto)",
          columnGap: "24px",
        }}
      >
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
