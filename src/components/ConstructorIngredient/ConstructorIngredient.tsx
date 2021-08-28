import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./ConstructorIngredient.module.css";
import { useDrag, useDrop } from "react-dnd";
import { MOVE_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/IngredientActions';
import { useDispatch } from "react-redux";
import { IConstructorIngredientProps } from "../../interfaces/components/ConstructorIngredient/IConstructorIngredientProps";
import { Dispatch } from "react";
import { IConstructorIngredientDragItem } from "../../interfaces/components/ConstructorIngredient/IConstructorIngredientDragItem";

const ConstructorIngredient = ({
                                 id,
                                 constructorIngredientId,
                                 index,
                                 type,
                                 ingredientType,
                                 text,
                                 price,
                                 thumbnail,
                                 children,
                                 isLocked
                               }: IConstructorIngredientProps): JSX.Element => {
  const dispatch: Dispatch<any> = useDispatch();
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "constructorIngredient",
    item: { draggedItemId: constructorIngredientId, originalIndex: index },
    canDrag: !type,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop: boolean = monitor.didDrop();
      if (!didDrop) {
        dispatch({
          type: MOVE_CONSTRUCTOR_INGREDIENT,
          draggedItemId: item.draggedItemId,
          targetItemIndex: item.originalIndex
        });
      }
    },
  }), [id, index]);

  const [, dropRef] = useDrop(() => ({
    accept: "constructorIngredient",
    canDrop: (item) => !type,
    hover(item, monitor) {
      const draggedElement = item as IConstructorIngredientDragItem;
      if (monitor.canDrop() && draggedElement.draggedItemId !== constructorIngredientId) {
        dispatch({
          type: MOVE_CONSTRUCTOR_INGREDIENT,
          draggedItemId: draggedElement.draggedItemId,
          targetItemId: constructorIngredientId
        });
      }
    },
    drop(item) {
      const draggedElement = item as IConstructorIngredientDragItem;
      if (draggedElement.draggedItemId !== constructorIngredientId) {
        dispatch({
          type: MOVE_CONSTRUCTOR_INGREDIENT,
          draggedItemId: draggedElement.draggedItemId,
          targetItemId: constructorIngredientId
        });
      }
    }
  }))

  const onDelete = () => {
    dispatch({ type: REMOVE_CONSTRUCTOR_INGREDIENT, constructorItemId: constructorIngredientId })
  };

  return (
    <div ref={ (node) => dragRef(dropRef(node)) } className={ `constructor-ingredient constructor-ingredient-${ingredientType} ${componentStyles.container}` }
         style={ { opacity: isDragging ? 0 : 1 } }>
      <div>{ children ?? (<div className="ml-8"></div>) }</div>
      <div className={ componentStyles.ingredientWrapper }>
        <ConstructorElement type={ type } text={ text } price={ price } thumbnail={ thumbnail } handleClose={ onDelete }
                            isLocked={ isLocked }/>
      </div>
    </div>
  );
};

export default ConstructorIngredient;
