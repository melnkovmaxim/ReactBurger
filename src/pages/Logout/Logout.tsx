import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../services/actions/AuthActions';
import { getRefreshToken } from '../../utils/LocalStorage';
import { useAppDispatch } from "../../index";

const Logout = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout(getRefreshToken()));
  }, [dispatch]);

  return (
    <Redirect to={ { pathname: '/' } }/>
  );
};

export default Logout;