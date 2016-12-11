import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    userInfo: {
        userAuthenticated: false
    },
    translations: {
        list: [],
        successful: false
    },
    movieGenres: [],
    movieGenreMap: {},
    tvGenres: {},
    timezones: {
        list: [],
        successful: false
    }
};

function app(state = defaultState, action) {
    let modifiedState;
    switch (action.type) {
    case ActionConstants.TIMEZONES: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['timezones', 'list'], list => action.timezones); // eslint-disable-line
        modifiedState = modifiedState.mergeDeep({
            timezones: {
                successful: true
            }
        });
        return modifiedState.toJS();
    }
    case ActionConstants.MOVIE_GENRES: {
        const movieGenresMap = {};
        for (const genre of action.movieGenres) { // eslint-disable-line
            movieGenresMap[genre.id] = genre;
        }
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.mergeDeep({
            movieGenresMap
        });
        modifiedState = modifiedState.updateIn(['movieGenres'], movieGenres => action.movieGenres); // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.TV_GENRES: {
        const tvGenres = {};
        for (const genre of action.tvGenres) { // eslint-disable-line
            tvGenres[genre.id] = genre;
        }
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.mergeDeep({
            tvGenres
        });
        return modifiedState.toJS();
    }
    case ActionConstants.USER_INFO: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['userInfo'], value => action.userInfo); // eslint-disable-line
        modifiedState = modifiedState.toJS();
        modifiedState = Immutable.Map(modifiedState);
        const userInfo = modifiedState.get('userInfo');
        userInfo.userAuthenticated = true;
        modifiedState = modifiedState.set('userInfo', userInfo);
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
    default:
        return state;
    }
}

export default app;
