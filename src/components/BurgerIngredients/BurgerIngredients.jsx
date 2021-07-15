import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../IngredientList/IngredientList";
import componentStyles from "./BurgerIngredients.module.css";
import clsx from "clsx";
import PropTypes from 'prop-types';
import { useEffect, createRef, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from "../../services/actions/IngredientActions";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients.items);
  const [currentTabType, setcurrentTabType] = React.useState('bun');
  const [elRefs, setElRefs] = React.useState([]);
  const ingridientTypes = ingredients.map((item) => item.type);
  const uniqueIngridientTypes = [...new Set(ingridientTypes)];

  React.useEffect(() => {
    // add or remove refs
    setElRefs(elRefs => (
      Array(3).fill().map((_, i) => elRefs[i] || createRef())
    ));
  }, []);

  const onIntersection = (entries) => {
    const maxRatio = Math.max(...entries.map(entry => parseFloat(entry.intersectionRatio)));
    const entriesWithMaxRatio = entries.filter(entry => entry.intersectionRatio === maxRatio);
    const firstEntryWithMaxRatio = entriesWithMaxRatio[0];
    if (firstEntryWithMaxRatio) {
      setcurrentTabType(firstEntryWithMaxRatio.target.id);
    }
  }

  useEffect(() => {
      dispatch(getIngredients());
  },[dispatch]);
  
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.1, 0.2, 0.3, 0.4]
  }

  useEffect(() => {

    const observer = new IntersectionObserver(onIntersection, options);
    for (let i = 0; i < elRefs.length; i ++) {
      const refka = elRefs[i];
      if (refka.current) observer.observe(refka.current);
    };

    return () => {
      for (let i = 0; i < elRefs.length; i ++) {
        const refka = elRefs[i];
        if (refka.current) observer.unobserve(refka.current);
      };
    };
  }, [elRefs, options])

  // пока так, т.к. были проблемы с TypeScript в App и PropTypes, не компилилось
  const bun = ingredients.filter((item) => item.type === "bun")[0];

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
          (<IngredientList ref={elRefs[index]} key={index} name={typeDescriptions.get(type)} type={type} bunId={type === "bun" ? bun._id : null}  
            ingredients={ingredients.filter((item) => item.type === type)} />)
        ))}
      </div>
    </div>
  );
}

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
});

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};

export default BurgerIngredients;
