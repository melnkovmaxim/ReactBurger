import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import { refreshToken as doRefreshToken } from "../../services/actions/AuthActions";

const NonAuthRoute = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const location = useLocation();
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
      render={() =>
        cookies.token ? (
          <Redirect to={{ pathname: location.state ? location.state.from.pathname : "/" }} />
        ) : (
          children
        )
      }
    />
  );
};

export default NonAuthRoute;
