export interface IOrderReducerState {
  orderNumber: string,
  burgerName: string,
  createOrderRequestPending: boolean;
  createOrderRequestFailed: boolean;
  createOrderRequestError: string;
}