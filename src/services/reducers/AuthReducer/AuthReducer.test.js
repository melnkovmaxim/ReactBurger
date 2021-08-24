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

const initialState = {
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
  expect(authReducer(undefined, {})).toEqual(initialState);
});

test('should handle register request', () => {
  const resultState = { ...initialState, registerRequestPending: true };

  expect(authReducer(initialState, { type: REGISTER_REQUEST })).toEqual(resultState);
});

test('should handle register request success', () => {
  const previousState = {
    ...initialState,
    registerRequestPending: true,
    registerRequestFailed: true,
    registerRequestError: 'error'
  };

  expect(authReducer(previousState, { type: REGISTER_REQUEST_SUCCESS })).toEqual(initialState);
});

test('should handle register request failed', () => {
  const error = 'error';
  const previousState = { ...initialState, registerRequestPending: true };
  const resultState = {
    ...initialState,
    registerRequestPending: false,
    registerRequestFailed: true,
    registerRequestError: error
  };

  expect(authReducer(previousState, { type: REGISTER_REQUEST_FAILED, error: error })).toEqual(resultState);
});

test('should handle login request', () => {
  const resultState = { ...initialState, loginRequestPending: true };

  expect(authReducer(initialState, { type: LOGIN_REQUEST })).toEqual(resultState);
});

test('should handle login request success', () => {
  const previousState = {
    ...initialState,
    registerRequestPending: true,
    registerRequestFailed: true,
    registerRequestError: 'error'
  }

  expect(authReducer(previousState, { type: LOGIN_REQUEST_SUCCESS })).toEqual(previousState);
});

test('should handle login request failed', () => {
  const error = 'error';
  const previousState = { ...initialState, loginRequestPending: true };
  const resultState = {
    ...initialState,
    loginRequestPending: false,
    loginRequestFailed: true,
    loginRequestError: error
  };

  expect(authReducer(previousState, { type: LOGIN_REQUEST_FAILED, error: error })).toEqual(resultState);
});

test('should handle refresh token request', () => {
  const resultState = { ...initialState, refreshTokenRequestPending: true };

  expect(authReducer(initialState, { type: REFRESH_TOKEN_REQUEST })).toEqual(resultState);
});

test('should handle refresh token request success', () => {
  const previousState = {
    ...initialState,
    refreshTokenRequestPending: true,
    refreshTokenRequestFailed: true,
    refreshTokenRequestError: 'error'
  };

  expect(authReducer(previousState, { type: REFRESH_TOKEN_REQUEST_SUCCESS })).toEqual(initialState);
});

test('should handle refresh token request failed', () => {
  const error = 'error';
  const previousState = { ...initialState, refreshTokenRequestPending: true };
  const resultState = {
    ...initialState,
    refreshTokenRequestPending: false,
    refreshTokenRequestFailed: true,
    refreshTokenRequestError: error
  };

  expect(authReducer(previousState, { type: REFRESH_TOKEN_REQUEST_FAILED, error: error })).toEqual(resultState);
});

test('should handle logout request', () => {
  const resultState = { ...initialState, logoutRequestPending: true };

  expect(authReducer(initialState, { type: LOGOUT_REQUEST })).toEqual(resultState);
});

test('should handle logout request success', () => {
  const previousState = {
    ...initialState,
    logoutRequestPending: true,
    logoutRequestFailed: true,
    logoutRequestError: 'error'
  };

  expect(authReducer(previousState, { type: LOGOUT_REQUEST_SUCCESS })).toEqual(initialState);
});

test('should handle logout request failed', () => {
  const error = 'error';
  const previousState = { ...initialState, logoutRequestPending: true };
  const resultState = {
    ...initialState,
    logoutRequestPending: false,
    logoutRequestFailed: true,
    logoutRequestError: error
  };

  expect(authReducer(previousState, { type: LOGOUT_REQUEST_FAILED, error: error })).toEqual(resultState);
});