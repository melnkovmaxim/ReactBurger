import Ingredient from "../Ingredient/Ingredient";
import componentStyles from "./IngredientList.module.css";
import { ForwardedRef, forwardRef } from "react";
import { InView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";
import { IIngredientListProps } from "../../interfaces/components/IngredientList/IIngredientListProps";
import { LocationState } from "history";

const IngredientList = forwardRef(
  ({ ingredients, name, type, handleScroll }: IIngredientListProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const location: LocationState = useLocation();

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

export default IngredientList;
