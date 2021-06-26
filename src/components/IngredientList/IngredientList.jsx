import Ingredient from "../Ingredient/Ingredient";

const IngredientList = (props) => {
  const name = props.name;
  const ingredients = props.ingredients;

  const scrollToIngredients = (type) => {
    document.getElementById(type).scrollIntoView({
      behavior: "smooth", // smooth scroll
      block: "start",
    });
  };

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
