import { ingredientsReducer } from "./IngredientsReducer";
import { orderReducer } from "./OrderReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
});
