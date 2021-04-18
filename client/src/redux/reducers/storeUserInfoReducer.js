import {
    GET_USER_FAILED,
    GET_USER_FETCHING,
    GET_USER_SUCCESS,
    USER_STORE_REQUEST,
    USER_STORE_SUCCESS,
    USER_STORE_FAILURE,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAILURE,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILURE,
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

const storeUserReducer = (state = {email: null, isAdmin: null, token: null}, action) => {
    switch(action.type) {
        case USER_STORE_REQUEST:
            return {
                ...state
            }
        case USER_STORE_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case USER_STORE_FAILURE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

const createUserReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_CREATE_REQUEST:
            return {loading: true};
        case USER_CREATE_SUCCESS:
            return {loading: false, message: "success", error: false};
        case USER_CREATE_FAILURE:
            return {loading: true, message: "fail", error: true}
        default:
            return state;
        }
    }
    
    const deleteUserReducer = (state = {}, action) => {
        switch(action.type) {
            case USER_DELETE_REQUEST:
                return {loading: true};
            case USER_DELETE_SUCCESS:
                return {loading: false, message: "success", error: false};
            case USER_DELETE_FAILURE:
                return {loading: true, message: "fail", error: true}
            default:
                return state;
    }
}

export {storeUserInfoReducer, storeUserReducer, createUserReducer, deleteUserReducer};