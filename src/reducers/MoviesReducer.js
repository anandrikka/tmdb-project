import * as Constants from '../actions/actionConstants';

function loadMovies(state={}, action) {
    switch(action.type) {
        case Constants.LATEST_MOVIES:
            console.log(action);
            return {};
        default:
            return state;
    }
}

export default loadMovies;