import { fetchByAction } from "../Api";
import {
  USER_INFO_REQUEST_URL,
  USER_INFO_REQUEST_METHOD,
  UPDATE_USER_INFO_REQUEST_METHOD,
  UPDATE_USER_INFO_REQUEST_URL,
  RESET_PASSWORD_REQUEST_URL,
  RESET_PASSWORD_REQUEST_METHOD,
  CONFIRM_RESET_PASSWORD_REQUEST_URL,
  CONFIRM_RESET_PASSWORD_REQUEST_METHOD,
} from "../../resources/Request";
import { getAccessToken } from "../../utils/Cookie";

export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_REQUEST_SUCCESS = "USER_INFO_REQUEST_SUCCESS";
export const USER_INFO_REQUEST_FAILED = "USER_INFO_REQUEST_FAILED";

export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_REQUEST_SUCCESS =
  "UPDATE_USER_INFO_REQUEST_SUCCESS";
export const UPDATE_USER_INFO_REQUEST_FAILED =
  "UPDATE_USER_INFO_REQUEST_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST_REQUEST";
export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILED = "RESET_PASSWORD_REQUEST_FAILED";

export const CONFIRM_RESET_PASSWORD_REQUEST =
  "CONFIRM_RESET_PASSWORD_REQUEST_REQUEST";
export const CONFIRM_RESET_PASSWORD_REQUEST_SUCCESS =
  "CONFIRM_RESET_PASSWORD_REQUEST_SUCCESS";
export const CONFIRM_RESET_PASSWORD_REQUEST_FAILED =
  "CONFIRM_RESET_PASSWORD_REQUEST_FAILED";

export function getUserInfo(accessToken) {
  return function (dispatch) {
    dispatch({ type: USER_INFO_REQUEST });

    const onSuccess = (json) => {
      dispatch({ type: USER_INFO_REQUEST_SUCCESS, name: json.user.name, email: json.user.email });
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
      "Bearer " + accessToken
    );
  };
}

export function updateUserInfo(user) {
  return function (dispatch) {
    dispatch({ type: UPDATE_USER_INFO_REQUEST });

    const onSuccess = (json) => {
      dispatch({ type: UPDATE_USER_INFO_REQUEST_SUCCESS });
    };
    const onFailed = (error) => {
      dispatch({ type: UPDATE_USER_INFO_REQUEST_FAILED, error: error });
    };

    fetchByAction(
      UPDATE_USER_INFO_REQUEST_URL,
      UPDATE_USER_INFO_REQUEST_METHOD,
      onSuccess,
      onFailed,
      JSON.stringify(user),
      "Bearer " + getAccessToken()
    );
  };
}

export function resetPassword(email) {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const onSuccess = (json) => {
      dispatch({ type: RESET_PASSWORD_REQUEST_SUCCESS });
    };
    const onFailed = (error) => {
      dispatch({ type: RESET_PASSWORD_REQUEST_FAILED, error: error });
    };

    fetchByAction(
      RESET_PASSWORD_REQUEST_URL,
      RESET_PASSWORD_REQUEST_METHOD,
      onSuccess,
      onFailed,
      JSON.stringify({ email: email }),
    );
  };
}

export function confirmResetPassword(password, confirmToken) {
  return function (dispatch) {
    dispatch({ type: CONFIRM_RESET_PASSWORD_REQUEST });

    const onSuccess = (json) => {
      dispatch({ type: CONFIRM_RESET_PASSWORD_REQUEST_SUCCESS });
    };
    const onFailed = (error) => {
      dispatch({ type: CONFIRM_RESET_PASSWORD_REQUEST_FAILED, error: error });
    };

    fetchByAction(
      CONFIRM_RESET_PASSWORD_REQUEST_URL,
      CONFIRM_RESET_PASSWORD_REQUEST_METHOD,
      onSuccess,
      onFailed,
      JSON.stringify({ password: password, token: confirmToken })
    );
  };
}