import { IChildren } from "../IChildren";

export interface IProtectedRouteProps extends IChildren {
  path: Array<string> | string;
  exact?: boolean,
}