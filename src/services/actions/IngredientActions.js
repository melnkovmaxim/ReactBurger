export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const MOVE_CONSTRUCTOR_INGREDIENT = 'MOVE_CONSTRUCTOR_INGREDIENT';

export const VIEW_INGREDIENT = 'VIEW_INGREDIENT';

const URL_INGREDIENTS = "https://norma.nomoreparties.space/api/ingredients";

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        fetch(URL_INGREDIENTS)
            .then(response => { 
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(`Ошибка ${response.status}`);
            })
            .then(json => dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: json.data }))
            .catch(error => dispatch({ type: GET_INGREDIENTS_FAILED, error: error }));
    }
};