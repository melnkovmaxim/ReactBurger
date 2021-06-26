import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./AppHeader.module.css";

const AppHeader = (props) => {
  return (
    <>
      <span className={`pt-4 pb-4 ${headerStyles.headerBackground}`}></span>
      <header className={`pt-4 pb-4 ${headerStyles.header}`}>
          <nav className={headerStyles.flexible}>
            <Button className={headerStyles.link} type="secondary" size="medium">
              <div style={{ display: "flex", alignItems: "center" }}>
                <BurgerIcon type="secondary" />
                <span className="ml-2">Конструктор</span>
              </div>
            </Button>
            <Button className={headerStyles.link} type="secondary" size="medium">
              <div style={{ display: "flex", alignItems: "center" }}>
                <ListIcon type="secondary" />
                <span className="ml-2">Лента заказов</span>
              </div>
            </Button>
          </nav>

        <Logo />
        <div className={headerStyles.flexible}>
          <div style={{ float: "right" }}>
            <Button type="secondary" size="medium">
              <div style={{ display: "flex", alignItems: "center" }}>
                <BurgerIcon type="primary" />
                <span className="ml-2">Личный кабинет</span>
              </div>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
