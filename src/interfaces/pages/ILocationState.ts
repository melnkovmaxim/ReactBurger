import {Location} from "history";

interface ILocation {
  background: Location<unknown>;
}

export interface ILocationState {
  state?: ILocation
}