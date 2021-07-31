import {
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
} from "../actions/ProfileActions";

const initialState = {
  username: "",
  email: "",
  token: "",
  registerRequestPending: false,
  registerRequestFailed: false,
  registerRequestError: "",
  loginRequestPending: false,
  loginRequestFailed: false,
  loginRequestError: "",
};

export const orderReducer = (state = initialState, action) => {
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
        username: action.name,
        email: action.email,
      };
    }
    case REGISTER_REQUEST_FAILED: {
      return {
        ...state,
        registerRequestPending: false,
        registerRequestFailed: true,
        username: "",
        email: "",
        token: "",
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
        username: action.name,
        email: action.email,
      };
    }
    case LOGIN_REQUEST_FAILED: {
      return {
        ...state,
        loginRequestPending: false,
        loginRequestFailed: true,
        username: "",
        email: "",
        token: "",
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
