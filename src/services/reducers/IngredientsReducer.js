import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_CONSTRUCTOR_INGREDIENT,
    VIEW_INGREDIENT,
    MOVE_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    DRAG,
    DROP
} from '../actions/IngredientActions';
import uuid from 'react-uuid'

const initialState = {
    items: [],
    itemsRequestPending: false,
    itemsRequestFailed: false,
    itemsRequestError: '',

    isDragging: false,

    constructorItems: [],
    constructorTotalPrice: 0,

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
        case ADD_CONSTRUCTOR_INGREDIENT: {
            const item = state.items.find(item => item._id === action.itemId);
            const constructorItems = item.type === "bun"
                                        ? state.constructorItems.filter(item => item.type !== "bun")
                                        : [...state.constructorItems];

            return {
                ...state,
                constructorItems: [ { constructorItemId: uuid(), ...item }, ...constructorItems ],
            }
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT: {
            const removedIngredient = state.constructorItems.find(item => item.constructorItemId === action.constructorItemId);

            return {
                ...state,
                constructorItems: removedIngredient.type === "bun" 
                                    ? [ ...state.constructorItems.filter(item => item._id !== removedIngredient._id) ]
                                    : [ ...state.constructorItems.filter(item => item.constructorItemId !== action.constructorItemId) ],
            }
        }
        case VIEW_INGREDIENT: {
            const viewedItem = state.items.find(item => item._id === action.itemId);

            return {
                ...state,
                viewedItem: viewedItem,
            }
        }
        case MOVE_CONSTRUCTOR_INGREDIENT: {
            const draggedItem = state.constructorItems.find(item => item.constructorItemId === action.draggedItemId);
            const draggedItemIndex = state.constructorItems.indexOf(draggedItem);
            const targetItem = state.constructorItems.find(item => item.constructorItemId === action.targetItemId);
            const targetItemIndex = state.constructorItems.indexOf(targetItem);

            const selectedItemsWithoutDragged = [...state.constructorItems];
            selectedItemsWithoutDragged.splice(draggedItemIndex, 1);
            selectedItemsWithoutDragged.splice(action.targetItemIndex ?? targetItemIndex, 0, draggedItem);
            
            return {
                ...state,
                constructorItems: selectedItemsWithoutDragged
            }
        }
        case DRAG: {
            return {
                ...state,
                isDragging: true,
            }
        }
        case DROP: {
            return {
                ...state,
                isDragging: false,
            }
        }
        default: {
            return state;
        }
    }
}