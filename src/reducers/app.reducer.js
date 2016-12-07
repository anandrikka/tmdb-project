import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    userInfo: {},
    translations: {
        list: [],
        successful: false
    },
    movieGenres: {},
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
        modifiedState = modifiedState.updateIn(['timezones, successful'], successful => true); // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.MOVIE_GENRES: {
        const movieGenres = {};
        for (const genre of action.movieGenres) { // eslint-disable-line
            movieGenres[genre.id] = genre;
        }
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.mergeDeep({
            movieGenres
        });
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
    case ActionConstants.USER_INFO:
        return state;
    default:
        return state;
    }
}

export default app;
