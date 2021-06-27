import { BurgerIcon, ListIcon, Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderButton from "../HeaderButton/HeaderButton";
import headerStyles from "./AppHeader.module.css";

const AppHeader = (props) => {
  return (
    <>
      <div className={`pt-4 pb-4 ${headerStyles.headerBackground}`}/>
      <header className={`pt-4 pb-4 ${headerStyles.header}`}>
          <nav className={headerStyles.stretchedFlexItem}>
            <HeaderButton className={headerStyles.link} type="secondary" size="medium" text="Конструктор">
              <BurgerIcon type="secondary" />
            </HeaderButton>
            <HeaderButton type="secondary" size="medium" text="Лента заказов" >
              <ListIcon type="secondary" />
            </HeaderButton>
          </nav>

        <Logo />
        <div className={headerStyles.stretchedFlexItem}>
          <div className={headerStyles.buttonWrapper}>
            <HeaderButton type="secondary" size="medium" text="Личный кабинет" >
              <BurgerIcon type="iconPrimary" />
            </HeaderButton>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
