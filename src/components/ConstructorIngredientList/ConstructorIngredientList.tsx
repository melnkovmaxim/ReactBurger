import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "../ConstructorIngredientList/ConstructorIngredientList.module.css";
import clsx from "clsx";
import ConstructorIngredient from "../ConstructorIngredient/ConstructorIngredient";
import { useDrop } from "react-dnd";
import { ADD_CONSTRUCTOR_INGREDIENT } from '../../services/actions/IngredientActions';
import { RootState } from "../../services/reducers/RootReducer";
import { IConstructorIngredientListDragItem } from "../../interfaces/components/ConstructorIngredientList/IConstructorIngredientListDragItem";
import { IConstructorIngredientListProps } from "../../interfaces/components/ConstructorIngredientList/IConstructorIngredientListProps";
import { useAppDispatch, useAppSelector } from "../../index";

const ConstructorIngredientList = ({ bun, ingredients }: IConstructorIngredientListProps): JSX.Element => {
  const isDragging: boolean = useAppSelector((store: RootState) => store.ingredients.isDragging);
  const dispatch = useAppDispatch();
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      const draggedElement = item as IConstructorIngredientListDragItem;
      dispatch({ type: ADD_CONSTRUCTOR_INGREDIENT, itemId: draggedElement.id });
    },
  });

  return (
    <div ref={ dropTarget }
         className={ `constructor-ingredients  ${ componentStyles.container } ${ isDragging && componentStyles.border }` }>
      { bun && (
        <div className="mb-4">
          <ConstructorIngredient
            constructorIngredientId={ bun.constructorItemId }
            type="top"
            isLocked={ true }
            thumbnail={ bun.image }
            text={ bun.name.concat(" (верх)") }
            price={ bun.price }
            ingredientType={ "bun" }
          />
        </div>
      ) }
      <div className={ (clsx(componentStyles.ingredientList), componentStyles.ingredientList) }>
        { ingredients.filter(item => item.type !== 'bun').map((item, index) => (
          <div key={ item.constructorItemId }
               className={ `${ index !== 0 ? "mt-4" : "" } ${ componentStyles.ingredientWrapper }` }>
            <ConstructorIngredient constructorIngredientId={ item.constructorItemId } id={ item._id } text={ item.name }
                                   price={ item.price } thumbnail={ item.image } index={ index }
                                   ingredientType={ item.type }>
              <div className="mr-2">
                <DragIcon type="primary"/>
              </div>
            </ConstructorIngredient>
          </div>
        )) }
      </div>
      { bun && (
        <div className="mt-4">
          <ConstructorIngredient
            constructorIngredientId={ bun.constructorItemId }
            type="bottom"
            thumbnail={ bun.image }
            isLocked={ true }
            text={ bun.name.concat(" (низ)") }
            price={ bun.price }
            ingredientType={ "bun" }
          />
        </div>
      ) }
    </div>
  );
};

export default ConstructorIngredientList;
