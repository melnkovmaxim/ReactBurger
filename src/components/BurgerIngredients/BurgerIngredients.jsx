import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "../IngredientList/IngredientList";
import listStyle from "./BurgerIngredients.module.css";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState("bun");

  const ingridientTypes = props.ingredients.map((item) => item.type);
  const uniqueIngridientTypes = [...new Set(ingridientTypes)];
  const unknownTypeName = "Неизвестный";
  // т.к. в исходном массиве нет данных о русских названиях
  const typeDescriptions = new Map();
  typeDescriptions.set("bun", "Булки");
  typeDescriptions.set("sauce", "Соусы");
  typeDescriptions.set("main", "Начинка");

  const scrollToIngredients = (type) => {
    document.getElementById(type).scrollIntoView({
      behavior: "smooth", // smooth scroll
      block: "start",
    });
    setCurrent(type);
  };

  return (
    <div
      style={{
        height: "800px",
        overflow: "hidden",
      }}
    >
      <h1 className="mt-10">Соберите бургер</h1>
      <div className="mt-5" style={{ display: "flex" }}>
        {uniqueIngridientTypes.map((type) => (
          <Tab
            value={type}
            active={current === type}
            onClick={scrollToIngredients}
          >
            {typeDescriptions.get(type) ?? unknownTypeName}
          </Tab>
        ))}
      </div>
      <div
        id="mainList"
        className={listStyle.list}
        style={{ overflowY: "auto", height: "100%" }}
      >
        {uniqueIngridientTypes.map((type) => (
          <IngredientList
            name={typeDescriptions.get(type) ?? unknownTypeName}
            type={type}
            ingredients={props.ingredients.filter((item) => item.type === type)}
          />
        ))}
      </div>
    </div>
  );
};

export default BurgerIngredients;
