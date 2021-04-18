import {
  GET_USER_FETCHING,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  USER_STORE_REQUEST,
    USER_STORE_SUCCESS,
    USER_STORE_FAILURE,
} from '../types/types';
import { authenticateUser } from '../../api/index';

const storeUserInfoAction = (email, password) => (dispatch) => {
  dispatch({
    type: GET_USER_FETCHING,
  });

  authenticateUser(email, password)
    .then((res) => {
      console.log(res, 'ACTION');
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_FAILED,
        payload: err,
      });
    });
};

const storeUserInfo = (email, isAdmin, token) => (dispatch) => {
    dispatch({
        type: USER_STORE_REQUEST,
        payload: {
            email,
            isAdmin,
            token
        }
    });
}

export { storeUserInfoAction };
