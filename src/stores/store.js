'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

let defaultState = {};

export default createStore(
    rootReducer,
    defaultState,
    applyMiddleware(thunkMiddleware, loggerMiddleware));