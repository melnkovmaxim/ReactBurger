import componentStyles from './IngredientIcon.module.css';
import { IIngredientIconProps } from "../../interfaces/components/IngredientIcon/IIngredientIconProps";

const IngredientIcon = ({ name, image_mobile, count }: IIngredientIconProps): JSX.Element => {
  return (
    <div className={ componentStyles.container }>
      <img className={ componentStyles.image } src={ image_mobile } alt={ name }/>
      { count && count > 1 && <div className={ `text text_type_main-default ${ componentStyles.overlay }` }>+{ count }</div> }
    </div>
  );
};

export default IngredientIcon;