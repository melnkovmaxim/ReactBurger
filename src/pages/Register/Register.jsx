import componentStyles from "./Register.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../services/actions/AuthActions";

const Register = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ name: '', email: '', password: '' });
  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });
  const { registerRequestFailed, registerRequestError } = useSelector(store => store.auth);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(state.email, state.name, state.password));
  };

  return (
    <form className={ componentStyles.container } onSubmit={ onSubmit }>
      <p className="text text_type_main-medium">Регистрация</p>
      <div className={ `mt-6 ${ componentStyles.inputWrapper }` }>
        <Input
          type={ "text" }
          name={ "name" }
          placeholder={ "Имя" }
          onChange={ onChange }
          size={ "default" }
          value={ state.name }
        />
      </div>
      <div className={ `mt-6 ${ componentStyles.inputWrapper }` }>
        <Input
          type={ "text" }
          name={ "email" }
          placeholder={ "E-mail" }
          onChange={ onChange }
          size={ "default" }
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
      { registerRequestFailed && <p>{ registerRequestError }</p> }
      <div className="mt-6">
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <p className="mt-20 text text_type_main-default">
        Уже зарегистрированы?
        <Link className={ componentStyles.link } to="/login">
          { " " }
          Войти
        </Link>
      </p>
    </form>
  );
};

export default Register;
