import componentStyles from './ProfileMenu.module.css';

const ProfileMenu = () => {
  return (
    <div className={componentStyles.container}>
      <p className={`text text_type_main-medium ${componentStyles.link}`}>
        Профиль
      </p>
      <p
        className={`text text_type_main-medium ${componentStyles.link} text_color_inactive`}
      >
        История заказов
      </p>
      <p
        className={`text text_type_main-medium ${componentStyles.link} text_color_inactive`}
      >
        Выход
      </p>
      <p className="mt-20 text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};

export default ProfileMenu;
