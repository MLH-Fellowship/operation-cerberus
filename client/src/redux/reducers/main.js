import { combineReducers } from 'redux';
import openDrawerReducer from './openDrawerReducer';
import storeUserInfoReducer from './storeUserInfoReducer';
import { pinChartReducer } from './chartReducers';

const rootReducer = combineReducers({
  storeUserInfoReducer,
  openDrawerReducer,
  chart: pinChartReducer,
});

export default rootReducer;
