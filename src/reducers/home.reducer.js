'use strict';

import * as HomeActionConstants from '../constants/home.constants';
import Immutable from 'immutable'

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
    switch (action.type) {
        case HomeActionConstants.FETCH_NOW_PLAYING_MOVIES_LOADING_STATUS:
            return Object.assign({}, state, {
                nowPlaying: Object.assign({}, state.nowPlaying, { isLoading: action.isLoading })
            });
        case HomeActionConstants.FETCH_NOW_PLAYING_MOVIES:            
            return Object.assign({}, state,
                { nowPlaying: Object.assign({}, state.nowPlaying, { list: action.nowPlaying.results, totalPages: action.nowPlaying.total_pages, page:action.nowPlaying.page }) });
        case HomeActionConstants.FETCH_TV_AIRING_TODAY_LOADING_STATUS:
            return Object.assign({}, state, {
                tvAiringToday: Object.assign({}, state.tvAiringToday, { isLoading: action.isLoading })
            });
        case HomeActionConstants.FETCH_TV_AIRING_TODAY:
            return Object.assign({}, state, {
                tvAiringToday: Object.assign({}, state.tvAiringToday, { list: action.tvAiringToday.results })
            });
        case HomeActionConstants.FETCH_UPCOMING_MOVIES_LOADING_STATUS:
            return Object.assign({}, state, {
                upcomingMovies: Object.assign({}, state.upcomingMovies, {isLoading: action.isLoading})
            });
        case HomeActionConstants.FETCH_UPCOMING_MOVIES:
            return Object.assign({}, state, {
                upcomingMovies: Object.assign({}, state.upcomingMovies, { list: action.upcomingMovies.results })
            });
        default:
            return state;
    }
};

export default homeReducer;