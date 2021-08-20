import componentStyles from './IngredientIcon.module.css';
import PropTypes from "prop-types";

const IngredientIcon = ({ name, image_mobile, count }) => {
  return (
    <div className={ componentStyles.container }>
      <img className={ componentStyles.image } src={ image_mobile } alt={ name }/>
      { count > 1 && <div className={ `text text_type_main-default ${ componentStyles.overlay }` }>+{ count }</div> }
    </div>
  );
};

IngredientIcon.propTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  count: PropTypes.number
}).isRequired;

export default IngredientIcon;