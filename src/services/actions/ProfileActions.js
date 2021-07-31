import {
  USER_INFO_REQUEST_METHOD,
  USER_INFO_REQUEST_URL,
  REGISTER_REQUEST_METHOD,
  REGISTER_REQUEST_URL,
} from "../../resources/Request";
import { fetchByAction } from "../utils/Fetch";

export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_REQUEST_SUCCESS = "USER_INFO_REQUEST_SUCCESS";
export const USER_INFO_REQUEST_FAILED = "USER_INFO_REQUEST_FAILED";

export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_REQUEST_SUCCESS =
  "UPDATE_USER_INFO_REQUEST_SUCCESS";
export const UPDATE_USER_INFO_REQUEST_FAILED =
  "UPDATE_USER_INFO_REQUEST_FAILED";

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
  
  export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST_REQUEST";
  export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";
  export const RESET_PASSWORD_REQUEST_FAILED = "RESET_PASSWORD_REQUEST_FAILED";
  
  export const CONFIRM_RESET_PASSWORD_REQUEST =
    "CONFIRM_RESET_PASSWORD_REQUEST_REQUEST";
  export const CONFIRM_RESET_PASSWORD_REQUEST_SUCCESS =
    "CONFIRM_RESET_PASSWORD_REQUEST_SUCCESS";
  export const CONFIRM_RESET_PASSWORD_REQUEST_FAILED =
    "CONFIRM_RESET_PASSWORD_REQUEST_FAILED";

export function getUserInfo(token) {
  return function (dispatch) {
    dispatch({ type: USER_INFO_REQUEST });

    const onSuccess = (json) => {
      dispatch({ type: USER_INFO_REQUEST_SUCCESS });
    };
    const onFailed = (error) => {
      dispatch({ type: USER_INFO_REQUEST_FAILED, error: error });
    };

    fetchByAction(
      USER_INFO_REQUEST_URL,
      USER_INFO_REQUEST_METHOD,
      onSuccess,
      onFailed,
      null,
      token
    );
  };
}

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
        email: json.email,
        name: json.name,
        accessToken: json.accessToken,
        refreshToken: json.refreshToken,
      });
    };
    const onFailed = (error) => {
      dispatch({ type: REGISTER_REQUEST_SUCCESS, error: error });
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