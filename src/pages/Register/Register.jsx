import componentStyles from "./Register.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeName = (e) => setName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <div className={componentStyles.container}>
      <p className="text text_type_main-medium">Регистрация</p>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChangeName}
          size={"default"}
          value={name}
        />
      </div>
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
        Уже зарегистрированы?
        <Link className={componentStyles.link} to="/login">
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;
