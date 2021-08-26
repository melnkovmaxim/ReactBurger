import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../services/actions/AuthActions';
import { getRefreshToken } from '../../utils/LocalStorage';
import {Dispatch} from "redux";

const Logout = (): JSX.Element => {
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(logout(getRefreshToken()));
  }, [dispatch]);

  return (
    <Redirect to={ { pathname: '/' } }/>
  );
};

export default Logout;