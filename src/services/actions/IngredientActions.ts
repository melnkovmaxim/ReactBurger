import { AppThunk } from "../../index";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const ADD_CONSTRUCTOR_INGREDIENT: 'SELECT_INGREDIENT' = 'SELECT_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT: 'REMOVE_CONSTRUCTOR_INGREDIENT' = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const MOVE_CONSTRUCTOR_INGREDIENT: 'MOVE_CONSTRUCTOR_INGREDIENT' = 'MOVE_CONSTRUCTOR_INGREDIENT';

export const DRAG: 'DRAG' = 'DRAG';
export const DROP: 'DROP' = 'DROP';

export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";

const URL_INGREDIENTS: string = "https://norma.nomoreparties.space/api/ingredients";

export function getIngredients(): AppThunk {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });

    fetch(URL_INGREDIENTS)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${ response.status }`);
      })
      .then(json => dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: json.data }))
      .catch(error => dispatch({ type: GET_INGREDIENTS_FAILED, error: error }));
  }
}