import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { refreshToken as doRefreshToken } from "../../services/actions/AuthActions";
import { getAccessToken } from "../../utils/Cookie";
import { getRefreshToken } from "../../utils/LocalStorage";
import { RootState } from "../../services/reducers/RootReducer";
import { IProtectedRouteProps } from "../../interfaces/components/ProtectedRoute/IProtectedRouteProps";
import { useAppDispatch, useAppSelector } from "../../index";

const ProtectedRoute = ({ children, ...props }: IProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const accessToken: string = getAccessToken();
  const refreshToken: string | null = getRefreshToken();
  const refreshTokenRequestPending = useAppSelector((store: RootState) => store.auth.refreshTokenRequestPending);

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
