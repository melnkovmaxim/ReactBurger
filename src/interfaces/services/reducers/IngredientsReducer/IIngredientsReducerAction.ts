import {IAction} from "../IAction";
import {IErrorAction} from "../IErrorAction";

export interface IIngredientsReducerAction extends IAction, IErrorAction {
  ingredients?: Array<any>;
  items?: Array<any>;
  itemId?: string;
  constructorItemId?: string;
  constructorItemCounts?: Map<string, number>;
  draggedItemId?: string;
  targetItemId?: string;
  targetItemIndex?: number;
}