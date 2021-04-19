import {
    GET_USER_FETCHING,
    GET_USER_FAILED,
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
import axios from 'axios';
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

const createUserCreator = (email, password, isAdmin) => async (dispatch) => {
    try {
        dispatch({
            type: USER_CREATE_REQUEST,
        });
        // console.log('hello');
        const { data } = await axios.post("http://localhost:5000/auth/register", {email, password, isAdmin}, {headers: {"Content-Type": "application/json"}});
        dispatch({
            type: USER_CREATE_SUCCESS,
            payload: data
        });
    } catch(err) {
        dispatch({
            type: USER_CREATE_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

const deleteUser = (token, userID) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        });
        
        const headers = {
            "Authorization": `Bearer ${token}`,
        }

        // const { data } = await axios.get(`http://localhost:5000/auth/delete/${userID}`, {headers});
        // const { data } = await axios.get(`http://localhost:5000/auth/delete/${userID}`, {headers: {Authorization: `Bearer ${token}`}});
        const { data } = await axios.delete(`http://localhost:5000/auth/delete/${userID}`, {headers});
        // const { data } = await axios.delete(`http://localhost:5000/auth/delete/${userID}`, {headers: {Authorization: `Bearer ${token}`}, crossdomain: true,});
        // const { data } = await axios.delete(`http://localhost:5000/auth/delete${userID}`, {userID}, {headers: headers});
        
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        });
    } catch(err) {
        dispatch({
            type: USER_DELETE_FAILURE,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export { storeUserInfoAction, createUserCreator, deleteUser };