import {
  GET_USER_FETCHING,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
} from '../types/types';
import { getUserInfo } from '../../api/index';

const storeUserInfoAction = (email, password) => (dispatch) => {
  dispatch({
    type: GET_USER_FETCHING,
  });

  getUserInfo(email, password)
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

export { storeUserInfoAction };
