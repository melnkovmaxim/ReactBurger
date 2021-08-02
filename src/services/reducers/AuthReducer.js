import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_FAILED,
} from "../actions/AuthActions";

const initialState = {
  accessToken: '',
  refreshToken: '',

  registerRequestPending: false,
  registerRequestFailed: false,
  registerRequestError: "",

  loginRequestPending: false,
  loginRequestFailed: false,
  loginRequestError: "",

  logoutRequestPending: false,
  logoutRequestFailed: false,
  logoutRequestError: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequestPending: true,
      };
    }
    case REGISTER_REQUEST_SUCCESS: {
      return {
        ...state,
        registerRequestPending: false,
        registerRequestFailed: false,
        registerRequestError: '',
      };
    }
    case REGISTER_REQUEST_FAILED: {
      return {
        ...state,
        registerRequestPending: false,
        registerRequestFailed: true,
        registerRequestError: action.error,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequestPending: true,
      };
    }
    case LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        loginRequestPending: false,
        loginRequestFailed: false,
        loginRequestError: '',
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
    }
    case LOGIN_REQUEST_FAILED: {
      return {
        ...state,
        loginRequestPending: false,
        loginRequestFailed: true,
        loginRequestError: action.error,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequestPending: true,
        accessToken: '',
        refreshToken: ''
      };
    }
    case LOGOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        logoutRequestPending: false,
        logoutRequestFailed: false,
        logoutRequestError: '',
      };
    }
    case LOGOUT_REQUEST_FAILED: {
      return {
        ...state,
        logoutRequestPending: false,
        logoutRequestFailed: true,
        logoutRequestError: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
