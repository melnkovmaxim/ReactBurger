import componentStyles from "./PasswordForgot.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/actions/ProfileActions";

const PasswordForgot = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const onChangeEmail = (e) => setEmail(e.target.value);
  const { resetPasswordRequestFailed, resetPasswordRequestError } = useSelector(
    (store) => store.profile
  );
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword());
    history.push("/reset-password");
  };

  return (
    <form className={ componentStyles.container } onSubmit={ onSubmit }>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <div className={ `mt-6 ${ componentStyles.inputWrapper }` }>
        <Input
          type={ "text" }
          placeholder={ "E-mail" }
          onChange={ onChangeEmail }
          value={ email }
          size={ "default" }
        />
      </div>
      { resetPasswordRequestFailed && <p>{ resetPasswordRequestError }</p> }
      <div className="mt-6">
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </div>
      <p className="mt-20 text text_type_main-default">
        Вспомнили пароль?
        <Link className={ componentStyles.link } to="/login">
          { " " }
          Войти
        </Link>
      </p>
    </form>
  );
};

export default PasswordForgot;
