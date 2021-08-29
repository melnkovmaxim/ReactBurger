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
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_REQUEST_SUCCESS,
  REFRESH_TOKEN_REQUEST_FAILED,
} from "../../actions/AuthActions";
import { IAuthReducerState } from '../../../interfaces/services/reducers/AuthReducer/IAuthReducerState';
import {IAuthReducerAction} from "../../../interfaces/services/reducers/AuthReducer/IAuthReducerAction";

const initialState: IAuthReducerState = {
  registerRequestPending: false,
  registerRequestFailed: false,
  registerRequestError: '',

  loginRequestPending: false,
  loginRequestFailed: false,
  loginRequestError: '',

  logoutRequestPending: false,
  logoutRequestFailed: false,
  logoutRequestError: '',

  refreshTokenRequestPending: false,
  refreshTokenRequestFailed: false,
  refreshTokenRequestError: '',
};

export const authReducer = (state: IAuthReducerState = initialState, action: IAuthReducerAction): IAuthReducerState => {
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
        registerRequestError: action.error ?? '',
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
        loginRequestError: action.error ?? '',
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequestPending: true,
        refreshTokenRequestFailed: false,
      }
    }
    case REFRESH_TOKEN_REQUEST_SUCCESS: {
      return {
        ...state,
        refreshTokenRequestPending: false,
        refreshTokenRequestFailed: false,
        refreshTokenRequestError: '',
      }
    }
    case REFRESH_TOKEN_REQUEST_FAILED: {
      return {
        ...state,
        refreshTokenRequestPending: false,
        refreshTokenRequestFailed: true,
        refreshTokenRequestError: action.error ?? '',
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequestPending: true,
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
        logoutRequestError: action.error ?? '',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
