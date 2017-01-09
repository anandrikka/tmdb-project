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
            list => list.concat(action.nowPlaying.results)); // eslint-disable-line
        modifiedState = modifiedState.mergeDeep({
            nowPlaying: {
                page: action.nowPlaying.page,
                totalPages: action.nowPlaying.total_pages
            }
        });
        return modifiedState.toJS();
    case ActionConstants.FETCH_UPCOMING_MOVIES:
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['upcoming', 'list'],
            list => list.concat(action.upcoming.results)); // eslint-disable-line
        return modifiedState.toJS();
    case ActionConstants.FETCH_TV_AIRING_TODAY:
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['tvAiringToday', 'list'],
            list => list.concat(action.tvAiringToday.results)); // eslint-disable-line
        modifiedState = modifiedState.mergeDeep({
            tvAiringToday: {
                page: action.tvAiringToday.page,
                totalPages: action.tvAiringToday.total_pages
            }
        });
        return modifiedState.toJS();
    default:
        return state;
    }
};

export default homeReducer;
