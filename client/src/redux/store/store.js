import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from '../reducers/main.js';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
