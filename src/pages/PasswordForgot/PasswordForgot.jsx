import componentStyles from "./PasswordForgot.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const PasswordForgot = () => {
  const [email, setEmail] = useState("");

  const onChangeEmail = (e) => setEmail(e.target.value);

  return (
    <div className={componentStyles.container}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={onChangeEmail}
          value={email}
          size={"default"}
        />
      </div>
      <div className="mt-6">
        <Button type="primary" size="medium">
          Восстановить
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

export default PasswordForgot;
