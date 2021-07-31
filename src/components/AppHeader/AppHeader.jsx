import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import HeaderButton from "../HeaderButton/HeaderButton";
import componentStyles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <>
      <div className={`pt-4 pb-4 ${componentStyles.headerBackground}`} />
      <header className={`pt-4 pb-4 ${componentStyles.header}`}>
        <nav className={componentStyles.stretchedFlexItem}>
          <Link to="/">
            <HeaderButton
              className={componentStyles.link}
              type="secondary"
              size="medium"
              text="Конструктор"
            >
              <BurgerIcon />
            </HeaderButton>
          </Link>
          <HeaderButton
            type="secondary"
            size="medium"
            text="Лента заказов"
            inactive={true}
          >
            <ListIcon type="secondary" />
          </HeaderButton>
        </nav>
        <Logo />
        <div className={componentStyles.stretchedFlexItem}>
          <div className={componentStyles.buttonWrapper}>
            <Link to="/profile">
              <HeaderButton
                type="secondary"
                size="medium"
                text="Личный кабинет"
                inactive={true}
              >
                <ProfileIcon type="secondary" />
              </HeaderButton>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
