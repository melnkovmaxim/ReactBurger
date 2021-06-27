import { Counter, CurrencyIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import componentStyles from './Ingredient.module.css';

const Ingredient = (props) => {
  return (
    <div id={props._id} className={componentStyles.container} >
      <img src={props.image} className="pl-4 pr-4" />
      <span className={`mt-1 mb-1 text text_type_digits-default ${componentStyles.price}`}>
        <p className="pr-1">{props.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className={`text text_type_main-default ${componentStyles.name}`}>{props.name}</p>
      {props.count > 0 
        ? <Counter count="1" size="default" />
        : null
      }
    </div>
  );
};

export default Ingredient;
