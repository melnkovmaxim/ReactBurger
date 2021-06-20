import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Ingredient = (props) => {
  return (
    <div
      id={props._id}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        maxWidth: "272px",
      }}
    >
      <img src={props.image} className="pl-4 pr-4" />
      <div className="mt-1 mb-1" style={{ display: "flex" }}>
        <span className="pr-1">{props.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span style={{ height: "48px" }}>{props.name}</span>
      <Counter count="1" size="default" />
    </div>
  );
};

export default Ingredient;
