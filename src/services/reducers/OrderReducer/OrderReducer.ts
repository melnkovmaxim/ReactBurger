import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_REQUEST_SUCCESS,
  CREATE_ORDER_REQUEST_FAILED
} from "../../actions/OrderActions";
import {IOrderReducerState} from "../../../interfaces/services/reducers/OrderReducer/IOrderReducerState";
import {IOrderReducerAction} from "../../../interfaces/services/reducers/OrderReducer/IOrderReducerAction";

const initialState: IOrderReducerState = {
  orderNumber: '',
  burgerName: '',
  createOrderRequestPending: false,
  createOrderRequestFailed: false,
  createOrderRequestError: '',
}

export const orderReducer = (state: IOrderReducerState = initialState, action: IOrderReducerAction) => {
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
        createOrderRequestError: '',
      }
    }
    case CREATE_ORDER_REQUEST_FAILED: {
      return {
        ...state,
        orderNumber: '',
        burgerName: '',
        createOrderRequestPending: false,
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