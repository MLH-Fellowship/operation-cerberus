import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from '../reducers/main.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose;
// const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

export default store;
