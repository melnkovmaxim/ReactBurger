import componentStyles from './IngredientIcon.module.css';

const IngredientIcon = ({ name, image_mobile, count }) => {
  return (
    <div className={ componentStyles.container }>
      <img className={ componentStyles.image } src={ image_mobile } alt={ name }/>
      { count > 1 && <div className={ `text text_type_main-default ${ componentStyles.overlay }` }>+{ count }</div> }
    </div>
  );
};

export default IngredientIcon;