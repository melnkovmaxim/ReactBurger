import { ingredientsReducer } from "./IngredientsReducer";
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  CLEAR_CONSTRUCTOR, DRAG, DROP,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, MOVE_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT
} from "../../actions/IngredientActions";
import {IIngredientsReducerState} from "../../../interfaces/services/reducers/IngredientsReducer/IIngredientsReducerState";
import { IIngredient } from "../../../interfaces/models/IIngredient";
import { IConstructorIngredient } from "../../../interfaces/models/IConstructorIngredient";

const initialState: IIngredientsReducerState = {
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
  expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
});

test('should handle get ingredients request', () => {
  const resultState: IIngredientsReducerState = { ...initialState, itemsRequestPending: true };

  expect(ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual(resultState);
});

test('should handle get ingredients request success', () => {
  const ingredients: Array<IIngredient> = [{} as IIngredient, {} as IIngredient, {} as IIngredient];
  const previousState: IIngredientsReducerState = {
    ...initialState,
    itemsRequestPending: true,
    itemsRequestFailed: true,
    itemsRequestError: 'error'
  };
  const resultState: IIngredientsReducerState = {
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
  const error: string = 'error';
  const previousState: IIngredientsReducerState = { ...initialState, itemsRequestPending: true };
  const resultState: IIngredientsReducerState = {
    ...initialState,
    itemsRequestPending: false,
    itemsRequestFailed: true,
    itemsRequestError: error
  };

  expect(ingredientsReducer(previousState, { type: GET_INGREDIENTS_FAILED, error: error })).toEqual(resultState);
});

test('should handle clear constructor', () => {
  const constructorItemCounts: Map<string, number> = new Map();
  constructorItemCounts.set('key', 1000);
  const previousState: IIngredientsReducerState = {
    ...initialState,
    constructorItems: [{} as IConstructorIngredient, {} as IConstructorIngredient, {} as IConstructorIngredient],
    constructorItemCounts: constructorItemCounts,
    constructorBunId: '10',
    constructorTotalPrice: 15
  };

  expect(ingredientsReducer(previousState, { type: CLEAR_CONSTRUCTOR })).toEqual(initialState);
});

test('should handle drag', () => {
  const resultState: IIngredientsReducerState = { ...initialState, isDragging: true };

  expect(ingredientsReducer(initialState, { type: DRAG })).toEqual(resultState);
})

test('should handle drop', () => {
  const previousState: IIngredientsReducerState = { ...initialState, isDragging: true };

  expect(ingredientsReducer(previousState, { type: DROP })).toEqual(initialState);
});

test('should handle add constructor ingredient bun', () => {
  const bun: IIngredient = { _id: '1', type: 'bun' } as IIngredient;
  const ingredients: Array<IIngredient> = [bun];
  const previousState: IIngredientsReducerState = { ...initialState, items: ingredients };
  const constructorItemCounts: Map<string, number> = new Map();
  constructorItemCounts.set(bun._id, 2);

  expect(ingredientsReducer(previousState, {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    itemId: bun._id
  })).toHaveProperty('constructorItemCounts', constructorItemCounts);
});

test('should handle add constructor ingredient only one any ingredient except bun', () => {
  const ingredient: IIngredient = { _id: "1", type: 'sauce' } as IIngredient;
  const ingredients: Array<IIngredient> = [ingredient];
  const previousState: IIngredientsReducerState = { ...initialState, items: ingredients };
  const constructorItemCounts: Map<string, number> = new Map();
  constructorItemCounts.set(ingredient._id, 1);

  expect(ingredientsReducer(previousState, {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    itemId: ingredient._id
  })).toHaveProperty('constructorItemCounts', constructorItemCounts);
});

test('should handle add constructor many ingredient except bun', () => {
  const ingredient: IIngredient = { _id: "1", type: 'sauce' } as IIngredient;
  const ingredients: Array<IIngredient> = [ingredient];
  let previousState: IIngredientsReducerState = { ...initialState, items: ingredients };
  const constructorItemCounts: Map<string, number> = new Map();
  constructorItemCounts.set(ingredient._id, 1);

  expect(ingredientsReducer(previousState, {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    itemId: ingredient._id
  })).toHaveProperty('constructorItemCounts', constructorItemCounts);

  previousState = {
    ...initialState,
    items: ingredients,
    constructorItemCounts: constructorItemCounts,
    constructorItems: [{ ...ingredient, constructorItemId: "1" }]
  };

  const secondConstructorItemCounts: Map<string, number> = new Map();
  secondConstructorItemCounts.set(ingredient._id, 2);

  expect(ingredientsReducer(previousState, {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    itemId: ingredient._id
  })).toHaveProperty('constructorItemCounts', secondConstructorItemCounts);
});

test('should handle remove constructor ingredient bun', () => {
  const bun: IConstructorIngredient = { _id: "1", constructorItemId: "123", type: "bun" } as IConstructorIngredient;
  const constructorItems: Array<IConstructorIngredient> = [bun];
  const constructorItemCounts: Map<string, number> = new Map();
  constructorItemCounts.set(bun._id, 2);
  const previousState: IIngredientsReducerState = { ...initialState, constructorItems: constructorItems };
  const resultConstructorItemCounts: Map<string, number> = new Map();
  resultConstructorItemCounts.set(bun._id, 0);

  expect(ingredientsReducer(previousState, {
    type: REMOVE_CONSTRUCTOR_INGREDIENT,
    constructorItemId: bun.constructorItemId
  })).toHaveProperty('constructorItemCounts', resultConstructorItemCounts);
});

test('should handle remove constructor ingredient except bun', () => {
  const firstIngredient: IConstructorIngredient = { _id: "1", constructorItemId: "111", type: "sauce" } as IConstructorIngredient;
  const secondIngredient: IConstructorIngredient = { _id: "1", constructorItemId: "222", type: "sauce" } as IConstructorIngredient;
  const constructorItems: Array<IConstructorIngredient> = [firstIngredient, secondIngredient];
  const constructorItemCounts: Map<string, number> = new Map();
  constructorItemCounts.set(firstIngredient._id, 2);
  const previousState: IIngredientsReducerState = { ...initialState, constructorItems: constructorItems };
  const resultConstructorItemCounts: Map<string, number> = new Map();
  resultConstructorItemCounts.set(firstIngredient._id, 1);

  expect(ingredientsReducer(previousState, {
    type: REMOVE_CONSTRUCTOR_INGREDIENT,
    constructorItemId: firstIngredient.constructorItemId
  })).toHaveProperty('constructorItemCounts', resultConstructorItemCounts);
});

test('should handle move constructor ingredient', () => {
  const firstIngredient: IConstructorIngredient = { _id: "1", constructorItemId: "111", type: "sauce" } as IConstructorIngredient;
  const secondIngredient: IConstructorIngredient = { _id: "2", constructorItemId: "222", type: "sauce" } as IConstructorIngredient;
  const thirdIngredient: IConstructorIngredient = { _id: "3", constructorItemId: "333", type: "sauce" } as IConstructorIngredient;
  const constructorItems: Array<IConstructorIngredient> = [firstIngredient, secondIngredient, thirdIngredient];
  const previousState: IIngredientsReducerState = { ...initialState, constructorItems: constructorItems };
  const resultConstructorItems: Array<IConstructorIngredient> = [firstIngredient, thirdIngredient, secondIngredient];
  const resultState: IIngredientsReducerState = { ...initialState, constructorItems: resultConstructorItems };

  expect(ingredientsReducer(previousState, {
    type: MOVE_CONSTRUCTOR_INGREDIENT,
    draggedItemId: thirdIngredient.constructorItemId,
    targetItemId: secondIngredient.constructorItemId,
  })).toEqual(resultState);
});