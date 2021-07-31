import componentStyles from "./ProfileDetails.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

const ProfileDetails = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onChangeName = (e) => setName(e.target.value);
  const onChangeLogin = (e) => setLogin(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <div className={`ml-15 pl-6 pr-6 ${componentStyles.container}`}>
      <div className={`${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChangeName}
          size={"default"}
          icon={"EditIcon"}
          value={name}
        />
      </div>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          placeholder={"Логин"}
          onChange={onChangeLogin}
          size={"default"}
          icon={"EditIcon"}
          value={login}
        />
      </div>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          placeholder={"Пароль"}
          onChange={onChangePassword}
          size={"default"}
          icon={"EditIcon"}
          value={password}
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
