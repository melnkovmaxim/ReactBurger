import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import HeaderButton from "../HeaderButton/HeaderButton";
import componentStyles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <>
      <div className={`pt-4 pb-4 ${componentStyles.headerBackground}`} />
      <header className={`pt-4 pb-4 ${componentStyles.header}`}>
        <nav className={componentStyles.stretchedFlexItem}>
          <NavLink exact to="/" activeClassName={componentStyles.active}>
            <HeaderButton
              type="secondary"
              size="medium"
              text="Конструктор"
            >
              <BurgerIcon />
            </HeaderButton>
          </NavLink>
          <NavLink to="/profile/orders" activeClassName={componentStyles.active}>
            <HeaderButton
              type="secondary"
              size="medium"
              text="Лента заказов"
            >
              <ListIcon type="secondary" />
            </HeaderButton>
          </NavLink>
        </nav>
        <Logo />
        <div className={componentStyles.stretchedFlexItem}>
          <div className={componentStyles.buttonWrapper}>
            <NavLink exact to="/profile" activeClassName={componentStyles.active}>
              <HeaderButton
                type="secondary"
                size="medium"
                text="Личный кабинет"
              >
                <ProfileIcon type="secondary" />
              </HeaderButton>
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
