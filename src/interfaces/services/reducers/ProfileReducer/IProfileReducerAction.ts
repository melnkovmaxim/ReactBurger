import {IAction} from "../IAction";
import {IErrorAction} from "../IErrorAction";

export interface IProfileReducerAction extends IAction, IErrorAction {
  name?: string;
  email?: string;
}