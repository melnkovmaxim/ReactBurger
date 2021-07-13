import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SELECT_INGREDIENT,
    VIEW_INGREDIENT,
} from '../actions/IngredientActions';

const initialState = {
    items: [],
    itemsRequestPending: false,
    itemsRequestFailed: false,
    itemsRequestError: '',

    selectedItems: [],

    viewedItem: {},
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
        case SELECT_INGREDIENT: {
            return {
                ...state,
                selectedItems: [...state.selectedItems, action.item],
            }
        }
        case VIEW_INGREDIENT: {
            return {
                ...state,
                viewedItem: action.item,
            }
        }
        default: {
            return state;
        }
    }
}