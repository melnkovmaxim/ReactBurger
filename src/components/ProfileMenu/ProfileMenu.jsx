import componentStyles from './ProfileMenu.module.css';
import { NavLink } from 'react-router-dom';

const ProfileMenu = () => {
  return (
    <div className={componentStyles.container}>
      <NavLink exact to="/profile" className={`text text_type_main-medium ${componentStyles.link} text_color_inactive`} activeClassName={componentStyles.active} >
        Профиль
      </NavLink>
      <NavLink to="/profile/orders" className={`text text_type_main-medium ${componentStyles.link} text_color_inactive`} activeClassName={componentStyles.active} >
        История заказов
      </NavLink>
      <NavLink to="/logout" className={`text text_type_main-medium ${componentStyles.link} text_color_inactive`} activeClassName={componentStyles.active} >
        Выход
      </NavLink>
      <p className="mt-20 text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};

export default ProfileMenu;
