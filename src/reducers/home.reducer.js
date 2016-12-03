'use strict';

import * as ActionConstants from '../actions/action.constants';
import Immutable from 'immutable';

let defaultState = {
    nowPlaying: {
        list: [],
        error: false
    },
    tvAiringToday: {
        list: [],
        error: false
    }
};

let homeReducer = (state = defaultState, action) => {
    let modifiedState;
    switch (action.type) {
        case ActionConstants.FETCH_NOW_PLAYING_MOVIES:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['nowPlaying', 'list'],
                list => action.nowPlaying.results);
            return modifiedState.toJS();
        case ActionConstants.FETCH_TV_AIRING_TODAY:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['tvAiringToday', 'list'],
                list => action.tvAiringToday.results);
            return modifiedState.toJS();
        case ActionConstants.FETCH_NOW_PLAYING_MOVIES_FAILURE:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['nowPlaying', 'error'], error => action.status);
            return modifiedState.toJS();
        case ActionConstants.FETCH_TV_AIRING_TODAY_FAILURE:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['tvAiringToday', 'error'], error => action.status);
            return modifiedState.toJS();
        default:
            return state;
    }
};

export default homeReducer;