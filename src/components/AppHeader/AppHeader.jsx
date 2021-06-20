import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./AppHeader.module.css";

const AppHeader = (props) => {
  return (
    <header style={{ backgroundColor: "#1C1C21" }} className={headerStyles.nav}>
      <nav className={headerStyles.flexible}>
        <Button className={headerStyles.link} type="secondary" size="large">
          <div style={{ display: "flex", alignItems: "center" }}>
            <BurgerIcon type="secondary" />
            <span className="ml-2">Конструктор</span>
          </div>
        </Button>
        <Button className={headerStyles.link} type="secondary" size="large">
          <div style={{ display: "flex", alignItems: "center" }}>
            <ListIcon type="secondary" />
            <span className="ml-2">Лента заказов</span>
          </div>
        </Button>
      </nav>

      <Logo />
      <div className={headerStyles.flexible}>
        <div style={{ float: "right" }}>
          <Button type="secondary" size="large">
            <div style={{ display: "flex", alignItems: "center" }}>
              <BurgerIcon type="primary" />
              <span className="ml-2">Личный кабинет</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
