import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import componentStyles from "./Profile.module.css";
import UserOrdersHistory from "../../components/UserOrdersHistory/UserOrdersHistory";
import Modal from "../../components/Modal/Modal";
import React from "react";
import OrderTapeCardDetails from "../../components/OrderTapeCardDetails/OrderTapeCardDetails";
import { History, Location } from "history";
import LocationState = History.LocationState;
import { ILocationState } from "../../interfaces/pages/ILocationState";

const Profile = (): JSX.Element => {
  const history: History<LocationState> = useHistory();
  const location: LocationState & ILocationState = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Switch
        location={ ((history.action === "PUSH" || history.action === "REPLACE") && background as Location<unknown>) || location as Location<unknown> }>
        <Route path={ ["/profile", "/profile/orders"] } exact={ true }>
          <div className={ componentStyles.container }>
            <ProfileMenu/>
            <Switch>
              <Route path="/profile" exact={ true }>
                <ProfileDetails/>
              </Route>
              <Route path="/profile/orders" exact={ true }>
                <UserOrdersHistory/>
              </Route>
              <Route>
                <NotFound/>
              </Route>
            </Switch>
          </div>
        </Route>
      </Switch>


      <Route path="/profile/orders/:id" exact={ true }>
        { background && history.action === 'PUSH' ? (
          <Modal>
            <OrderTapeCardDetails/>
          </Modal>
        ) : (
          <OrderTapeCardDetails/>
        ) }
      </Route>
    </>
  );
};

export default Profile;
