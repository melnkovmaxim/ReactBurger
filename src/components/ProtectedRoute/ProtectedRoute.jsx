import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { refreshToken as doRefreshToken } from "../../services/actions/AuthActions";
import { getAccessToken } from "../../utils/Cookie";
import { getRefreshToken } from "../../utils/LocalStorage";

const ProtectedRoute = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const refreshTokenRequestPending = useSelector(store => store.auth.refreshTokenRequestPending);

  useEffect(() => {
    if (!accessToken && refreshToken && !refreshTokenRequestPending) {
      dispatch(doRefreshToken(refreshToken));
    }
  }, [dispatch, accessToken, refreshToken, refreshTokenRequestPending]);

  return (
    <Route
      { ...props }
      render={ ({ location }) =>
        (accessToken) ? (
          children
        ) : (
          <Redirect to={ { pathname: "/login", state: { from: location } } }/>
        )
      }
    />
  );
};

export default ProtectedRoute;
