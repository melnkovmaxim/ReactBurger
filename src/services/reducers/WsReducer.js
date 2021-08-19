import {
  WS_ALL_ORDERS_CONNECTION_SUCCESS,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_GET_ALL_ORDERS_MESSAGE,
  WS_PRIVATE_ORDERS_GET_ORDERS_MESSAGE,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR, WS_GET_USER_ORDERS_MESSAGE
} from '../actions/WsActions';

const initialState = {
  wsPublicOrdersConnected: false,
  wsPrivateOrdersConnected: false,

  allOrders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ALL_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsPublicOrdersConnected: true
      };

    case WS_ALL_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsPublicOrdersConnected: false
      };

    case WS_ALL_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsPublicOrdersConnected: false
      };

    case WS_GET_ALL_ORDERS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    case WS_USER_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsPrivateOrdersConnected: true
      }
    case WS_USER_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsPrivateOrdersConnected: false
      }
    case WS_USER_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsPrivateOrdersConnected: false
      }
    case WS_GET_USER_ORDERS_MESSAGE:
      return {
        ...state,
        userOrders: action.payload.orders,
      };
    default:
      return state;
  }
};
