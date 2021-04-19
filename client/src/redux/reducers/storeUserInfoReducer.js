import {
  GET_USER_FAILED,
  GET_USER_FETCHING,
  GET_USER_SUCCESS,
} from '../types/types';

const initialState = {
  currUserFetching: false,
  auth_token: null,
};

const storeUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FETCHING:
      return {
        ...state,
        currUserFetching: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        currUserFetching: false,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        ...action.payload,
        currUserFetching: false,
        auth_token: action.payload.auth_token,
      };
    default:
      return state;
  }
};

export default storeUserInfoReducer;
