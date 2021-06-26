import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import constStyle from "./CustomConstructorIngredient.module.css";
const CustomConstructorIngredient = (props) => {
  const constructorElement = React.useRef(null);

  React.useEffect(() => {
    console.log(constructorElement.current);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <span>{props.children ?? <div className="ml-8"></div>}</span>
      <div className={constStyle.parent}>
        <ConstructorElement ref={constructorElement} {...props} />
      </div>
    </div>
  );
};

export default CustomConstructorIngredient;
