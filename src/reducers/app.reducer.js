'use strict';

import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

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
        case ActionConstants.TIMEZONES:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['timezones', 'list'], list => action.timezones);
            modifiedState = modifiedState.updateIn(['timezones, successful'], successful => true);
            return modifiedState.toJS();
        case ActionConstants.MOVIE_GENRES:
            let movieGenres = {};
            for(let genre of action.movieGenres) {
                movieGenres[genre.id] = genre;
            }
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.mergeDeep({
                movieGenres
            });
            return modifiedState.toJS();
        case ActionConstants.TV_GENRES:
            let tvGenres = {};
            for (let genre of action.tvGenres) {
                tvGenres[genre.id] = genre;
            }
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.mergeDeep({
                tvGenres
            });
            return modifiedState.toJS();
        case ActionConstants.USER_INFO:
            return state;
        default:
            return state;
    }
}

export default app;