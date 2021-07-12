import React from "react";
import componentStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getIngredients, GET_INGREDIENTS_REQUEST } from '../../services/actions/IngredientActions';

function App() {
  return (   
    <div className={componentStyles.content}>
    <div className={componentStyles.header}>
      <AppHeader />
    </div>
    <div className={componentStyles.body}>
      <BurgerIngredients />
      <div className="ml-5 mr-5" />
      <BurgerConstructor ingredients={[]} />
    </div>
  </div>
  );
}

export default App;