import { wsReducer } from "./WsReducer";
import {
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
  WS_GET_ALL_ORDERS_MESSAGE, WS_GET_USER_ORDERS_MESSAGE, WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_SUCCESS
} from "../../actions/WsActions";

const initialState = {
  wsAllOrdersConnected: false,
  wsUserOrdersConnected: false,

  allOrders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
};

test('should return the initial state ws reducer', () => {
  expect(wsReducer(undefined, {})).toEqual(initialState);
});

test('should handle successful connection to receive all orders', () => {
  const resultState = { ...initialState, wsAllOrdersConnected: true };

  expect(wsReducer(initialState, { type: WS_ALL_ORDERS_CONNECTION_SUCCESS })).toEqual(resultState);
});

test('should handle receive all orders connection error', () => {
  const previousState = { ...initialState, wsAllOrdersConnected: true };

  expect(wsReducer(previousState, { type: WS_ALL_ORDERS_CONNECTION_ERROR })).toEqual(initialState);
});

test('should handle receive all orders connection close', () => {
  const previousState = { ...initialState, wsAllOrdersConnected: true };

  expect(wsReducer(previousState, { type: WS_ALL_ORDERS_CONNECTION_CLOSED })).toEqual(initialState);
});

test('should handle to receive all orders message', () => {
  const orders = [1, 2, 3, 4];
  const total = 250;
  const totalToday = 400;
  const resultState = { ...initialState, orders: orders, total: total, totalToday: totalToday };

  expect(wsReducer(initialState, {
    type: WS_GET_ALL_ORDERS_MESSAGE,
    payload: {
      orders: orders,
      total: total,
      totalToday: totalToday
    }
  })).toEqual(resultState);
});

test('should handle successful connection to receive user orders', () => {
  const resultState = { ...initialState, wsUserOrdersConnected: true };

  expect(wsReducer(initialState, { type: WS_USER_ORDERS_CONNECTION_SUCCESS })).toEqual(resultState);
});

test('should handle receive user orders connection error', () => {
  const previousState = { ...initialState, wsUserOrdersConnected: true };

  expect(wsReducer(previousState, { type: WS_USER_ORDERS_CONNECTION_ERROR })).toEqual(initialState);
});

test('should handle receive user orders connection close', () => {
  const previousState = { ...initialState, wsUserOrdersConnected: true };

  expect(wsReducer(previousState, { type: WS_USER_ORDERS_CONNECTION_CLOSED })).toEqual(initialState);
});

test('should handle to receive user orders message', () => {
  const userOrders = [1, 2, 3, 4, 5];
  const resultState = { ...initialState, userOrders: userOrders };

  expect(wsReducer(initialState, {
    type: WS_GET_USER_ORDERS_MESSAGE,
    payload: { orders: userOrders }
  })).toEqual(resultState);
});