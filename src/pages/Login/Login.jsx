import componentStyles from "./Login.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/actions/AuthActions";

const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ email: "", password: "" });
  const { loginRequestFailed, loginRequestError } = useSelector(store => store.auth);
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(state.email, state.password));
  };

  return (
    <form className={ componentStyles.container } onSubmit={ onSubmit }>
      <p className="text text_type_main-medium">Вход</p>
      <div className={ `mt-6 ${ componentStyles.inputWrapper }` }>
        <Input
          type={ "text" }
          placeholder={ "E-mail" }
          onChange={ onChange }
          size={ "default" }
          name={ "email" }
          value={ state.email }
        />
      </div>
      <div className={ `mt-6 ${ componentStyles.inputWrapper }` }>
        <PasswordInput
          onChange={ onChange }
          value={ state.password }
          name={ "password" }
        />
      </div>
      { loginRequestFailed && <p>{ loginRequestError }</p> }
      <div className="mt-6">
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <p className="mt-20 text text_type_main-default">
        Вы – новый пользователь?
        <Link className={ componentStyles.link } to="/register">
          { " " }
          Зарегистрироваться
        </Link>
      </p>
      <p className="mt-4 text text_type_main-default">
        Забыли пароль?
        <Link className={ componentStyles.link } to="/forgot-password">
          { " " }
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
};

export default Login;
