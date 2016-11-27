'use strict';

import * as MoviesActionConstants from '../constants/movies.constants';

import Immutable from 'immutable';

let defaultState = {
    latestMovies: {
        list: []
    }
};

let moviesReducer = (state = defaultState, action) => {
    let modifiedState;
    switch (action.type) {
        case MoviesActionConstants.FETCH_LATEST_MOVIES:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.mergeDeep({
                latestMovies: {
                    list: state.latestMovies.list.concat(action.latestMovies.results),
                    totalPages: action.latestMovies.total_pages,
                    totalResults: action.latestMovies.total_results,
                    currentPage: action.page
                }
            })
            return modifiedState.toJS();
        default:
            return state;
    }
}

export default moviesReducer;