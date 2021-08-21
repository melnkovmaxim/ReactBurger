import { ingredientsReducer } from "./IngredientsReducer";
import { orderReducer } from "./OrderReducer";
import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { profileReducer } from "./ProfileReducer";
import { wsReducer } from "./WsReducer";


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
  profile: profileReducer,
  ws: wsReducer,
});
