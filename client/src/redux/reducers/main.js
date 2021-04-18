import { combineReducers } from 'redux';
import openDrawerReducer from './openDrawerReducer';
import { storeUserInfoReducer, storeUserReducer, createUserReducer} from './storeUserInfoReducer';
import { pinChartReducer } from './chartReducers';

const rootReducer = combineReducers({
    createdUser: createUserReducer,
    userInfo: storeUserReducer,
  storeUserInfoReducer,
  openDrawerReducer,
  chart: pinChartReducer,
});

export default rootReducer;
