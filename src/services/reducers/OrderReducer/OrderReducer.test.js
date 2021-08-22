import { orderReducer } from "./OrderReducer";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_REQUEST_FAILED,
  CREATE_ORDER_REQUEST_SUCCESS
} from "../../actions/OrderActions";

const initialState = {
  orderNumber: '',
  burgerName: '',
  createOrderRequestPending: false,
  createOrderRequestFailed: false,
  createOrderRequestError: '',
}

test('should return the initial state order reducer', () => {
  expect(orderReducer(undefined, {})).toEqual(initialState);
});

test('should handle create order request', () => {
  const resultState = { ...initialState, createOrderRequestPending: true };

  expect(orderReducer(initialState, { type: CREATE_ORDER_REQUEST })).toEqual(resultState);
});

test('should handle create order request success', () => {
  const orderNumber = 123456;
  const burgerName = 'Классический бургер';
  const previousState = {
    ...initialState,
    createOrderRequestPending: true,
    createOrderRequestFailed: true,
    createOrderRequestError: 'error'
  };
  const resultState = {
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
  const error = 'error';
  const previousState = { ...initialState, createOrderRequestPending: true, orderNumber: 123456, burgerName: 'Бургер' };
  const resultState = {
    ...initialState,
    createOrderRequestPending: false,
    createOrderRequestFailed: true,
    createOrderRequestError: error
  };

  expect(orderReducer(previousState, { type: CREATE_ORDER_REQUEST_FAILED, error: error })).toEqual(resultState);
});