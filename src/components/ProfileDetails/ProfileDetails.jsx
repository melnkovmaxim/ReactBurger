import componentStyles from "./ProfileDetails.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo, updateUserInfo } from "../../services/actions/ProfileActions";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.profile.user);
  const [state, setState] = useState({ name: '', email: '', password: '' } );
  const accessToken = useSelector(store => store.auth.accessToken);
  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  useEffect(() => {
    dispatch(getUserInfo(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    setState({ ...state, ...user });
  }, [user]);

  const onClick = () => {
    dispatch(updateUserInfo(user));
  };

  return (
    <div className={`ml-15 pl-6 pr-6 ${componentStyles.container}`}>
      <div className={`${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          size={"default"}
          icon={"EditIcon"}
          name={"name"}
          value={state.name}
        />
      </div>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          placeholder={"Логин"}
          onChange={onChange}
          size={"default"}
          icon={"EditIcon"}
          name={"email"}
          value={state.email}
        />
      </div>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          placeholder={"Пароль"}
          onChange={onChange}
          size={"default"}
          icon={"EditIcon"}
          name={"password"}
          value={state.password}
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
