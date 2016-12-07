import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    search: {
        list: []
    }
};

const tvReducer = (state = defaultState, action) => {
    let modifiedState;
    switch (action.type) {
    case ActionConstants.FETCH_TV_LIST:
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['search', 'list'],
            list => action.tvList.results) // eslint-disable-line
        modifiedState = modifiedState.mergeDeep({
            search: {
                totalPages: action.tvList.total_pages,
                totalResults: action.tvList.total_results,
                currentPage: action.page
            }
        });
        return modifiedState.toJS();
    default:
        return state;
    }
};

export default tvReducer;
