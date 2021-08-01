import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../../services/utils/Cookie";

const ProtectedRoute = ({ children, ...props }) => {
  const token = getCookie("token");

  return (
    <Route
      {...props}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
