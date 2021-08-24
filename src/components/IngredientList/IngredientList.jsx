import Ingredient from "../Ingredient/Ingredient";
import componentStyles from "./IngredientList.module.css";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { InView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";

const IngredientList = forwardRef(
  ({ ingredients, name, type, handleScroll }, ref) => {
    const location = useLocation();

    return (
      <div ref={ ref } id={ type }>
        <InView
          onChange={ handleScroll(type) }
          threshold={ [0, 0.25, 0.5, 0.75, 1] }
        >
          <div className="mt-10">
            <h1 className="text text_type_main-medium">{ name }</h1>
            <div className={ `mt-6 ${ componentStyles.ingredientWrapper }` }>
              { ingredients.map((item) => {
                return (
                  <Link
                    className={ componentStyles.link }
                    key={ item._id }
                    to={ {
                      pathname: `/ingredients/${ item._id }`,
                      state: { background: location },
                    } }
                  >
                    <Ingredient
                      id={ item._id }
                      name={ item.name }
                      price={ item.price }
                      image={ item.image }
                      type={ item.type }
                      showIngredientDetails={ () => {
                      } }
                    />
                  </Link>
                );
              }) }
            </div>
          </div>
        </InView>
      </div>
    );
  }
);

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
  carbohydrates: PropTypes.number.isRequired,
});

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleScroll: PropTypes.func.isRequired,
};

export default IngredientList;
