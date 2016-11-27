'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger({
    collapsed: true,
    diff: true
});

let defaultState = {};

// function sampleMiddileware({getState}) {
//     return (next) => (action) => {
//         console.log(getState);
//         return next(action);
//     }
// }

export default createStore(
    rootReducer,
    defaultState,
    applyMiddleware(thunkMiddleware, loggerMiddleware));