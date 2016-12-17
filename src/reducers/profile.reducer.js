import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    favoriteMovies: {},
    favoriteTv: {},
    movieWatchlist: {},
    tvWatchlist: {},
    ratedMovies: {},
    ratedTv: {}
};

function app(state = defaultState, action) {
    let modifiedState;
    switch (action.type) {
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
    case ActionConstants.MOVIE_WATCHLIST: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['movieWatchlist'], movieWatchlist => action.movieWatchlist);  // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.TV_WATCHLIST: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['tvWatchlist'], tvWatchlist => action.tvWatchlist);  // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.MOVIES_RATED: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['ratedMovies'], ratedMovies => action.ratedMovies);  // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.TV_RATED: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['ratedTv'], ratedTv => action.ratedTv);  // eslint-disable-line
        return modifiedState.toJS();
    }
    default:
        return state;
    }
}
export default app;
