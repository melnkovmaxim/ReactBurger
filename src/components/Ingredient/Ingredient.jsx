import { Counter, CurrencyIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from './Ingredient.module.css';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { DRAG, DROP } from "../../services/actions/IngredientActions";
import { memo } from "react";

const Ingredient = memo(({ id, name, image, price, count, onClick }) => {
  const dispatch = useDispatch();

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
    <div ref={dragRef} className={componentStyles.container} onClick={() => onClick(id)} >
      <img src={image} alt={name} className="pl-4 pr-4" />
      <span className={`mt-1 mb-1 text text_type_digits-default ${componentStyles.price}`}>
        <p className="pr-1">{price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={`text text_type_main-default ${componentStyles.name}`}>{name}</p>
        { count > 0 && (<Counter count={count} size="default" />) }
    </div>
  );
});

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Ingredient;
