import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { refreshToken as doRefreshToken } from "../../services/actions/AuthActions";
import { getAccessToken } from "../../utils/Cookie";
import { getRefreshToken } from "../../utils/LocalStorage";
import { RootState } from "../../services/reducers/RootReducer";
import { IProtectedRouteProps } from "../../interfaces/components/ProtectedRoute/IProtectedRouteProps";

const ProtectedRoute = ({ children, ...props }: IProtectedRouteProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const accessToken: string = getAccessToken();
  const refreshToken: string | null = getRefreshToken();
  const refreshTokenRequestPending = useSelector((store: RootState) => store.auth.refreshTokenRequestPending);

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
