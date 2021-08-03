import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { refreshToken as doRefreshToken } from "../../services/actions/AuthActions";
import { isAliveToken } from "../../utils/Token";

const ProtectedRoute = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector(store => store.auth);

  useEffect(() => {
    // отправка запроса на рефреш отрабатывает, но не рендерится
    if (!isAliveToken(accessToken) && refreshToken) {
      dispatch(doRefreshToken(refreshToken));
    }
  });

  return (
    <Route
      {...props}
      render={({ location }) =>
        isAliveToken(accessToken) ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
