import componentStyles from './ProfileMenu.module.css';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
  return (
    <div className={componentStyles.container}>
      <Link to="/profile" className={`text text_type_main-medium ${componentStyles.link}`} >
        Профиль
      </Link>
      <Link to="/profile" className={`text text_type_main-medium ${componentStyles.link} text_color_inactive`} >
        История заказов
      </Link>
      <Link to="/logout" className={`text text_type_main-medium ${componentStyles.link} text_color_inactive`} >
        Выход
      </Link>
      <p className="mt-20 text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};

export default ProfileMenu;
