import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, ...props }) => {
  const accessToken = useSelector(store => store.auth.accessToken);

  return (
    <Route
      {...props}
      render={({ location }) =>
        accessToken && JSON.parse(accessToken).expires > new Date().getTime() ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
