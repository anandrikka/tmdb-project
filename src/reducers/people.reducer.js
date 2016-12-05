'use strict';

import * as ActionConstants from '../actions/action.constants';

import Immutable from 'immutable';

let defaultState = {
    search: {
        list: []
    }
};

let peopleReducer = (state = defaultState, action) => {
    let modifiedState;
    switch (action.type) {
        case ActionConstants.FETCH_PEOPLE_LIST:
            modifiedState = Immutable.fromJS(state);
            modifiedState = modifiedState.updateIn(['search', 'list'],
                list => action.peopleList.results)
            modifiedState = modifiedState.mergeDeep({
                search: {
                    totalPages: action.peopleList.total_pages,
                    totalResults: action.peopleList.total_results,
                    currentPage: action.page
                }
            })
            return modifiedState.toJS();
        default:
            return state;
    }
}

export default peopleReducer;