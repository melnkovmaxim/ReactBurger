import componentStyles from "../IngredientDetails/IngredientDetails.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const viewedIngredient = useSelector((store) => store.ingredients.viewedItem);

  return (
    <div className={`mb-15 ${componentStyles.content}`}>
      <img
        className={componentStyles.ingredientImage}
        src={viewedIngredient.image_large}
        alt={viewedIngredient.name}
      />
      <p
        className={`mt-4 text text_type_main-medium ${componentStyles.textCenter}`}
      >
        {viewedIngredient.name}
      </p>
      <div
        className={`mt-8 ${componentStyles.ingredientInfo} ${componentStyles.textCenter}`}
      >
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="mt-2 text text_type_digits-default text_color_inactive">
            {viewedIngredient.calories}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="mt-2 text text_type_digits-default text_color_inactive">
            {viewedIngredient.proteins}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г.
          </p>
          <p className="mt-2 text text_type_digits-default text_color_inactive">
            {viewedIngredient.fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="mt-2 text text_type_digits-default text_color_inactive">
            {viewedIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
