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
        // localStorage.setItem(
        //     'payload',
        //     JSON.stringify({
        //         payload: action.payload
        //     })
        // );
        // localStorage.setItem(
        //     'user',
        //     JSON.stringify({
        //       email: email,
        //       // password: password,
        //       token: res.data.auth_token,
        //     })
        // );
      console.log(action.payload, 'REDUCER');
      return {
        ...state,
        ...action.payload,
        currUserFetching: true,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        ...action.payload,
        currUserFetching: false,
      };
    default:
      return state;
  }
};

export default storeUserInfoReducer;