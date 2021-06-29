import React from "react";
import componentStyles from "./App.module.css";
import data from "../../utils/data";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function App() {
  const ingredients = data;

  return (
    <div className={componentStyles.content}>
      <div className={componentStyles.header}>
        <AppHeader />
      </div>
      <div className={componentStyles.body}>
        <BurgerIngredients ingredients={ingredients} />
        <div className="ml-5 mr-5" />
        <BurgerConstructor ingredients={ingredients} />
      </div>
    </div>
  );
}

export default App;