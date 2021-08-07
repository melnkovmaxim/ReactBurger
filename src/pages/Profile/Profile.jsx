import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import componentStyles from "./Profile.module.css";
import OrderTape from "../../components/OrderTape/OrderTape";
import Logout from "../Logout/Logout";

const Profile = () => {
  return (
    <div className={componentStyles.container}>
        <ProfileMenu />
        <Switch>
          <Route path="/profile" exact={true}>
            <ProfileDetails />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <OrderTape />
          </Route>
          <Route path="/profile/orders/:id" exact={true}>
            <OrderTape />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
    </div>
  );
};

export default Profile;
