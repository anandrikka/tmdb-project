import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    search: {
        list: []
    },
    tv_results: {},
    filter: {}
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
    case ActionConstants.FETCH_TV_DETAILS: {
        const tv = action.tv;
        modifiedState = Immutable.Map(state);
        modifiedState = modifiedState.setIn(['tv_results'], { [tv.id]: tv });
        return modifiedState.toJS();
    }
    case ActionConstants.CLEAR_TV_LIST: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['search', 'list'],
            list => []); // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.FETCH_TV_SEASON: {
        modifiedState = Immutable.fromJS(state);
        modifiedState.mergeDeep({
            tv_results: {
                [action.id]: {
                    season_details: {
                        [action.seasonNumber]: action.details
                    }
                }
            }
        });
        return modifiedState.toJS();
    }
    case ActionConstants.FETCH_SIMILAR_SERIALS: {
        const { similarSerials, id } = action;
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['tv_results', id+'', 'similar', 'results'], list => list.concat(similarSerials.results)); // eslint-disable-line
        modifiedState = modifiedState.mergeDeep({
            movie_results: {
                [id]: {
                    similar: {
                        page: similarSerials.page,
                        total_pages: similarSerials.total_pages,
                        total_results: similarSerials.total_results
                    }
                }
            }
        });
        return modifiedState.toJS();
    }
    default:
        return state;
    }
};

export default tvReducer;
