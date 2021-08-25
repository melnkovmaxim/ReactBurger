import {IAction} from "../IAction";
import {IErrorAction} from "../IErrorAction";

export interface IWsReducerAction extends IAction, IErrorAction {
  payload?: any;
}