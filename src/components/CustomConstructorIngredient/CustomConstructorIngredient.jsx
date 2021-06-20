import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

const CustomConstructorIngredient = (props) => {
  return (
    <div
      className={props.children ?? "mr-4"}
      style={{ display: "flex", alignItems: "center" }}
    >
      <div>{props.children ?? <div className="ml-8"></div>}</div>
      <ConstructorElement {...props} />
    </div>
  );
};

export default CustomConstructorIngredient;
