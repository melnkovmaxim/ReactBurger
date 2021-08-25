export interface IIngredientsReducerState {
  items: Array<any>;
  itemsRequestPending: boolean;
  itemsRequestFailed: boolean;
  itemsRequestError: string;
  isDragging: boolean;
  constructorItems: Array<any>;
  constructorItemCounts: Map<string, number>;
  constructorBunId: string;
  constructorTotalPrice: number;
}