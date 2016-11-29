'use strict';

import * as HomeActionConstants from '../constants/home.constants';
import Immutable from 'immutable';

let defaultState = {
    nowPlaying: {
        list: [],
        error: false
    },
    tvAiringToday: {
        list: [],
        error: false
    },
    upcomingMovies: {
        list: [],
        error: false
    }
};

let homeReducer = (state = defaultState, action) => {
    let modifiedState;
    switch (action.type) {
        case HomeActionConstants.FETCH_NOW_PLAYING_MOVIES:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['nowPlaying', 'list'],
                list => action.nowPlaying.results);
            modifiedState = modifiedState.mergeDeep({
                nowPlaying: {
                    totalMoviePages: action.nowPlaying.total_pages,
                    moviePage: action.nowPlaying.page,
                    totalResults: action.nowPlaying.total_results
                }
            });
            return modifiedState.toJS();
        case HomeActionConstants.FETCH_TV_AIRING_TODAY:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['tvAiringToday', 'list'],
                list => action.tvAiringToday.results);
            modifiedState = modifiedState.mergeDeep({
                tvAiringToday: {
                    totalTvAiringPages: action.tvAiringToday.total_pages,
                    airingPage: action.tvAiringToday.page,
                    totalResults: action.tvAiringToday.total_results
                }
            });
            return modifiedState.toJS();
        case HomeActionConstants.FETCH_UPCOMING_MOVIES:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['upcomingMovies', 'list'],
                list => action.upcomingMovies.results)
            modifiedState = modifiedState.mergeDeep({
                upcomingMovies: {
                    totalUpComingPages: action.upcomingMovies.total_pages,
                    upComingPage: action.upcomingMovies.page,
                    totalResults: action.upcomingMovies.total_results
                }
            });
            return modifiedState.toJS();
        case HomeActionConstants.FETCH_NOW_PLAYING_MOVIES_FAILURE:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['nowPlaying', 'error'], error => action.status);
            return modifiedState.toJS();
        case HomeActionConstants.FETCH_TV_AIRING_TODAY_FAILURE:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['tvAiringToday', 'error'], error => action.status);
            return modifiedState.toJS();
        case HomeActionConstants.FETCH_UPCOMING_MOVIES_FAILURE:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['upcomingMovies', 'error'], error => action.status);
            return modifiedState.toJS();
        default:
            return state;
    }
};

export default homeReducer;