import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import { refreshToken as doRefreshToken } from "../../services/actions/AuthActions";
import { getAccessToken } from "../../utils/Cookie";
import { getRefreshToken } from "../../utils/LocalStorage";
import PropTypes from "prop-types";

const NonAuthRoute = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const { refreshTokenRequestPending, loginRequestPending, registerRequestPending } = useSelector(store => store.auth);

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
            pathname: location.state ? location.state.from.pathname : "/",
            state: { isRepeatAction: location.state && location.state.from === "/" }
          } }/>
        ) : (
          children
        )
      }
    />
  );
};

NonAuthRoute.propTypes = PropTypes.shape({
  children: PropTypes.element.isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]).isRequired,
  exact: PropTypes.bool,
}).isRequired;

export default NonAuthRoute;
