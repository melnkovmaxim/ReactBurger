import { authReducer } from "./AuthReducer";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILED,
  LOGIN_REQUEST_SUCCESS, LOGOUT_REQUEST, LOGOUT_REQUEST_FAILED, LOGOUT_REQUEST_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_REQUEST_FAILED,
  REFRESH_TOKEN_REQUEST_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_REQUEST_FAILED,
  REGISTER_REQUEST_SUCCESS
} from "../../actions/AuthActions";
import {IAuthReducerState} from "../../../interfaces/services/reducers/AuthReducer/IAuthReducerState";

const initialState: IAuthReducerState = {
  registerRequestPending: false,
  registerRequestFailed: false,
  registerRequestError: "",

  loginRequestPending: false,
  loginRequestFailed: false,
  loginRequestError: "",

  logoutRequestPending: false,
  logoutRequestFailed: false,
  logoutRequestError: "",

  refreshTokenRequestPending: false,
  refreshTokenRequestFailed: false,
  refreshTokenRequestError: '',
};

test('should return the initial state auth reducer', () => {
  expect(authReducer(undefined, {type: ''})).toEqual(initialState);
});

test('should handle register request', () => {
  const resultState: IAuthReducerState = { ...initialState, registerRequestPending: true };

  expect(authReducer(initialState, { type: REGISTER_REQUEST })).toEqual(resultState);
});

test('should handle register request success', () => {
  const previousState: IAuthReducerState = {
    ...initialState,
    registerRequestPending: true,
    registerRequestFailed: true,
    registerRequestError: 'error'
  };

  expect(authReducer(previousState, { type: REGISTER_REQUEST_SUCCESS })).toEqual(initialState);
});

test('should handle register request failed', () => {
  const error: string = 'error';
  const previousState: IAuthReducerState = { ...initialState, registerRequestPending: true };
  const resultState: IAuthReducerState = {
    ...initialState,
    registerRequestPending: false,
    registerRequestFailed: true,
    registerRequestError: error
  };

  expect(authReducer(previousState, { type: REGISTER_REQUEST_FAILED, error: error })).toEqual(resultState);
});

test('should handle login request', () => {
  const resultState: IAuthReducerState = { ...initialState, loginRequestPending: true };

  expect(authReducer(initialState, { type: LOGIN_REQUEST })).toEqual(resultState);
});

test('should handle login request success', () => {
  const previousState: IAuthReducerState = {
    ...initialState,
    registerRequestPending: true,
    registerRequestFailed: true,
    registerRequestError: 'error'
  }

  expect(authReducer(previousState, { type: LOGIN_REQUEST_SUCCESS })).toEqual(previousState);
});

test('should handle login request failed', () => {
  const error: string = 'error';
  const previousState: IAuthReducerState = { ...initialState, loginRequestPending: true };
  const resultState: IAuthReducerState = {
    ...initialState,
    loginRequestPending: false,
    loginRequestFailed: true,
    loginRequestError: error
  };

  expect(authReducer(previousState, { type: LOGIN_REQUEST_FAILED, error: error })).toEqual(resultState);
});

test('should handle refresh token request', () => {
  const resultState: IAuthReducerState = { ...initialState, refreshTokenRequestPending: true };

  expect(authReducer(initialState, { type: REFRESH_TOKEN_REQUEST })).toEqual(resultState);
});

test('should handle refresh token request success', () => {
  const previousState: IAuthReducerState = {
    ...initialState,
    refreshTokenRequestPending: true,
    refreshTokenRequestFailed: true,
    refreshTokenRequestError: 'error'
  };

  expect(authReducer(previousState, { type: REFRESH_TOKEN_REQUEST_SUCCESS })).toEqual(initialState);
});

test('should handle refresh token request failed', () => {
  const error: string = 'error';
  const previousState: IAuthReducerState = { ...initialState, refreshTokenRequestPending: true };
  const resultState: IAuthReducerState = {
    ...initialState,
    refreshTokenRequestPending: false,
    refreshTokenRequestFailed: true,
    refreshTokenRequestError: error
  };

  expect(authReducer(previousState, { type: REFRESH_TOKEN_REQUEST_FAILED, error: error })).toEqual(resultState);
});

test('should handle logout request', () => {
  const resultState: IAuthReducerState = { ...initialState, logoutRequestPending: true };

  expect(authReducer(initialState, { type: LOGOUT_REQUEST })).toEqual(resultState);
});

test('should handle logout request success', () => {
  const previousState: IAuthReducerState = {
    ...initialState,
    logoutRequestPending: true,
    logoutRequestFailed: true,
    logoutRequestError: 'error'
  };

  expect(authReducer(previousState, { type: LOGOUT_REQUEST_SUCCESS })).toEqual(initialState);
});

test('should handle logout request failed', () => {
  const error: string = 'error';
  const previousState: IAuthReducerState = { ...initialState, logoutRequestPending: true };
  const resultState: IAuthReducerState = {
    ...initialState,
    logoutRequestPending: false,
    logoutRequestFailed: true,
    logoutRequestError: error
  };

  expect(authReducer(previousState, { type: LOGOUT_REQUEST_FAILED, error: error })).toEqual(resultState);
});