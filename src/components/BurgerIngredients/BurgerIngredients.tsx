import React, { Dispatch } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../IngredientList/IngredientList";
import componentStyles from "./BurgerIngredients.module.css";
import clsx from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from "../../services/actions/IngredientActions";
import { RootState } from "../../services/reducers/RootReducer";
import { IIngredient } from "../../interfaces/models/IIngredient";

const BurgerIngredients = (): JSX.Element => {
  const dispatch: Dispatch<any> = useDispatch();
  const ingredients: Array<IIngredient> = useSelector((store: RootState) => store.ingredients.items);
  const ingredientTypes: Array<string> = ingredients.map((item) => item.type);
  const uniqueIngredientTypes: Array<string> = Array.from(new Set(ingredientTypes));
  const [currentTabType, setCurrentTabType] = React.useState<string>("bun");
  const currentViewsRatio = React.useRef<{}>({});

  const handleScroll = (type: string) => {
    return (inView: boolean, entry:  IntersectionObserverEntry) => {
      currentViewsRatio.current[type] = entry.intersectionRatio;

      const ingredientListTypes: Array<string> = Object.keys(currentViewsRatio.current);
      const allRatio: Array<number> = ingredientListTypes.map(currentType => currentViewsRatio.current[currentType]);
      const maxRatio: number = Math.max(...allRatio);
      const typeWithMaxRatio: string | undefined = ingredientListTypes.find(currentType => currentViewsRatio.current[currentType] === maxRatio);

      if (!typeWithMaxRatio) return;

      setCurrentTabType(typeWithMaxRatio);
    };
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const typeDescriptions = new Map<string, string>();
  typeDescriptions.set("bun", "Булки");
  typeDescriptions.set("sauce", "Соусы");
  typeDescriptions.set("main", "Начинки");

  const scrollToIngredients = (type) => {
    setCurrentTabType(type);
    document.getElementById(type)?.scrollIntoView({ behavior: 'smooth' });
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
          (<IngredientList key={ type } handleScroll={ handleScroll }
                           name={ typeDescriptions.get(type) } type={ type }
                           ingredients={ ingredients.filter((item) => item.type === type) }/>)
        )) }
      </div>
    </div>
  );
}

export default BurgerIngredients;
