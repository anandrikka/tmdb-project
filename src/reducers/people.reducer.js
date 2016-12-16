import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    search: {
        list: []
    },
    results: {}
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
        modifiedState = modifiedState.setIn(['results'], { [peopleDetails.id]: peopleDetails });
        return modifiedState.toJS();
    }
    default:
        return state;
    }
};

export default peopleReducer;
