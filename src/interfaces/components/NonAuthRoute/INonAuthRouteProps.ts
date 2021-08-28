import { IChildren } from "../IChildren";

export interface INonAuthRouteProps extends IChildren {
  path: string;
  exact?: boolean;
}