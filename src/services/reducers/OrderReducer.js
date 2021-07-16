import { CREATE_ORDER_REQUEST, CREATE_ORDER_REQUEST_SUCCESS, CREATE_ORDER_REQUEST_FAILED } from "../actions/OrderActions";

const initialState = {
    orderNumber: '',
    burgerName: '',
    createOrderRequestPending: false,
    createOrderRequestFailed: false,
    createOrderRequestError: '',
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                createOrderRequestPending: true,
            }
        }
        case CREATE_ORDER_REQUEST_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                burgerName: action.burgerName,
                createOrderRequestPending: false,
                createOrderRequestFailed: false,
            }
        }
        case CREATE_ORDER_REQUEST_FAILED: {
            return {
                ...state,
                orderNubmer: '',
                burgerName: '',
                createOrderRequestFailed: true,
                createOrderRequestError: action.error,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
};