import componentStyles from "../IngredientDetails/IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/actions/IngredientActions";
import { useEffect } from "react";
import { useState } from "react";
import { IIngredientDetailsProps } from "../../interfaces/components/IngredientDetails/IIngredientDetailsProps";
import { IIngredient } from "../../interfaces/models/IIngredient";
import { IIngredientDetailsParams } from "../../interfaces/components/IngredientDetails/IIngredientDetailsParams";
import { useAppDispatch, useAppSelector } from "../../index";

const IngredientDetails = ({ headerAlign }: IIngredientDetailsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams<IIngredientDetailsParams>();
  const { items, itemsRequestPending } = useAppSelector(
    (store) => store.ingredients
  );
  const [viewedIngredient, setViewedIngredient] = useState<IIngredient>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (id) {
      dispatch(getIngredients());
    }
  }, [dispatch, id]);

  useEffect(() => {
    const ingredient: IIngredient | undefined = items.find((item) => item._id === id);

    if (!ingredient) {
      setError(
        itemsRequestPending
          ? ""
          : `Ингредиент с идентификатором ${ id } не найден`
      );

      return;
    }

    setViewedIngredient(ingredient);
  }, [id, items, itemsRequestPending]);

  return (
    <>
      { viewedIngredient ? (
        <div className={ componentStyles.container }>
          { " " }
          <div className={ componentStyles.headerWrapper }>
            <div className={ `mt-10 ml-10 mr-10 ${ componentStyles.header }` }>
              <p
                className={ `text text_type_main-large ${ componentStyles.headerTextCenter }` }
                style={ { textAlign: headerAlign } }
              >
                { "Детали ингредиента" }
              </p>
            </div>
          </div>
          <div className={ `mb-15 ${ componentStyles.content }` }>
            <img
              className={ componentStyles.ingredientImage }
              src={ viewedIngredient.image_large }
              alt={ viewedIngredient.name }
            />
            <p
              className={ `mt-4 text text_type_main-medium ${ componentStyles.textCenter }` }
            >
              { viewedIngredient.name }
            </p>
            <div
              className={ `mt-8 ${ componentStyles.ingredientInfo } ${ componentStyles.textCenter }` }
            >
              <div>
                <p className="text text_type_main-default text_color_inactive">
                  Калории, ккал
                </p>
                <p className="mt-2 text text_type_digits-default text_color_inactive">
                  { viewedIngredient.calories }
                </p>
              </div>
              <div>
                <p className="text text_type_main-default text_color_inactive">
                  Белки, г
                </p>
                <p className="mt-2 text text_type_digits-default text_color_inactive">
                  { viewedIngredient.proteins }
                </p>
              </div>
              <div>
                <p className="text text_type_main-default text_color_inactive">
                  Жиры, г.
                </p>
                <p className="mt-2 text text_type_digits-default text_color_inactive">
                  { viewedIngredient.fat }
                </p>
              </div>
              <div>
                <p className="text text_type_main-default text_color_inactive">
                  Углеводы, г
                </p>
                <p className="mt-2 text text_type_digits-default text_color_inactive">
                  { viewedIngredient.carbohydrates }
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>{ error }</p>
      ) }
    </>
  );
};

export default IngredientDetails;
