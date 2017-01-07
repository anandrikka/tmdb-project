import Immutable from 'immutable';
import * as ActionConstants from '../actions/action.constants';

const defaultState = {
    search: {
        list: []
    },
    movie_results: {}
};

const moviesReducer = (state = defaultState, action) => {
    let modifiedState;
    switch (action.type) {
    case ActionConstants.FETCH_MOVIES: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['search', 'list'],
            list => action.movies.results) // eslint-disable-line
        modifiedState = modifiedState.mergeDeep({
            search: {
                totalPages: action.movies.total_pages,
                totalResults: action.movies.total_results,
                currentPage: action.page
            }
        });
        return modifiedState.toJS();
    }
    case ActionConstants.FETCH_MOVIE_DETAILS: {
        const movie = action.movie;
        modifiedState = Immutable.Map(state);
        modifiedState = modifiedState.setIn(['movie_results'], { [movie.id]: movie });
        return modifiedState.toJS();
    }
    case ActionConstants.CLEAR_MOVIE_LIST: {
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['search', 'list'],
            list => []); // eslint-disable-line
        return modifiedState.toJS();
    }
    case ActionConstants.FETCH_SIMILAR_MOVIES: {
        const { similarMovies, id } = action;
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['movie_results', id+'', 'similar', 'results'], list => list.concat(similarMovies.results)); // eslint-disable-line
        modifiedState = modifiedState.mergeDeep({
            movie_results: {
                [id]: {
                    similar: {
                        page: similarMovies.page,
                        total_pages: similarMovies.total_pages,
                        total_results: similarMovies.total_results
                    }
                }
            }
        });
        return modifiedState.toJS();
    }
    case ActionConstants.FETCH_RECOMMENDED_MOVIES: {
        const { recommendedMovies, id } = action;
        modifiedState = Immutable.fromJS(state);
        modifiedState = modifiedState.updateIn(['movie_results', `${id} + ''`, 'recommendations', 'results'],
            list => list.concat(similarMovies.results)); // eslint-disable-line
        modifiedState = modifiedState.mergeDeep({
            movie_results: {
                [id]: {
                    similar: {
                        page: recommendedMovies.page,
                        total_pages: recommendedMovies.total_pages,
                        total_results: recommendedMovies.total_results
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

export default moviesReducer;
