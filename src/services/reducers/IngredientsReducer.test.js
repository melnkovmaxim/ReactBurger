import { ingredientsReducer } from "./IngredientsReducer";
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  CLEAR_CONSTRUCTOR, DRAG, DROP,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, MOVE_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT
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

test('should handle add constructor ingredient bun', () => {
  const bun = { _id: 1, type: 'bun' };
  const ingredients = [bun];
  const previousState = { ...initialState, items: ingredients };
  const constructorItemCounts = new Map();
  constructorItemCounts.set(bun._id, 2);

  expect(ingredientsReducer(previousState, {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    itemId: bun._id
  })).toHaveProperty('constructorItemCounts', constructorItemCounts);
});

test('should handle add constructor ingredient only one any ingredient except bun', () => {
  const ingredient = { _id: 1, type: 'sauce' };
  const ingredients = [ingredient];
  const previousState = { ...initialState, items: ingredients };
  const constructorItemCounts = new Map();
  constructorItemCounts.set(ingredient._id, 1);

  expect(ingredientsReducer(previousState, {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    itemId: ingredient._id
  })).toHaveProperty('constructorItemCounts', constructorItemCounts);
});

test('should handle add constructor many ingredient except bun', () => {
  const ingredient = { _id: 1, type: 'sauce' };
  const ingredients = [ingredient];
  let previousState = { ...initialState, items: ingredients };
  const constructorItemCounts = new Map();
  constructorItemCounts.set(ingredient._id, 1);

  expect(ingredientsReducer(previousState, {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    itemId: ingredient._id
  })).toHaveProperty('constructorItemCounts', constructorItemCounts);

  previousState = {
    ...initialState,
    items: ingredients,
    constructorItemCounts: constructorItemCounts,
    constructorItems: [{ ...ingredient, constructorItemId: 1 }]
  };

  const secondConstructorItemCounts = new Map();
  secondConstructorItemCounts.set(ingredient._id, 2);

  expect(ingredientsReducer(previousState, {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    itemId: ingredient._id
  })).toHaveProperty('constructorItemCounts', secondConstructorItemCounts);
});

test('should handle remove constructor ingredient bun', () => {
  const bun = { _id: 1, constructorItemId: 123, type: "bun" };
  const constructorItems = [bun];
  const constructorItemCounts = new Map();
  constructorItemCounts.set(bun._id, 2);
  const previousState = { ...initialState, constructorItems: constructorItems };
  const resultConstructorItemCounts = new Map();
  resultConstructorItemCounts.set(bun._id, 0);

  expect(ingredientsReducer(previousState, {
    type: REMOVE_CONSTRUCTOR_INGREDIENT,
    constructorItemId: bun.constructorItemId
  })).toHaveProperty('constructorItemCounts', resultConstructorItemCounts);
});

test('should handle remove constructor ingredient except bun', () => {
  const firstIngredient = { _id: 1, constructorItemId: 111, type: "sauce" };
  const secondIngredient = { _id: 1, constructorItemId: 222, type: "sauce" };
  const constructorItems = [firstIngredient, secondIngredient];
  const constructorItemCounts = new Map();
  constructorItemCounts.set(firstIngredient._id, 2);
  const previousState = { ...initialState, constructorItems: constructorItems };
  const resultConstructorItemCounts = new Map();
  resultConstructorItemCounts.set(firstIngredient._id, 1);

  expect(ingredientsReducer(previousState, {
    type: REMOVE_CONSTRUCTOR_INGREDIENT,
    constructorItemId: firstIngredient.constructorItemId
  })).toHaveProperty('constructorItemCounts', resultConstructorItemCounts);
});

test('should handle move constructor ingredient', () => {
  const firstIngredient = { _id: 1, constructorItemId: 111, type: "sauce" };
  const secondIngredient = { _id: 2, constructorItemId: 222, type: "sauce" };
  const thirdIngredient = { _id: 3, constructorItemId: 333, type: "sauce" };
  const constructorItems = [firstIngredient, secondIngredient, thirdIngredient];
  const previousState = { ...initialState, constructorItems: constructorItems };
  const resultConstructorItems = [firstIngredient, thirdIngredient, secondIngredient];
  const resultState = { ...initialState, constructorItems: resultConstructorItems };

  expect(ingredientsReducer(previousState, {
    type: MOVE_CONSTRUCTOR_INGREDIENT,
    draggedItemId: thirdIngredient.constructorItemId,
    targetItemId: secondIngredient.constructorItemId,
  })).toEqual(resultState);
});