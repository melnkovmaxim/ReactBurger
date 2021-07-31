import componentStyles from "./Login.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <div className={componentStyles.container}>
      <p className="text text_type_main-medium">Вход</p>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={onChangeEmail}
          size={"default"}
          value={email}
        />
      </div>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={"password"}
        />
      </div>
      <div className="mt-6">
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <p className="mt-20 text text_type_main-default">
        Вы – новый пользователь?
        <Link className={componentStyles.link} to="/register">
          {" "}
          Зарегистрироваться
        </Link>
      </p>
      <p className="mt-4 text text_type_main-default">
        Забыли пароль?
        <Link className={componentStyles.link} to="/forgot-password">
          {" "}
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default Login;
