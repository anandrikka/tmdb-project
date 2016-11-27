'use strict';

import Immutable from 'immutable';
import * as AppActionConstants from '../constants/app.constants';

/* jshint unused:false*/ 
let defaultState = {
    userInfo: {},
    translations: {
        list: [],
        successful: false
    },
    movieGenres: {},
    tvGenres: {},
    timezones: {
        list: [],
        successful:false
    }
};

function app(state = defaultState, action) {
    let modifiedState;
    switch(action.type) {
        case AppActionConstants.TIMEZONES:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['timezones', 'list'], list => action.timezones);
            modifiedState = modifiedState.updateIn(['timezones, successful'], successful => true);
            return modifiedState.toJS();
        case AppActionConstants.MOVIE_GENRES:
            let movieGenres = {};
            for(let genre of action.movieGenres) {
                movieGenres[genre.id] = genre;
            }
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.mergeDeep({
                movieGenres
            });
            return modifiedState.toJS();
        case AppActionConstants.TV_GENRES:
            let tvGenres = {};
            for (let genre of action.tvGenres) {
                tvGenres[genre.id] = genre;
            }
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.mergeDeep({
                tvGenres
            });
            return modifiedState.toJS();
        case AppActionConstants.USER_INFO:
            return state;
        default:
            return state;
    }
}

export default app;