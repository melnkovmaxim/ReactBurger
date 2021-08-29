import { orderReducer } from "./OrderReducer";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_REQUEST_FAILED,
  CREATE_ORDER_REQUEST_SUCCESS
} from "../../actions/OrderActions";
import {IOrderReducerState} from "../../../interfaces/services/reducers/OrderReducer/IOrderReducerState";

const initialState: IOrderReducerState = {
  orderNumber: '',
  burgerName: '',
  createOrderRequestPending: false,
  createOrderRequestFailed: false,
  createOrderRequestError: '',
}

test('should return the initial state order reducer', () => {
  expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
});

test('should handle create order request', () => {
  const resultState: IOrderReducerState = { ...initialState, createOrderRequestPending: true };

  expect(orderReducer(initialState, { type: CREATE_ORDER_REQUEST })).toEqual(resultState);
});

test('should handle create order request success', () => {
  const orderNumber: string = '123456';
  const burgerName: string = 'Классический бургер';
  const previousState: IOrderReducerState = {
    ...initialState,
    createOrderRequestPending: true,
    createOrderRequestFailed: true,
    createOrderRequestError: 'error'
  };
  const resultState: IOrderReducerState = {
    ...initialState,
    createOrderRequestPending: false,
    createOrderRequestFailed: false,
    createOrderRequestError: '',
    orderNumber: orderNumber,
    burgerName: burgerName
  };

  expect(orderReducer(previousState, {
    type: CREATE_ORDER_REQUEST_SUCCESS,
    orderNumber: orderNumber,
    burgerName: burgerName
  })).toEqual(resultState);
});

test('should handle create order request failed', () => {
  const error: string = 'error';
  const previousState: IOrderReducerState = { ...initialState, createOrderRequestPending: true, orderNumber: '123456', burgerName: 'Бургер' };
  const resultState: IOrderReducerState = {
    ...initialState,
    createOrderRequestPending: false,
    createOrderRequestFailed: true,
    createOrderRequestError: error
  };

  expect(orderReducer(previousState, { type: CREATE_ORDER_REQUEST_FAILED, error: error })).toEqual(resultState);
});