export interface IAuthReducerState {
  registerRequestPending: boolean;
  registerRequestFailed: boolean;
  registerRequestError: string;

  loginRequestPending: boolean;
  loginRequestFailed: boolean;
  loginRequestError: string;

  logoutRequestPending: boolean;
  logoutRequestFailed: boolean;
  logoutRequestError: string;

  refreshTokenRequestPending: boolean;
  refreshTokenRequestFailed: boolean;
  refreshTokenRequestError: string;
}