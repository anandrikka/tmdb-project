'use strict';

import * as AppConstants from '../constants/app.constants';

/* jshint unused:false*/ 
let defaultState = {};

function loadMovies(state=defaultState, action) {
    switch(action.type) {
        case AppConstants.LATEST_MOVIES:
            console.log(action);
            return {};
        default:
            return state;
    }
}

export default loadMovies;