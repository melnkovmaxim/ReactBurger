import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./ConstructorIngredient.module.css";
import PropTypes from 'prop-types';
import { useDrag, useDrop } from "react-dnd";
import { MOVE_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/IngredientActions';
import { useDispatch } from "react-redux";

const ConstructorIngredient = ({ id, type, constructorIngredientId, index, children, text, price, thumbnail }) => {
  const dispatch = useDispatch();
  const [ { isDragging }, dragRef] = useDrag(() => ({ 
    type: "constructorIngredient", 
    item: { draggedItemId: constructorIngredientId, originalIndex: index },
    canDrag: !type,

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        dispatch({ type: MOVE_CONSTRUCTOR_INGREDIENT, draggedItemId: item.draggedItemId, targetItemIndex: item.originalIndex });
      }
    },
  }), [id]);
  
  const [, dropRef] = useDrop(() => ({
    accept: "constructorIngredient",
    canDrop: (item) => !type,
    hover(item) {
      if (item.draggedItemId !== constructorIngredientId) {
        dispatch({ type: MOVE_CONSTRUCTOR_INGREDIENT, draggedItemId: item.draggedItemId, targetItemId: constructorIngredientId });
      }
    },
    drop(item) {
      if (item.draggedItemId !== constructorIngredientId) {
        dispatch({ type: MOVE_CONSTRUCTOR_INGREDIENT, draggedItemId: item.draggedItemId, targetItemId: constructorIngredientId });
      }
    }
  }))

  const onDelete = () => {
    dispatch({ type: REMOVE_CONSTRUCTOR_INGREDIENT, constructorItemId: constructorIngredientId })
  };
  
  return (
    <div ref={(node) => dragRef(dropRef(node))} className={componentStyles.container} style={{ opacity: isDragging ? 0 : 1 }}>
      <div>{children ?? (<div className="ml-8"></div>)}</div>
      <div className={componentStyles.ingredientWrapper}>
        <ConstructorElement type={type} text={text} price={price} thumbnail={thumbnail} handleClose={onDelete} />
      </div>
    </div>
  );
};

ConstructorIngredient.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool
};

export default ConstructorIngredient;
