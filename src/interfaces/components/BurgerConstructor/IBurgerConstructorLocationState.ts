import { ILocationState } from "../../pages/ILocationState";

export interface IBurgerConstructorLocationState extends ILocationState {
  from?: string;
  isRepeatAction?: boolean;
}