'use strict';

import { combineReducers } from 'redux';

import appContainer from './app.reducer';
import home from './home.reducer';

export default combineReducers({
    appContainer,
    home
});