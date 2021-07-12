import { ingredientsReducer } from "./IngredientsReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
});