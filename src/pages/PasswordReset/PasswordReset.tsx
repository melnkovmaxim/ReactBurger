import componentStyles from "./PasswordReset.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { Dispatch, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmResetPassword } from "../../services/actions/ProfileActions";
import { useHistory } from 'react-router-dom';
import { History } from "history";
import LocationState = History.LocationState;
import { RootState } from "../../services/reducers/RootReducer";
import { IPasswordResetState } from "../../interfaces/pages/PasswordReset/IPasswordResetState";

const PasswordReset = (): JSX.Element => {
  const history: History<LocationState> = useHistory();
  const dispatch: Dispatch<any> = useDispatch();
  const [state, setState] = useState<IPasswordResetState>({ password: '', token: '' });
  const {
    isSuccessResetPassword,
    confirmResetPasswordRequestFailed,
    confirmResetPasswordRequestError
  } = useSelector((store: RootState) => store.profile);
  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(confirmResetPassword(state.password, state.token))
  };

  return (
    <>
      { history.action !== 'PUSH' || isSuccessResetPassword ? (
        <Redirect to={ { pathname: isSuccessResetPassword ? "/login" : "/forgot-password" } }/>
      ) : (
        <form className={ componentStyles.container } onSubmit={ onSubmit }>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <div className={ `mt-6 ${ componentStyles.inputWrapper }` }>
            <PasswordInput
              onChange={ onChange }
              value={ state.password }
              name={ "password" }
            />
          </div>
          <div className={ `mt-6 ${ componentStyles.inputWrapper }` }>
            <Input
              type={ "text" }
              placeholder={ "Введите код из письма" }
              value={ state.token }
              onChange={ onChange }
              size={ "default" }
              name={ "token" }
            />
          </div>
          { confirmResetPasswordRequestFailed && <p>{ confirmResetPasswordRequestError }</p> }
          <div className="mt-6">
            <Button type="primary" size="medium">
              Сохранить
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
      ) }
    </>
  );
};

export default PasswordReset;