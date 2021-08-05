import {
  LOGIN_REQUEST_METHOD,
  LOGIN_REQUEST_URL,
  REGISTER_REQUEST_METHOD,
  REGISTER_REQUEST_URL,
  LOGOUT_REQUEST_URL,
  LOGOUT_REQUEST_METHOD,
  REFRESH_TOKEN_REQUEST_URL,
  REFRESH_TOKEN_REQUEST_METHOD,
} from "../../resources/Request";
import { fetchByAction } from "../Api";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST_FAILED = "LOGIN_REQUEST_FAILED";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_REQUEST_SUCCESS = "REGISTER_REQUEST_SUCCESS";
export const REGISTER_REQUEST_FAILED = "REGISTER_REQUEST_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_REQUEST_SUCCESS = "LOGOUT_REQUEST_SUCCESS";
export const LOGOUT_REQUEST_FAILED = "LOGOUT_REQUEST_FAILED";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_REQUEST_SUCCESS = "REFRESH_TOKEN_REQUEST_SUCCESS";
export const REFRESH_TOKEN_REQUEST_FAILED = "REFRESH_TOKEN_REQUEST_FAILED";

export const SET_TOKENS = "SET_TOKENS";

export function register(email, login, password) {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });

    const body = JSON.stringify({
      email: email,
      password: password,
      name: login,
    });
    const onSuccess = (json) => {
      dispatch({
        type: REGISTER_REQUEST_SUCCESS,
        accessToken: json.accessToken.replace('Bearer ',''),
        refreshToken: json.refreshToken,
      });
    };
    const onFailed = (error) => {
      dispatch({ type: REGISTER_REQUEST_FAILED, error: error });
    };

    fetchByAction(
      REGISTER_REQUEST_URL,
      REGISTER_REQUEST_METHOD,
      onSuccess,
      onFailed,
      body
    );
  };
}

export function login(email, password) {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });

    const body = JSON.stringify({
      email: email,
      password: password,
    });
    const onSuccess = (json) => {
      dispatch({
        type: LOGIN_REQUEST_SUCCESS,
        accessToken: json.accessToken.replace('Bearer ',''),
        refreshToken: json.refreshToken,
      });
    };
    const onFailed = (error) => {
      dispatch({ type: LOGIN_REQUEST_FAILED, error: error });
    };

    fetchByAction(
      LOGIN_REQUEST_URL,
      LOGIN_REQUEST_METHOD,
      onSuccess,
      onFailed,
      body
    );
  };
}

export function refreshToken() {
  return function (dispatch) {
    dispatch({ type: REFRESH_TOKEN_REQUEST });
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken === null) {
      dispatch({ type: REFRESH_TOKEN_REQUEST_FAILED, error: 'Не найден refresh token' });
      return;
    }

    const body = JSON.stringify({
      token: refreshToken,
    });
    const onSuccess = (json) => {
      dispatch({ type: REFRESH_TOKEN_REQUEST_SUCCESS, 
        accessToken: json.accessToken.replace('Bearer ',''), 
        refreshToken: json.refreshToken });
    };
    const onFailed = (error) => {
      dispatch({ type: REFRESH_TOKEN_REQUEST_FAILED, error: error });
    };

    fetchByAction(
      REFRESH_TOKEN_REQUEST_URL,
      REFRESH_TOKEN_REQUEST_METHOD,
      onSuccess,
      onFailed,
      body
    );
  };
}

export function logout() {
  return function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken === null) {
      console.log('is null');
      dispatch({ type: LOGOUT_REQUEST_FAILED, error: 'Не найден refresh token' });
      return;
    }

    const body = JSON.stringify({
      token: refreshToken,
    });
    const onSuccess = (json) => {
      dispatch({ type: LOGOUT_REQUEST_SUCCESS });
    };
    const onFailed = (error) => {
      dispatch({ type: LOGOUT_REQUEST_FAILED, error: error });
    };

    fetchByAction(
      LOGOUT_REQUEST_URL,
      LOGOUT_REQUEST_METHOD,
      onSuccess,
      onFailed,
      body
    );
  };
}