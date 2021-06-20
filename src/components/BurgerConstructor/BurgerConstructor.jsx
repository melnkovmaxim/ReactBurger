import React from "react";
import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredientList from "../ConstructorIngredientList/ConstructorIngredientList";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import MoneyImage from "../../images/money.svg";
import CustomConstructorIngredient from "../CustomConstructorIngredient/CustomConstructorIngredient";

const BurgerConstructor = (props) => {
  const bun = props.ingredients.filter(
    (item) => item._id === "60666c42cc7b410027a1a9b1"
  )[0];
  const totalPrice =
    props.ingredients.reduce((total, current) => (total += current.price), 0) +
    bun.price;

  return (
    <div className="mt-25">
      <div className="ml-8 mr-4">
        <CustomConstructorIngredient
          type="top"
          isLocked={true}
          thumbnail={bun.image}
          text={bun.name + " " + "(верх)"}
          price={bun.price}
        />
        <ConstructorIngredientList ingredients={props.ingredients} />
        <div className="mt-4" style={{ marginLeft: "auto" }}>
          <CustomConstructorIngredient
            type="bottom"
            thumbnail={bun.image}
            isLocked={true}
            text={bun.name + " " + "(низ)"}
            price={bun.price}
          />
        </div>
        <div
          className="mt-10"
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <div
            className="mr-10"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <span className="mr-4 text text_type_digits-medium">
              {totalPrice}
            </span>
            <img src={MoneyImage} style={{ height: "33px", width: "33px" }} />
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
