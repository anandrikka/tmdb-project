import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

const loggerMiddleware = createLogger({ // eslint-disable-line
    collapsed: true,
    diff: true
});

const defaultState = {};

export default createStore(
    rootReducer,
    defaultState,
    // applyMiddleware(thunkMiddleware, loggerMiddleware)
    applyMiddleware(thunkMiddleware)
);
