'use strict';

import { combineReducers } from 'redux';

import appData from './app.reducer';
import homeData from './home.reducer';
import moviesData from './movies.reducer';
import tvData from './tv.reducer';
import peopleData from './people.reducer';

export default combineReducers({
    appData,
    homeData,
    moviesData,
    tvData,
    peopleData
});