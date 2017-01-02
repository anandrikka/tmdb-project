import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    search: {
        list: []
    },
    people_results: {},
    query_results: {
        results: []
    }
};

const peopleReducer = (state = defaultState, action) => {
    let modifiedState;
    switch (action.type) {
    case ActionConstants.FETCH_PEOPLE_LIST: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['search', 'list'],
            list => action.peopleList.results); // eslint-disable-line
        modifiedState = modifiedState.mergeDeep({
            search: {
                totalPages: action.peopleList.total_pages,
                totalResults: action.peopleList.total_results,
                currentPage: action.page
            }
        });
        return modifiedState.toJS();
    }
    case ActionConstants.FETCH_PEOPLE_DETAILS: {
        const { peopleDetails } = action;
        modifiedState = Immutable.Map(state);
        modifiedState = modifiedState.setIn(['people_results'], { [peopleDetails.id]: peopleDetails });
        return modifiedState.toJS();
    }
    case ActionConstants.FETCH_PEOPLE_QUERY_RESULTS: {
        const { queryDetails } = action;
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['query_results'], queryResults => queryDetails); // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.CLEAR_PEOPLE_QUERY_RESULTS: {
        modifiedState = Immutable.fromJS(state);
        const emptyQueryState = { results: [] };
        modifiedState = modifiedState.updateIn(['query_results'], queryResults => emptyQueryState); // eslint-disable-line
        return modifiedState.toJS();
    }
    default:
        return state;
    }
};

export default peopleReducer;
