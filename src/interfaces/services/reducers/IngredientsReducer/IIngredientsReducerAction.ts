import {IAction} from "../IAction";
import {IErrorAction} from "../IErrorAction";
import {IIngredient} from "../../../models/IIngredient";

export interface IIngredientsReducerAction extends IAction, IErrorAction {
  ingredients?: Array<IIngredient>;
  itemId?: string;
  constructorItemId?: string;
  constructorItemCounts?: Map<string, number>;
  draggedItemId?: string;
  targetItemId?: string;
  targetItemIndex?: number;
}