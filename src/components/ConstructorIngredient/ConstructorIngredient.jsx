import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from "./ConstructorIngredient.module.css";
import PropTypes from 'prop-types';
import { useDrag, useDrop } from "react-dnd";
import { useEffect } from "react";
import { MOVE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/IngredientActions';
import { useDispatch } from "react-redux";

const ConstructorIngredient = (props) => {
  const dispatch = useDispatch();
  const [ { isDragging }, dragRef] = useDrag(() => ({ 
    type: "selectedIngredient", 
    item: { draggedItemId: props.id, originalIndex: props.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        dispatch({ type: MOVE_CONSTRUCTOR_INGREDIENT, draggedItemId: item.draggedItemId, targetItemId: item.originalIndex });
      }
    },
  }), [props.id]);
  const [, dropRef] = useDrop(() => ({
    accept: "selectedIngredient",
    hover(item) {
      if (item.draggedItemId !== props.id) {
        dispatch({ type: MOVE_CONSTRUCTOR_INGREDIENT, draggedItemId: item.draggedItemId, targetItemId: props.id });
      }
    },
    drop(item) {
      if (item.draggedItemId !== props.id) {
        dispatch({ type: MOVE_CONSTRUCTOR_INGREDIENT, draggedItemId: item.draggedItemId, targetItemId: props.id, isDrop: true });
      }
    }
  }))
  
  return (
    <div ref={(node) => dragRef(dropRef(node))} className={componentStyles.container} style={{ opacity: isDragging ? 0 : 1 }}>
      <div>{props.children ?? (<div className="ml-8"></div>)}</div>
      <div className={componentStyles.ingredientWrapper}>
        <ConstructorElement {...props} />
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
