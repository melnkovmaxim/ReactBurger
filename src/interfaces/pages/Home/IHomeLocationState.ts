import {History, Location} from "history";

interface ILocationState {
  background: Location<unknown>;
}

export interface IHomeLocationState {
  state?: ILocationState
}