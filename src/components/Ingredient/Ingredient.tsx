import { Counter, CurrencyIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from './Ingredient.module.css';
import { useDrag } from "react-dnd";
import { DRAG, DROP } from "../../services/actions/IngredientActions";
import { memo } from "react";
import { IIngredientProps } from "../../interfaces/components/Ingredient/IIngredientProps";
import { RootState } from "../../services/reducers/RootReducer";
import { useAppDispatch, useAppSelector } from "../../index";

const Ingredient = memo(({ id, name, image, price, type, showIngredientDetails }: IIngredientProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const count: number = useAppSelector((store: RootState) => store.ingredients.constructorItemCounts.get(id)) ?? 0;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { id: id },
    canDrag: (item) => {
      dispatch({ type: DRAG });
      return true;
    },
    end: (item, monitor) => {
      dispatch({ type: DROP });
    }
  });

  return (
    <div ref={ dragRef } className={ `burger-ingredient burger-ingredient-${ type } ${ componentStyles.container } ` }
         onClick={ () => showIngredientDetails(id) }>
      <img src={ image } alt={ name } className="pl-4 pr-4"/>
      <span className={ `mt-1 mb-1 text text_type_digits-default ${ componentStyles.price }` }>
        <p className="pr-1">{ price }</p>
        <CurrencyIcon type="primary"/>
      </span>
      <p className={ `text text_type_main-default ${ componentStyles.name }` }>{ name }</p>
      { count > 0 && (<Counter count={ count } size="default"/>) }
    </div>
  );
});

export default Ingredient;
