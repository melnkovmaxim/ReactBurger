import {IAction} from "../IAction";
import {IErrorAction} from "../IErrorAction";

export interface IOrderReducerAction extends IAction, IErrorAction {
  orderNumber?: string;
  burgerName?: string;
}