import { ingredientsReducer } from "./IngredientsReducer";
import {
  CLEAR_CONSTRUCTOR, DRAG, DROP,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS
} from "../actions/IngredientActions";

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

test('should handle get ingredients request', () => {
  const resultState = { ...initialState, itemsRequestPending: true };

  expect(ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual(resultState);
});

test('should handle get ingredients request success', () => {
  const ingredients = [1, 2, 3];
  const previousState = {
    ...initialState,
    itemsRequestPending: true,
    itemsRequestFailed: true,
    itemsRequestError: 'error'
  };
  const resultState = {
    ...initialState,
    itemsRequestPending: false,
    itemsRequestFailed: false,
    itemsRequestError: '',
    items: ingredients
  };

  expect(ingredientsReducer(previousState, {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: ingredients
  })).toEqual(resultState);
});

test('should handle get ingredients request failed', () => {
  const error = 'error';
  const previousState = { ...initialState, itemsRequestPending: true };
  const resultState = {
    ...initialState,
    itemsRequestPending: false,
    itemsRequestFailed: true,
    itemsRequestError: error
  };

  expect(ingredientsReducer(previousState, { type: GET_INGREDIENTS_FAILED, error: error })).toEqual(resultState);
});

test('should handle clear constructor', () => {
  const constructorItemCounts = new Map();
  constructorItemCounts.set('key', 'value');
  const previousState = {
    ...initialState,
    constructorItems: [1, 2, 3],
    constructorItemCounts: constructorItemCounts,
    constructorBunId: 10,
    constructorTotalPrice: 15
  };

  expect(ingredientsReducer(previousState, { type: CLEAR_CONSTRUCTOR })).toEqual(initialState);
});

test('should handle drag', () => {
  const resultState = { ...initialState, isDragging: true };

  expect(ingredientsReducer(initialState, { type: DRAG })).toEqual(resultState);
})

test('should handle drop', () => {
  const previousState = { ...initialState, isDragging: true };

  expect(ingredientsReducer(previousState, { type: DROP })).toEqual(initialState);
});

test('should handle add constructor ingredient only one bun', () => {

});

test('should handle add constructor ingredient only one any ingredient except bun', () => {

});

test('should handle add constructor ingredient many buns', () => {

});

test('should handle add constructor many ingredient except bun', () => {

});

test('should handle remove constructor ingredient bun', () => {

});

test('should handle remove constructor ingredient except bun', () => {

});

test('should handle remove constructor ingredient many buns', () => {

});

test('should handle remove constructor many ingredient except bun', () => {

});

test('should handle move constructor ingredient', () => {

});