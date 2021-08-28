import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import { refreshToken as doRefreshToken } from "../../services/actions/AuthActions";
import { getAccessToken } from "../../utils/Cookie";
import { getRefreshToken } from "../../utils/LocalStorage";
import { History } from "history";
import LocationState = History.LocationState;
import { RootState } from "../../services/reducers/RootReducer";
import { IModalOverlayLocationState } from "../../interfaces/components/ModalOverlay/IModalOverlayLocationState";
import { INonAuthRouteProps } from "../../interfaces/components/NonAuthRoute/INonAuthRouteProps";

const NonAuthRoute = ({ children, props }: INonAuthRouteProps): JSX.Element => {
  const dispatch: Dispatch<any> = useDispatch();
  const location: LocationState & IModalOverlayLocationState = useLocation();
  const accessToken: string = getAccessToken();
  const refreshToken: string | null = getRefreshToken();
  const {
    refreshTokenRequestPending,
    loginRequestPending,
    registerRequestPending } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    if (refreshTokenRequestPending || loginRequestPending || registerRequestPending) {
      return;
    }

    if (!accessToken && refreshToken) {
      dispatch(doRefreshToken(refreshToken));
    }
  }, [dispatch, accessToken, refreshToken, refreshTokenRequestPending, loginRequestPending, registerRequestPending]);

  return (
    <Route
      { ...props }
      render={ () =>
        (accessToken) ? (
          <Redirect to={ {
            pathname: location.state && typeof location.state.from !== 'string' ? location.state?.from.pathname : "/",
            state: { isRepeatAction: location.state?.from === "/" }
          } }/>
        ) : (
          children
        )
      }
    />
  );
};

export default NonAuthRoute;
