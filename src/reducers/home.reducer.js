'use strict';

import * as HomeActionConstants from '../constants/home.constants';
import Immutable from 'immutable';

let defaultState = {
    nowPlaying: {
        list: [],
        isLoading: false,
        error: {}
    },
    tvAiringToday: {
        list: [],
        isLoading: false,
        error: {}
    },
    upcomingMovies: {
        list: [],
        isLoading: false,
        error: {}
    }
};

let homeReducer = (state = defaultState, action) => {
    let modifiedState;
    switch (action.type) {
        case HomeActionConstants.FETCH_NOW_PLAYING_MOVIES_LOADING_STATUS:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['nowPlaying', 'isLoading'], value => action.isLoading);
            return modifiedState.toJS();
        case HomeActionConstants.FETCH_NOW_PLAYING_MOVIES:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['nowPlaying', 'list'],
                list => list.concat(action.nowPlaying.results));
            modifiedState = modifiedState.mergeDeep({
                nowPlaying: {
                    totalMoviePages: action.nowPlaying.total_pages,
                    moviePage: action.nowPlaying.page,
                    totalResults: action.nowPlaying.total_results
                }
            });
            return modifiedState.toJS();
        case HomeActionConstants.FETCH_TV_AIRING_TODAY_LOADING_STATUS:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['tvAiringToday', 'isLoading'], isLoading => action.isLoading);
            return modifiedState.toJS();
        case HomeActionConstants.FETCH_TV_AIRING_TODAY:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['tvAiringToday', 'list'],
                list => list.concat(action.tvAiringToday.results));
            modifiedState = modifiedState.mergeDeep({
                tvAiringToday: {
                    totalTvAiringPages: action.tvAiringToday.total_pages,
                    airingPage: action.tvAiringToday.page,
                    totalResults: action.tvAiringToday.total_results
                }
            });
            return modifiedState.toJS();
        case HomeActionConstants.FETCH_UPCOMING_MOVIES_LOADING_STATUS:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.mergeDeep({
                upcomingMovies: {
                    isLoading: action.isLoading
                }
            });
            return modifiedState.toJS();
        case HomeActionConstants.FETCH_UPCOMING_MOVIES:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.mergeDeep({
                upcomingMovies: {
                    list: state.upcomingMovies.list.concat(action.upcomingMovies.results),
                    totalUpComingPages: action.upcomingMovies.total_pages,
                    upComingPage: action.upcomingMovies.page,
                    totalResults: action.upcomingMovies.total_results
                }
            });
            return modifiedState.toJS();
        default:
            return state;
    }
};

export default homeReducer;