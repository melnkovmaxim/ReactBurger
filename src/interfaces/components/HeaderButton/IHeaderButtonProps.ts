import { IChildren } from "../IChildren";

export interface IHeaderButtonProps extends IChildren {
  type?: "secondary" | "primary";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  text: string;
}