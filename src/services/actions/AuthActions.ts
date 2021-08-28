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
import { removeAccessToken, setAccessToken } from "../../utils/Cookie";
import { removeRefreshToken, setRefreshToken } from "../../utils/LocalStorage";
import { fetchByAction } from "../Api";
import { IAuthResponse } from "../../interfaces/api/IAuthResponse";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_REQUEST_SUCCESS: "LOGIN_REQUEST_SUCCESS" = "LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST_FAILED: "LOGIN_REQUEST_FAILED" = "LOGIN_REQUEST_FAILED";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_REQUEST_SUCCESS: "REGISTER_REQUEST_SUCCESS" = "REGISTER_REQUEST_SUCCESS";
export const REGISTER_REQUEST_FAILED: "REGISTER_REQUEST_FAILED" = "REGISTER_REQUEST_FAILED";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_REQUEST_SUCCESS: "LOGOUT_REQUEST_SUCCESS" = "LOGOUT_REQUEST_SUCCESS";
export const LOGOUT_REQUEST_FAILED: "LOGOUT_REQUEST_FAILED" = "LOGOUT_REQUEST_FAILED";

export const REFRESH_TOKEN_REQUEST: "REFRESH_TOKEN_REQUEST" = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_REQUEST_SUCCESS: "REFRESH_TOKEN_REQUEST_SUCCESS" = "REFRESH_TOKEN_REQUEST_SUCCESS";
export const REFRESH_TOKEN_REQUEST_FAILED: "REFRESH_TOKEN_REQUEST_FAILED" = "REFRESH_TOKEN_REQUEST_FAILED";

export function register(email: string, login: string, password: string) {
  return function (dispatch: (arg: any) => void) {
    dispatch({ type: REGISTER_REQUEST });

    const body = JSON.stringify({
      email: email,
      password: password,
      name: login,
    });
    const onSuccess = (response: IAuthResponse) => {
      setAccessToken(response.accessToken.replace('Bearer ', ''));
      setRefreshToken(response.refreshToken);
      dispatch({
        type: REGISTER_REQUEST_SUCCESS,
      });
    };
    const onFailed = (error: string) => {
      dispatch({ type: REGISTER_REQUEST_FAILED, error: error });
    };

    fetchByAction<IAuthResponse>(
      REGISTER_REQUEST_URL,
      REGISTER_REQUEST_METHOD,
      onSuccess,
      onFailed,
      body
    );
  };
}

export function login(email: string, password: string) {
  return function (dispatch: (arg: any) => void) {
    dispatch({ type: REGISTER_REQUEST });

    const body = JSON.stringify({
      email: email,
      password: password,
    });
    const onSuccess = (response: IAuthResponse) => {
      setAccessToken(response.accessToken.replace('Bearer ', ''));
      setRefreshToken(response.refreshToken);
      dispatch({
        type: LOGIN_REQUEST_SUCCESS,
      });
    };
    const onFailed = (error: string) => {
      dispatch({ type: LOGIN_REQUEST_FAILED, error: error });
    };

    fetchByAction<IAuthResponse>(
      LOGIN_REQUEST_URL,
      LOGIN_REQUEST_METHOD,
      onSuccess,
      onFailed,
      body
    );
  };
}

export function refreshToken(refreshToken: string) {
  return function (dispatch: (arg: any) => void) {
    dispatch({ type: REFRESH_TOKEN_REQUEST });

    const body: string = JSON.stringify({
      token: refreshToken,
    });
    const onSuccess = (response: IAuthResponse) => {
      setAccessToken(response.accessToken.replace('Bearer ', ''));
      setRefreshToken(response.refreshToken);
      dispatch({ type: REFRESH_TOKEN_REQUEST_SUCCESS });
    };
    const onFailed = (error: string) => {
      removeAccessToken();
      removeRefreshToken();
      dispatch({ type: REFRESH_TOKEN_REQUEST_FAILED, error: error });
    };

    fetchByAction<IAuthResponse>(
      REFRESH_TOKEN_REQUEST_URL,
      REFRESH_TOKEN_REQUEST_METHOD,
      onSuccess,
      onFailed,
      body
    );
  };
}

export function logout(refreshToken: string | null) {
  return function (dispatch: (arg: any) => void) {
    dispatch({ type: LOGOUT_REQUEST });
    removeAccessToken();
    removeRefreshToken();

    const body = JSON.stringify({
      token: refreshToken,
    });
    const onSuccess = (response: any) => {
      dispatch({ type: LOGOUT_REQUEST_SUCCESS });
    };
    const onFailed = (error: string) => {
      dispatch({ type: LOGOUT_REQUEST_FAILED, error: error });
    };

    fetchByAction<any>(
      LOGOUT_REQUEST_URL,
      LOGOUT_REQUEST_METHOD,
      onSuccess,
      onFailed,
      body
    );
  };
}