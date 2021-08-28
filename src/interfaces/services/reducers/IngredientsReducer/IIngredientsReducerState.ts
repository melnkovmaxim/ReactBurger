import {IIngredient} from "../../../models/IIngredient";
import { IConstructorIngredient } from "../../../models/IConstructorIngredient";

export interface IIngredientsReducerState {
  items: Array<IIngredient>;
  itemsRequestPending: boolean;
  itemsRequestFailed: boolean;
  itemsRequestError: string;
  isDragging: boolean;
  constructorItems: Array<IConstructorIngredient>;
  constructorItemCounts: Map<string, number>;
  constructorBunId: string;
  constructorTotalPrice: number;
}