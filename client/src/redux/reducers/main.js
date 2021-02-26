import { combineReducers } from 'redux';
import openDrawerReducer from './openDrawerReducer';
import storeUserInfoReducer from './storeUserInfoReducer';

const rootReducer = combineReducers({
  storeUserInfoReducer,
  openDrawerReducer,
});

export default rootReducer;
