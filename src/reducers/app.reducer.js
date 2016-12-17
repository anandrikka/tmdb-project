import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    userInfo: {
        userAuthenticated: false
    },
    translations: {
        list: []
    },
    isLoading: false,
    movieGenres: [],
    movieGenreMap: {},
    tvGenres: [],
    tvGenreMap: {},
    timezones: {
        list: []
    }
};

function app(state = defaultState, action) {
    let modifiedState;
    switch (action.type) {
    case ActionConstants.TIMEZONES: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['timezones', 'list'], list => action.timezones); // eslint-disable-line
        return modifiedState.toJS();
    }
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
        userInfo.authenticationFalied = action.userInfo.authenticationFalied;
        modifiedState = modifiedState.set('userInfo', userInfo);
        return modifiedState.toJS();
    }
    case ActionConstants.MOVIES_FAVORITE: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['favoriteMovies'], favoriteMovies => action.favoriteMovies);  // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.TV_FAVORITE: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['favoriteTv'], favoriteTv => action.favoriteTv);  // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.USER_INFO_FAILED: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.mergeDeep({
            userInfo: {
                userAuthenticated: false
            }
        });
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
    default:
        return state;
    }
}
export default app;

