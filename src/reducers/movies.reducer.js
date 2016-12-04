'use strict';

import * as ActionConstants from '../actions/action.constants';

import Immutable from 'immutable';

let defaultState = {
    search: {
        list: []
    }
};

let moviesReducer = (state = defaultState, action) => {
    let modifiedState;
    switch (action.type) {
        case ActionConstants.FETCH_MOVIES:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['search', 'list'],
                list => action.movies.results)
            modifiedState = modifiedState.mergeDeep({
                search: {
                    totalPages: action.movies.total_pages,
                    totalResults: action.movies.total_results,
                    currentPage: action.page
                }
            })
            return modifiedState.toJS();
        default:
            return state;
    }
}

export default moviesReducer;