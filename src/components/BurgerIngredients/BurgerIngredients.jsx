import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../IngredientList/IngredientList";
import componentStyles from "./BurgerIngredients.module.css";
import clsx from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from "../../services/actions/IngredientActions";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients.items);
  const ingredientTypes = ingredients.map((item) => item.type);
  const uniqueIngredientTypes = [...new Set(ingredientTypes)];
  const [currentTabType, setCurrentTabType] = React.useState("bun");
  const currentViewsRatio = React.useRef({});

  const handleScroll = (type) => {
    return (inView, entry) => {
      currentViewsRatio.current[type] = entry.intersectionRatio;

      const ingredientListTypes = Object.keys(currentViewsRatio.current);
      const allRatio = ingredientListTypes.map(currentType => currentViewsRatio.current[currentType]);
      const maxRatio = Math.max(...allRatio);
      const typeWithMaxRatio = ingredientListTypes.find(currentType => currentViewsRatio.current[currentType] === maxRatio);

      setCurrentTabType(typeWithMaxRatio);
    };
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const bun = ingredients.find((item) => item.type === "bun");
  const typeDescriptions = new Map();
  typeDescriptions.set("bun", "Булки");
  typeDescriptions.set("sauce", "Соусы");
  typeDescriptions.set("main", "Начинки");

  const scrollToIngredients = (type) => {
    setCurrentTabType(type);
    document.getElementById(type).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={ componentStyles.container }>
      <h1 className="mt-10 text text_type_main-large">Соберите бургер</h1>
      <div className={ `mt-5 ${ componentStyles.tabList }` }>
        { uniqueIngredientTypes.map((type) => (typeDescriptions.get(type) &&
          (<Tab key={ type } value={ type } active={ currentTabType === type } onClick={ scrollToIngredients }>
            { typeDescriptions.get(type) }
          </Tab>)
        )) }
      </div>
      <div className={ (clsx(componentStyles.ingredientListWrapper), componentStyles.ingredientListWrapper) }>
        { uniqueIngredientTypes.map((type, index) => (typeDescriptions.get(type) &&
          (<IngredientList key={ type } handleScroll={ handleScroll } index={ index }
                           name={ typeDescriptions.get(type) } type={ type } bunId={ type === "bun" ? bun._id : null }
                           ingredients={ ingredients.filter((item) => item.type === type) }/>)
        )) }
      </div>
    </div>
  );
}

export default BurgerIngredients;
