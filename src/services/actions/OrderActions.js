export const CREATE_ORDER = 'CREATE_ORDER';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export function createOrder(bun, ingredients) {
    return function(dispatch) {
        if (bun && ingredients && ingredients.length > 0) {
            dispatch({ type: CREATE_ORDER, bun: bun, ingredients: ingredients });
        }
    }
}