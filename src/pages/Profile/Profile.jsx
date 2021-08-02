import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import componentStyles from './Profile.module.css';

const Profile = () => {
  return (
    <div className={componentStyles.container}>
      <ProfileMenu />
      <Router>
        <Switch>
          <Route path="/profile" exact={true}>
            <ProfileDetails />
          </Route>
          <Route path="/profile/orders" exact={true}></Route>
          <Route path="/profile/orders/:id" exact={true}></Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Profile;
