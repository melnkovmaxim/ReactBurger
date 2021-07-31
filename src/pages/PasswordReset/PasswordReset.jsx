import componentStyles from "./PasswordReset.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <div className={componentStyles.container}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <PasswordInput onChange={onChangePassword} value={password} name={"password"} />
      </div>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          value={email}
          onChange={onChangeEmail}
          size={"default"}
        />
      </div>
      <div className="mt-6">
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
      <p className="mt-20 text text_type_main-default">
        Вспомнили пароль?
        <Link className={componentStyles.link} to="/login">
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
};

export default PasswordReset;
