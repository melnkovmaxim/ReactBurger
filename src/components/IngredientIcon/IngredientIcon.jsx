import componentStyles from './IngredientIcon.module.css';

const IngredientIcon = ({ name, link, count }) => {
  return (
    <div className={ componentStyles.container }>
      <img className={ componentStyles.image } src={ link } alt={ name }/>
      { count > 1 && <div className={ `text text_type_main-default ${ componentStyles.overlay }` }>+{ count }</div> }
    </div>
  );
};

export default IngredientIcon;