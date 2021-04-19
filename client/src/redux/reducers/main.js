import { combineReducers } from 'redux';
import openDrawerReducer from './openDrawerReducer';
import { storeUserInfoReducer, storeUserReducer, createUserReducer, deleteUserReducer } from './storeUserInfoReducer';
import { pinChartReducer } from './chartReducers';

const rootReducer = combineReducers({
    deletedUser: deleteUserReducer,
    createdUser: createUserReducer,
    userInfo: storeUserReducer,
    storeUserInfoReducer,
    openDrawerReducer,
    chart: pinChartReducer,
});

export default rootReducer;
