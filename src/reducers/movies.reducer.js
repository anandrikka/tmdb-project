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
            modifiedState = modifiedState.updateIn(['latestMovies', 'list'],
                list => action.latestMovies.results)
            modifiedState = modifiedState.mergeDeep({
                latestMovies: {
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