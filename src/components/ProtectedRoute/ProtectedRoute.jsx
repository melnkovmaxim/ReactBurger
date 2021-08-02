import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, ...props }) => {
  const accessToken = useSelector(store => store.auth.accessToken);
  console.log(accessToken);

  return (
    <Route
      {...props}
      render={({ location }) =>
        accessToken && accessToken !== '' ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
