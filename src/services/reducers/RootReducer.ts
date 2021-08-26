import { ingredientsReducer } from "./IngredientsReducer/IngredientsReducer";
import { orderReducer } from "./OrderReducer/OrderReducer";
import {combineReducers, ReducersMapObject} from "redux";
import { authReducer } from "./AuthReducer/AuthReducer";
import { profileReducer } from "./ProfileReducer/ProfileReducer";
import { wsReducer } from "./WsReducer/WsReducer";


export const rootReducer: ReducersMapObject<unknown, any> = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
  profile: profileReducer,
  ws: wsReducer,
});