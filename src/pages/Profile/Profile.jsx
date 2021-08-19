import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import { Switch, Route } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import componentStyles from "./Profile.module.css";
import UserOrdersHistory from "../../components/UserOrdersHistory/UserOrdersHistory";

const Profile = () => {
  return (
    <div className={ componentStyles.container }>
      <ProfileMenu/>
      <Switch>
        <Route path="/profile" exact={ true }>
          <ProfileDetails/>
        </Route>
        <Route path="/profile/orders" exact={ true }>
          <UserOrdersHistory/>
        </Route>
        <Route path="/profile/orders/:id" exact={ true }>
          <UserOrdersHistory/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </div>
  );
};

export default Profile;
