import { CREATE_ORDER, ADD_INGREDIENT } from "../actions/OrderActions";

const initialState = {
    bun: {},
    ingredients: [],
    totalPrice: 0,
    isCreated: false,
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER: {
            return {
                ...state,
                bun: action.bun,
                ingredients: action.ingredients,
                totalPrice: action.ingredients.reduce((total, currentItem) => total + currentItem.price) + action.bun.price * 2,
                isCreated: true,
            }
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                selectedItems: [...state.selectedItems, ...state.items.filter(item => item._id === action.itemId)],
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
};