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
            let isLoading = action.isLoading;
            return Object.assign({}, defaultState);
        case HomeConstants.FETCH_MOVIES:            
            return Object.assign({}, state,
                { nowPlaying: Object.assign({}, state.nowPlaying, {list:action.nowPlaying})});
        default:
            return state;
    }
};

export default homeReducer;