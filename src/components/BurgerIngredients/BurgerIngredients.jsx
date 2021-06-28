import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../IngredientList/IngredientList";
import componentStyles from "./BurgerIngredients.module.css";
import clsx from "clsx";
import PropTypes from 'prop-types';

const BurgerIngredients = (props) => {
  const [currentTabType, setcurrentTabType] = React.useState('bun');
  const ingridientTypes = props.ingredients.map((item) => item.type);
  const uniqueIngridientTypes = [...new Set(ingridientTypes)];

  // т.к. в исходном массиве нет данных о русских названиях
  const typeDescriptions = new Map();
  typeDescriptions.set("bun", "Булки");
  typeDescriptions.set("sauce", "Соусы");
  typeDescriptions.set("main", "Начинки");

  const scrollToIngredients = (type) => {
    setcurrentTabType(type);
    document.getElementById(type).scrollIntoView({ behavior: 'smooth'});
  };

  return (
    <div className={componentStyles.container} >
      <h1 className="mt-10 text text_type_main-large">Соберите бургер</h1>
      <div className={`mt-5 ${componentStyles.tabList}`}>
        {uniqueIngridientTypes.map((type, index) => ( typeDescriptions.get(type) && 
          (<Tab key={index} value={type} active={currentTabType === type} onClick={scrollToIngredients} >
            { typeDescriptions.get(type) } 
          </Tab>)
        ))}
      </div>
      <div className={ (clsx(componentStyles.ingredientListWrapper), componentStyles.ingredientListWrapper) } >
        {uniqueIngridientTypes.map((type, index) => ( typeDescriptions.get(type) && 
          (<IngredientList key={index} name={typeDescriptions.get(type)} type={type} 
            ingredients={props.ingredients.filter((item) => item.type === type)} />)
        ))}
      </div>
    </div>
  );
}

const IngredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientPropTypes.isRequired).isRequired
};

export default BurgerIngredients;
