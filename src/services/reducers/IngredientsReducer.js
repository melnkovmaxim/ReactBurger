import { updateSourceFile } from 'typescript';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SELECT_INGREDIENT,
    VIEW_INGREDIENT,
    MOVE_CONSTRUCTOR_INGREDIENT,
} from '../actions/IngredientActions';
import update from "immutability-helper";

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
                selectedItems: [...state.selectedItems, ...state.items.filter(item => item._id === action.itemId)],
            }
        }
        case VIEW_INGREDIENT: {
            return {
                ...state,
                viewedItem: action.item,
            }
        }
        case MOVE_CONSTRUCTOR_INGREDIENT: {
            const draggedItem = state.selectedItems.find(item => item._id === action.draggedItemId);
            const draggedItemIndex = state.selectedItems.indexOf(draggedItem);
            const targetItem = state.selectedItems.find(item => item._id === action.targetItemId);
            const targetItemIndex = state.selectedItems.indexOf(targetItem);

            const selectedItemsWithoutDragged = [...state.selectedItems];
            selectedItemsWithoutDragged.splice(draggedItemIndex, 1);
            selectedItemsWithoutDragged.splice(targetItemIndex, 0, draggedItem)
            
            return {
                ...state,
                selectedItems: selectedItemsWithoutDragged
            }
        }
        default: {
            return state;
        }
    }
}