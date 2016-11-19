'use strict';

import * as HomeConstants from '../constants/home.constants';
import Immutable from 'immutable'

let defaultState = {
    nowPlaying: {
        list: [],
        isLoading: false,
        error: {}
    }
};

let homeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case HomeConstants.LOADING_LATEST_MOVIES_STARTED:
            return Object.assign({}, state,
                {
                    nowPlaying: Object.assign({}, state.nowPlaying,
                        { isLoading: action.isLoading })
                });
        case HomeConstants.FETCH_MOVIES:            
            return Object.assign({}, state,
                { nowPlaying: Object.assign({}, state.nowPlaying, { list: action.nowPlaying }) });
        case HomeConstants.LOADING_LATEST_MOVIES_STOPPED:
            let isLoading = action.loading;
            return Object.assign({}, state, {nowPlaying: Object.assign({}, state.nowPlaying, {isLoading:action.isLoading})});
        default:
            return state;
    }
};

export default homeReducer;