import React from "react";
import componentStyles from "./Home.module.css";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const Home = () => {
  return (   
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <div className="ml-5 mr-5" />
        <BurgerConstructor />
      </DndProvider>
  );
}

export default Home;