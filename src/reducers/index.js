'use strict';

import { combineReducers } from 'redux';

import appData from './app.reducer';
import homeData from './home.reducer';

export default combineReducers({
    appData,
    homeData
});