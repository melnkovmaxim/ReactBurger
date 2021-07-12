import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../actions/IngredientActions';

const initialState = {
    items: [],
    itemsRequestPending: false,
    itemsRequestFailed: false,
    itemsRequestError: '',
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequestPending: true,
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                items: action.ingredients,
                itemsRequestPending: false,
                itemsRequestFailed: false,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                itemsRequestFailed: true,
                error: action.error,
            }
        }
        default: {
            return state;
        }
    }
}