import componentStyles from "../IngredientDetails/IngredientDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/actions/IngredientActions";
import { useState } from "react";
import { useEffect } from "react";

const IngredientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingredients = useSelector((store) => store.ingredients.items);
  const viewedIngredient = useSelector((store) => store.ingredients.viewedItem);
  const [ingredientData, setIngredientData] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(getIngredients());
    }

    const result = id
      ? ingredients.find((item) => item._id === id)
      : viewedIngredient;
    setIngredientData({ ingredient: result });
  }, [dispatch, id, ingredients, viewedIngredient]);

  return (
    <>
      {ingredientData.ingredient ? (
        <div className={`mb-15 ${componentStyles.content}`}>
          <img
            className={componentStyles.ingredientImage}
            src={ingredientData.ingredient.image_large}
            alt={ingredientData.ingredient.name}
          />
          <p
            className={`mt-4 text text_type_main-medium ${componentStyles.textCenter}`}
          >
            {ingredientData.ingredient.name}
          </p>
          <div
            className={`mt-8 ${componentStyles.ingredientInfo} ${componentStyles.textCenter}`}
          >
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Калории, ккал
              </p>
              <p className="mt-2 text text_type_digits-default text_color_inactive">
                {ingredientData.ingredient.calories}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Белки, г
              </p>
              <p className="mt-2 text text_type_digits-default text_color_inactive">
                {ingredientData.ingredient.proteins}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Жиры, г.
              </p>
              <p className="mt-2 text text_type_digits-default text_color_inactive">
                {ingredientData.ingredient.fat}
              </p>
            </div>
            <div>
              <p className="text text_type_main-default text_color_inactive">
                Углеводы, г
              </p>
              <p className="mt-2 text text_type_digits-default text_color_inactive">
                {ingredientData.ingredient.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Ингредиент с идентификатором {id} не найден</p>
      )}
    </>
  );
};

export default IngredientDetails;
