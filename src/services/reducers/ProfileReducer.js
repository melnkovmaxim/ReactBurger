import {
  USER_INFO_REQUEST,
  USER_INFO_REQUEST_SUCCESS,
  USER_INFO_REQUEST_FAILED,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_REQUEST_SUCCESS,
  UPDATE_USER_INFO_REQUEST_FAILED,
} from "../actions/ProfileActions";

const initialState = {
  user: {},

  userInfoRequestPending: false,
  userInfoRequestFailed: false,
  userInfoRequestError: "",

  updateUserInfoRequestPending: false,
  updateUserInfoRequestFailed: false,
  updateUserInfoRequestError: "",
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
        user: action.user,
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
    default: {
      return {
        ...state,
      };
    }
  }
};
