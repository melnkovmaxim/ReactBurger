import componentStyles from "./ProfileDetails.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "../../services/actions/ProfileActions";
import { getAccessToken } from "../../utils/Cookie";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.profile.user);
  const [state, setState] = useState({ name: '', email: '', password: '' } );
  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });
  const accessToken = getAccessToken();

  useEffect(() => {
    dispatch(getUserInfo(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    setState({ ...state, ...user });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
