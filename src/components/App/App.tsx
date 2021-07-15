import React from "react";
import componentStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (   
    <div className={componentStyles.content}>
    <div className={componentStyles.header}>
      <AppHeader />
    </div>
    <div className={componentStyles.body}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <div className="ml-5 mr-5" />
        <BurgerConstructor ingredients={[]} />
      </DndProvider>
    </div>
  </div>
  );
}

export default App;