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
                { 
                    nowPlaying: Object.assign({}, state.nowPlaying, { 
                        list: action.nowPlaying.results, 
                        totalMoviePages: action.nowPlaying.total_pages, 
                        moviePage:action.nowPlaying.page,
                        totalResults: action.nowPlaying.total_results
                    }) 
                });
        case HomeActionConstants.FETCH_TV_AIRING_TODAY_LOADING_STATUS:
            return Object.assign({}, state, {
                tvAiringToday: Object.assign({}, state.tvAiringToday, { isLoading: action.isLoading })
            });
        case HomeActionConstants.FETCH_TV_AIRING_TODAY:
            return Object.assign({}, state,
				{
                	tvAiringToday: Object.assign({}, state.tvAiringToday, { 
						list: action.tvAiringToday.results,
						totalTvAiringPages: action.tvAiringToday.total_pages,
						airingPage: action.tvAiringToday.page,
						totalResults: action.tvAiringToday.total_results
					})
            	});
        case HomeActionConstants.FETCH_UPCOMING_MOVIES_LOADING_STATUS:
            return Object.assign({}, state, {
                upcomingMovies: Object.assign({}, state.upcomingMovies, {isLoading: action.isLoading})
            });
        case HomeActionConstants.FETCH_UPCOMING_MOVIES:
            return Object.assign({}, state, 
				{
                	upcomingMovies: Object.assign({}, state.upcomingMovies, { 
						list: action.upcomingMovies.results,
						totalUpComingPages: action.upcomingMovies.total_pages,
						upComingPage: action.upcomingMovies.page,
						totalResults: action.upcomingMovies.total_results
					})
            	});
        default:
            return state;
    }
};

export default homeReducer;