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
import { RESET_STATUS_EMAIL_SENDED } from "../../services/actions/ProfileActions";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const { isSendedResetPasswordEmail, isSendedConfirmResetPasswordEmail } =
    useSelector((store) => store.profile);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { confirmResetPasswordRequestFailed , confirmResetPasswordRequestError } = useSelector(store => store.profile);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    if (isSendedResetPasswordEmail) {
      dispatch({ type: RESET_STATUS_EMAIL_SENDED });
    }
  }, [dispatch, isSendedResetPasswordEmail]);

  return (
    <>
      {isSendedConfirmResetPasswordEmail ? (
        <Redirect to={{ pathname: "/reset-password" }} />
      ) : (
        <div className={componentStyles.container}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <div className={`mt-6 ${componentStyles.inputWrapper}`}>
            <PasswordInput
              onChange={onChangePassword}
              value={password}
              name={"password"}
            />
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
        </div>
      )}
    </>
  );
};

export default PasswordReset;
