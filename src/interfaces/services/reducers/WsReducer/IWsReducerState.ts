export interface IWsReducerState {
  wsAllOrdersConnected: boolean,
  wsUserOrdersConnected: boolean,

  allOrders: Array<any>,
  userOrders: Array<any>,
  total: number,
  totalToday: number,
}