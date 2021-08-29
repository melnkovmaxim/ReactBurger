import componentStyles from "./ProfileDetails.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useEffect } from "react";
import { getUserInfo, updateUserInfo } from "../../services/actions/ProfileActions";
import { getAccessToken } from "../../utils/Cookie";
import { RootState } from "../../services/reducers/RootReducer";
import { IProfileDetailsState } from "../../interfaces/components/ProfileDetails/IProfileDetailsState";
import { useAppDispatch, useAppSelector } from "../../index";

const ProfileDetails = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store: RootState) => store.profile.user);
  const [state, setState] = useState<IProfileDetailsState>({ name: '', email: '', password: '' });
  const [previousState, setPreviousState] = useState<IProfileDetailsState>({ name: '', email: '', password: '' });
  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });
  const accessToken: string = getAccessToken();

  useEffect(() => {
    dispatch(getUserInfo(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    setState({ ...state, ...user });
    setPreviousState({ ...state, ...user });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (e.nativeEvent.submitter.innerText.toLowerCase() === 'отмена') {
      return;
    }

    dispatch(updateUserInfo(state));
    setPreviousState(state);
  };

  const onCancel = () => {
    setState(previousState);
  };

  return (
    <form className={ `ml-15 pl-6 pr-6 ${ componentStyles.container }` } onSubmit={ onSubmit }>
      <div className={ `${ componentStyles.inputWrapper }` }>
        <Input
          type={ "text" }
          placeholder={ "Имя" }
          onChange={ onChange }
          size={ "default" }
          icon={ "EditIcon" }
          name={ "name" }
          value={ state.name }
        />
      </div>
      <div className={ `mt-6 ${ componentStyles.inputWrapper }` }>
        <Input
          type={ "text" }
          placeholder={ "Логин" }
          onChange={ onChange }
          size={ "default" }
          icon={ "EditIcon" }
          name={ "email" }
          value={ state.email }
        />
      </div>
      <div className={ `mt-6 ${ componentStyles.inputWrapper }` }>
        <PasswordInput
          onChange={ onChange }
          size={ "default" }
          name={ "password" }
          value={ state.password }
        />
      </div>
      <div className={ `mt-6 ${ componentStyles.buttons }` }>
        <div className={ componentStyles.disableSubmit }>
          <Button type="secondary" onClick={ onCancel }>Отмена</Button>
        </div>
        <Button type="primary">Сохранить</Button>
      </div>
    </form>
  );
};

export default ProfileDetails;
