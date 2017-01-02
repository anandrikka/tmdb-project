import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    nowPlaying: {
        list: []
    },
    tvAiringToday: {
        list: []
    },
    upcoming: {
        list: []
    }
};

const homeReducer = (state = defaultState, action) => {
    let modifiedState;
    switch (action.type) {
    case ActionConstants.FETCH_NOW_PLAYING_MOVIES:
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['nowPlaying', 'list'],
            list => action.nowPlaying.results); // eslint-disable-line
        return modifiedState.toJS();
    case ActionConstants.FETCH_UPCOMING_MOVIES:
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['upcoming', 'list'],
            list => action.upcoming.results); // eslint-disable-line
        return modifiedState.toJS();
    case ActionConstants.FETCH_TV_AIRING_TODAY:
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['tvAiringToday', 'list'],
            list => action.tvAiringToday.results); // eslint-disable-line
        return modifiedState.toJS();
    default:
        return state;
    }
};

export default homeReducer;
