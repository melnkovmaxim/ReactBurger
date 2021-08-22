import { ingredientsReducer } from "./IngredientsReducer";

const initialState = {
  items: [],
  itemsRequestPending: false,
  itemsRequestFailed: false,
  itemsRequestError: '',

  isDragging: false,

  constructorItems: [],
  constructorItemCounts: new Map(),
  constructorBunId: '',
  constructorTotalPrice: 0,
}

test('should return the initial state ingredients reducer', () => {
  expect(ingredientsReducer(undefined, {})).toEqual(initialState);
});