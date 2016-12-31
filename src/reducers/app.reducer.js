import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    userInfo: {},
    config: {},
    isLoading: false,
    movieGenres: [],
    movieGenreMap: {},
    tvGenres: [],
    tvGenreMap: {}
};

function app(state = defaultState, action) {
    let modifiedState;
    switch (action.type) {
    case ActionConstants.MOVIE_GENRES: {
        const movieGenreMap = {};
        for (const genre of action.movieGenres) { // eslint-disable-line
            movieGenreMap[genre.id] = genre;
        }
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.mergeDeep({
            movieGenreMap
        });
        modifiedState = modifiedState.updateIn(['movieGenres'], movieGenres => action.movieGenres); // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.TV_GENRES: {
        const tvGenreMap = {};
        for (const genre of action.tvGenres) { // eslint-disable-line
            tvGenreMap[genre.id] = genre;
        }
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.mergeDeep({
            tvGenreMap
        });
        modifiedState = modifiedState.updateIn(['tvGenres'], tvGenres => action.tvGenres); // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.USER_INFO: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['userInfo'], value => action.userInfo); // eslint-disable-line
        modifiedState = modifiedState.toJS();
        modifiedState = Immutable.Map(modifiedState);
        const userInfo = modifiedState.get('userInfo');
        userInfo.authenticationFailed = action.userInfo.authenticationFailed;
        modifiedState = modifiedState.set('userInfo', userInfo);
        return modifiedState.toJS();
    }
    case ActionConstants.LOADING_STARTED: {
        modifiedState = Immutable.Map(state);
        modifiedState = modifiedState.setIn(['isLoading'], true);
        return modifiedState.toJS();
    }
    case ActionConstants.LOADING_STOPPED: {
        modifiedState = Immutable.Map(state);
        modifiedState = modifiedState.setIn(['isLoading'], false);
        return modifiedState.toJS();
    }
    case ActionConstants.CONFIGURATION: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['config'], value => action.config);  // eslint-disable-line
        return modifiedState.toJS();
    }
    default:
        return state;
    }
}
export default app;

