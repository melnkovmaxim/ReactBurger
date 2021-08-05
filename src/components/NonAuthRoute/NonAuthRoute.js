import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import { refreshToken as doRefreshToken } from "../../services/actions/AuthActions";
import { isAliveToken } from "../../utils/Token";

const NonAuthRoute = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((store) => store.auth);
  const location = useLocation();

  useEffect(() => {
    if (!isAliveToken(accessToken) && refreshToken) {
      dispatch(doRefreshToken(refreshToken));
    }
  }, [accessToken, refreshToken, dispatch]);

  return (
    <Route
      {...props}
      render={() =>
        refreshToken ? (
          <Redirect to={{ pathname: location.state ? location.state.from.pathname : "/" }} />
        ) : (
          children
        )
      }
    />
  );
};

export default NonAuthRoute;
