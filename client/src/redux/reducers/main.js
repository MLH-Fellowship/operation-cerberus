import { combineReducers } from 'redux';
import openDrawerReducer from './openDrawerReducer';
import { storeUserInfoReducer, storeUserReducer} from './storeUserInfoReducer';
import { pinChartReducer } from './chartReducers';

const rootReducer = combineReducers({
    userInfo: storeUserReducer,
  storeUserInfoReducer,
  openDrawerReducer,
  chart: pinChartReducer,
});

export default rootReducer;
