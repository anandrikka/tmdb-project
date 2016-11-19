'use strict';

import * as AppActionConstants from '../constants/app.constants';

/* jshint unused:false*/ 
let defaultState = {
    translations: {
        list: [],
        successful: false
    },
    movieGenres: {
        list: [],
        successful: false
    },
    tvGenres: {
        list: [],
        successful: false
    }
};

function loadMovies(state=defaultState, action) {
    switch(action.type) {
        case AppActionConstants.TIME_ZONES:
            return state;
        case AppActionConstants.MOVIE_GENRES:
            return state;
        default:
            return state;
    }
}

export default loadMovies;