import { Counter, CurrencyIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from './Ingredient.module.css';

const Ingredient = (props) => {
  return (
    <div id={props._id} className={componentStyles.container} >
      <img src={props.image} className="pl-4 pr-4" />
      <span className={`mt-1 mb-1 ${componentStyles.price}`}>
        <p className="pr-1">{props.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={componentStyles.name}>{props.name}</p>
      <Counter count="1" size="default" />
    </div>
  );
};

export default Ingredient;
