import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
} from "../actions/AuthActions";

const initialState = {
  registerRequestPending: false,
  registerRequestFailed: false,
  registerRequestError: "",

  loginRequestPending: false,
  loginRequestFailed: false,
  loginRequestError: "",
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
    default: {
      return {
        ...state,
      };
    }
  }
};
