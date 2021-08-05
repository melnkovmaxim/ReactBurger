import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { refreshToken as doRefreshToken } from "../../services/actions/AuthActions";

const ProtectedRoute = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['token']);
  const refreshTokenRequestPending = useSelector(store => store.auth.refreshTokenRequestPending);

  useEffect(() => {
    if (!cookies.token && !refreshTokenRequestPending) {
      dispatch(doRefreshToken());
    }
  }, [dispatch, cookies, refreshTokenRequestPending]);

  return (
    <Route
      {...props}
      render={({ location }) =>
        cookies.token ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
