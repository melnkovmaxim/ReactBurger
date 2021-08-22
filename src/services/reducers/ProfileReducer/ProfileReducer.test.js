import { profileReducer } from "./ProfileReducer";
import {
  CONFIRM_RESET_PASSWORD_REQUEST, CONFIRM_RESET_PASSWORD_REQUEST_SUCCESS, CONFIRM_RESET_PASSWORD_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST_FAILED, RESET_PASSWORD_REQUEST_SUCCESS,
  UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_REQUEST_FAILED, UPDATE_USER_INFO_REQUEST_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_REQUEST_FAILED,
  USER_INFO_REQUEST_SUCCESS
} from "../../actions/ProfileActions";

const initialState = {
  user: {},
  isSuccessResetPassword: false,

  userInfoRequestPending: false,
  userInfoRequestFailed: false,
  userInfoRequestError: "",

  updateUserInfoRequestPending: false,
  updateUserInfoRequestFailed: false,
  updateUserInfoRequestError: "",

  resetPasswordRequestPending: false,
  resetPasswordRequestFailed: false,
  resetPasswordRequestError: "",

  confirmResetPasswordRequestPending: false,
  confirmResetPasswordRequestFailed: false,
  confirmResetPasswordRequestError: "",
};

test('should return the initial state profile reducer', () => {
  expect(profileReducer(undefined, {})).toEqual(initialState);
});

test('should handle user info request', () => {
  const resultState = { ...initialState, userInfoRequestPending: true };

  expect(profileReducer(initialState, { type: USER_INFO_REQUEST })).toEqual(resultState);
});

test('should handle user info request success', () => {
  const userName = 'user';
  const email = 'user@gmail.com';
  const previousState = {
    ...initialState,
    userInfoRequestPending: true,
    userInfoRequestFailed: true,
    userInfoRequestError: 'error'
  };
  const resultState = { ...initialState, user: { name: userName, email: email } };

  expect(profileReducer(previousState, {
    type: USER_INFO_REQUEST_SUCCESS,
    name: userName,
    email: email
  })).toEqual(resultState);
});

test('should handle user info request failed', () => {
  const user = { name: 'user', email: 'user@gmail.com' };
  const error = 'error';
  const previousState = { ...initialState, userInfoRequestPending: true, user: user };
  const resultState = { ...initialState, user: {}, userInfoRequestFailed: true, userInfoRequestError: error };

  expect(profileReducer(previousState, { type: USER_INFO_REQUEST_FAILED, error: error })).toEqual(resultState);
});

test('should handle update user info request', () => {
  const resultState = { ...initialState, updateUserInfoRequestPending: true };

  expect(profileReducer(initialState, { type: UPDATE_USER_INFO_REQUEST })).toEqual(resultState);
});

test('should handle update user info request success', () => {
  const previousState = {
    ...initialState,
    updateUserInfoRequestPending: true,
    updateUserInfoRequestFailed: true,
    updateUserInfoRequestError: 'error'
  };

  expect(profileReducer(previousState, { type: UPDATE_USER_INFO_REQUEST_SUCCESS })).toEqual(initialState);
});

test('should handle update user info request failed', () => {
  const error = 'error'
  const previousState = { ...initialState, updateUserInfoRequestPending: true };
  const resultState = { ...initialState, updateUserInfoRequestFailed: true, updateUserInfoRequestError: error };

  expect(profileReducer(previousState, { type: UPDATE_USER_INFO_REQUEST_FAILED, error: error })).toEqual(resultState);
});

test('should handle reset password request', () => {
  const resultState = { ...initialState, resetPasswordRequestPending: true };

  expect(profileReducer(initialState, { type: RESET_PASSWORD_REQUEST })).toEqual(resultState);
});

test('should handle reset password request success', () => {
  const previousState = {
    ...initialState,
    resetPasswordRequestPending: true,
    resetPasswordRequestFailed: true,
    resetPasswordRequestError: 'error',
    confirmResetPasswordRequestFailed: true,
    confirmResetPasswordRequestError: 'error'
  }
  const resultState = { ...initialState, isSendedResetPasswordEmail: true };

  expect(profileReducer(previousState, { type: RESET_PASSWORD_REQUEST_SUCCESS })).toEqual(resultState);
});

test('should handle reset password request failed', () => {
  const error = 'error';
  const previousState = { ...initialState, resetPasswordRequestPending: true };
  const resultState = { ...initialState, resetPasswordRequestFailed: true, resetPasswordRequestError: error };

  expect(profileReducer(previousState, { type: RESET_PASSWORD_REQUEST_FAILED, error: error })).toEqual(resultState);
});

test('should handle confirm reset password request', () => {
  const resultState = { ...initialState, confirmResetPasswordRequestPending: true };

  expect(profileReducer(initialState, { type: CONFIRM_RESET_PASSWORD_REQUEST })).toEqual(resultState);
});

test('should handle confirm reset password request success', () => {
  const previousState = {
    ...initialState,
    confirmResetPasswordRequestPending: true,
    confirmResetPasswordRequestFailed: true,
    confirmResetPasswordRequestError: 'error'
  };
  const resultState = { ...initialState, isSendedConfirmResetPasswordEmail: true, isSuccessResetPassword: true };

  expect(profileReducer(previousState, { type: CONFIRM_RESET_PASSWORD_REQUEST_SUCCESS })).toEqual(resultState);
});

test('should handle confirm reset password request failed', () => {
  const error = 'error';
  const previousState = { ...initialState, confirmResetPasswordRequestPending: true };
  const resultState = {
    ...initialState,
    confirmResetPasswordRequestFailed: true,
    confirmResetPasswordRequestError: error
  };

  expect(profileReducer(previousState, { type: CONFIRM_RESET_PASSWORD_REQUEST_FAILED, error: error })).toEqual(resultState);
});