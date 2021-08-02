import componentStyles from "./Register.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useStore } from 'react-redux';
import { register } from "../../services/actions/AuthActions";
import { Redirect } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const accessToken = useStore(store => store.auth.accessToken);
  const [state, setState] = useState({});
  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });
  const onClick = () => {
    dispatch(register(state.email, state.name, state.password));
  };

  if (accessToken) {
    return (
      <Redirect to={{ pathname: '/' }} />
    );
  }

  return (
    <div className={componentStyles.container}>
      <p className="text text_type_main-medium">Регистрация</p>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          name={"name"}
          placeholder={"Имя"}
          onChange={onChange}
          size={"default"}
          value={state.name}
        />
      </div>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <Input
          type={"text"}
          name={"email"}
          placeholder={"E-mail"}
          onChange={onChange}
          size={"default"}
          value={state.email}
        />
      </div>
      <div className={`mt-6 ${componentStyles.inputWrapper}`}>
        <PasswordInput
          onChange={onChange}
          value={state.password}
          name={"password"}
        />
      </div>
      <div className="mt-6">
        <Button type="primary" size="medium" onClick={onClick}>
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
