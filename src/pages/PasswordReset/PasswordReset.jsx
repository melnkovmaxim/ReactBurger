import componentStyles from "./PasswordReset.module.css";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmResetPassword, RESET_STATUS_EMAIL_SENDED } from "../../services/actions/ProfileActions";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const { isSendedResetPasswordEmail, isSendedConfirmResetPasswordEmail } =
    useSelector((store) => store.profile);
  const [state, setState] = useState({ password: '', token: '' });
  const { confirmResetPasswordRequestFailed , confirmResetPasswordRequestError } = useSelector(store => store.profile);
  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isSendedResetPasswordEmail) {
      dispatch({ type: RESET_STATUS_EMAIL_SENDED });
    }
  }, [dispatch, isSendedResetPasswordEmail]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(confirmResetPassword(state.password, state.token))
  };

  return (
    <>
      {isSendedConfirmResetPasswordEmail ? (
        <Redirect to={{ pathname: "/reset-password" }} />
      ) : (
        <form className={componentStyles.container} onSubmit={onSubmit}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <div className={`mt-6 ${componentStyles.inputWrapper}`}>
            <PasswordInput
              onChange={onChange}
              value={state.password}
              name={"password"}
            />
          </div>
          <div className={`mt-6 ${componentStyles.inputWrapper}`}>
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              value={state.token}
              onChange={onChange}
              size={"default"}
              name={"token"}
            />
          </div>
          {confirmResetPasswordRequestFailed && <p>{confirmResetPasswordRequestError}</p>}
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
        </form>
      )}
    </>
  );
};

export default PasswordReset;
