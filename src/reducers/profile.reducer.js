import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    favoriteMovies: {
        list: []
    },
    favoriteTv: {
        list: []
    },
    movieWatchlist: {
        list: []
    },
    tvWatchlist: {
        list: []
    },
    ratedMovies: {
        list: []
    },
    ratedTv: {
        list: []
    }
};

function app(state = defaultState, action) {
    let modifiedState;
    switch (action.type) {
    case ActionConstants.MOVIES_FAVORITE: {
        const favMovies = action.favoriteMovies;
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['favoriteMovies', 'list'], list => favMovies.results); // eslint-disable-line  
        modifiedState = modifiedState.mergeDeep({
            favoriteMovies: { // eslint-disable-line
                page: favMovies.page,
                totalPages: favMovies.total_pages,
                totalResults: favMovies.total_results
            }
        });
        return modifiedState.toJS();
    }
    case ActionConstants.TV_FAVORITE: {
        const favTvs = action.favoriteTv;
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['favoriteTv', 'list'], list => favTvs.results); // eslint-disable-line  
        modifiedState = modifiedState.mergeDeep({
            favoriteTv: { // eslint-disable-line
                page: favTvs.page,
                totalPages: favTvs.total_pages,
                totalResults: favTvs.total_results
            }
        });
        return modifiedState.toJS();
    }
    case ActionConstants.MOVIE_WATCHLIST: {
        const movieWatchlist = action.movieWatchlist;
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['movieWatchlist', 'list'], list => movieWatchlist.results); // eslint-disable-line  
        modifiedState = modifiedState.mergeDeep({
            movieWatchlist: { // eslint-disable-line
                page: movieWatchlist.page,
                totalPages: movieWatchlist.total_pages,
                totalResults: movieWatchlist.total_results
            }
        });
        return modifiedState.toJS();
    }
    case ActionConstants.TV_WATCHLIST: {
        const tvWatchlist = action.tvWatchlist;
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['tvWatchlist', 'list'], list => tvWatchlist.results); // eslint-disable-line  
        modifiedState = modifiedState.mergeDeep({
            tvWatchlist: { // eslint-disable-line
                page: tvWatchlist.page,
                totalPages: tvWatchlist.total_pages,
                totalResults: tvWatchlist.total_results
            }
        });
        return modifiedState.toJS();
    }
    case ActionConstants.MOVIES_RATED: {
        const ratedMovies = action.ratedMovies;
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['ratedMovies', 'list'], list => ratedMovies.results); // eslint-disable-line  
        modifiedState = modifiedState.mergeDeep({
            ratedMovies: { // eslint-disable-line
                page: ratedMovies.page,
                totalPages: ratedMovies.total_pages,
                totalResults: ratedMovies.total_results
            }
        });
        return modifiedState.toJS();
    }
    case ActionConstants.TV_RATED: {
        const ratedTv = action.ratedTv;
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['ratedTv', 'list'], list => ratedTv.results); // eslint-disable-line  
        modifiedState = modifiedState.mergeDeep({
            ratedTv: { // eslint-disable-line
                page: ratedTv.page,
                totalPages: ratedTv.total_pages,
                totalResults: ratedTv.total_results
            }
        });
        return modifiedState.toJS();
    }
    default:
        return state;
    }
}
export default app;
