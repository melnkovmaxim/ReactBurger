import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../services/actions/AuthActions';

const Logout = () => {
    const dispatch = useDispatch();
    const refreshToken = useSelector(store => store.auth.refreshToken);

    useEffect(() => {
        console.log(refreshToken);
        dispatch(logout(refreshToken));
    }, [dispatch, refreshToken]);

    return (
        <Redirect to={{ pathname: '/' }} />
    );
};

export default Logout;