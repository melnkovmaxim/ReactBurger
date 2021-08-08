import {
  USER_INFO_REQUEST,
  USER_INFO_REQUEST_SUCCESS,
  USER_INFO_REQUEST_FAILED,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_REQUEST_SUCCESS,
  UPDATE_USER_INFO_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILED,
  CONFIRM_RESET_PASSWORD_REQUEST,
  CONFIRM_RESET_PASSWORD_REQUEST_SUCCESS,
  CONFIRM_RESET_PASSWORD_REQUEST_FAILED,
} from "../actions/ProfileActions";

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

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST: {
      return {
        ...state,
        userInfoRequestPending: true,
      };
    }
    case USER_INFO_REQUEST_SUCCESS: {
      return {
        ...state,
        userInfoRequestPending: false,
        userInfoRequestFailed: false,
        userInfoRequestError: '',
        user: { name: action.name, email: action.email },
      };
    }
    case USER_INFO_REQUEST_FAILED: {
      return {
        ...state,
        userInfoRequestPending: false,
        userInfoRequestFailed: true,
        userInfoRequestError: action.error,
      };
    }
    case UPDATE_USER_INFO_REQUEST: {
        return {
            ...state,
            updateUserInfoRequestPending: true,
        }
    }
    case UPDATE_USER_INFO_REQUEST_SUCCESS: {
        return {
            ...state,
            updateUserInfoRequestPending: false,
            updateUserInfoRequestFailed: false,
            updateUserInfoRequestError: '',
        }
    }
    case UPDATE_USER_INFO_REQUEST_FAILED: {
        return {
            ...state,
            updateUserInfoRequestPending: false,
            updateUserInfoRequestFailed: true,
            updateUserInfoRequestError: action.error,
        }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequestPending: true,
        resetPasswordRequestFailed: false,
        resetPasswordRequestError: '',
        isSuccessResetPassword: false,
      }
    }
    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        isSendedResetPasswordEmail: true,
        resetPasswordRequestPending: false,
        resetPasswordRequestFailed: false,
        resetPasswordRequestError: '',
        confirmResetPasswordRequestFailed: false,
        confirmResetPasswordRequestError: '',
      }
    }
    case RESET_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        resetPasswordRequestPending: false,
        resetPasswordRequestFailed: true,
        resetPasswordRequestError: action.error,
      }
    }
    case CONFIRM_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        confirmResetPasswordRequestPending: true,
        confirmResetPasswordRequestFailed: false,
        confirmResetPasswordRequestError: '',
      }
    }
    case CONFIRM_RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        isSendedConfirmResetPasswordEmail: true,
        confirmResetPasswordRequestPending: false,
        confirmResetPasswordRequestFailed: false,
        confirmResetPasswordRequestError: '',
        isSuccessResetPassword: true,
      }
    }
    case CONFIRM_RESET_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        confirmResetPasswordRequestPending: false,
        confirmResetPasswordRequestFailed: true,
        confirmResetPasswordRequestError: action.error,
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
