import componentStyles from "../IngredientDetails/IngredientDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIngredients } from "../../services/actions/IngredientActions";
import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const IngredientDetails = ({ headerAlign = '' }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { items, itemsRequestPending } = useSelector(
    (store) => store.ingredients
  );
  const [viewedIngredient, setViewedIngredient] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (id) {
      dispatch(getIngredients());
    }
  }, [dispatch, id]);

  useEffect(() => {
    const ingredient = items.find((item) => item._id === id);
    setViewedIngredient(ingredient);

    if (!ingredient) {
      setError(
        itemsRequestPending
          ? ""
          : `Ингредиент с идентификатором ${ id } не найден`
      );
    }
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

IngredientDetails.propTypes = PropTypes.shape({
  headerAlign: PropTypes.string,
}).isRequired;

export default IngredientDetails;
