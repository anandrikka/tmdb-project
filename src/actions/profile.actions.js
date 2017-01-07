import axios from 'axios';
import * as ActionConstants from './action.constants';

import { showLoading, hideLoading } from './app.actions';

const loadFavoriteMovies = favoriteMovies => ({
    type: ActionConstants.MOVIES_FAVORITE,
    favoriteMovies
});

export const fetchMovieFavorites = (accountId, page = 1) => (dispatch) => {
    const resource = `/api/account/${accountId}/favorite/movies`;
    dispatch(showLoading());
    axios.get(resource, { params: { page } }).then((response) => { // eslint-disable-line
        dispatch(loadFavoriteMovies(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

const loadFavoriteTv = favoriteTv => ({
    type: ActionConstants.TV_FAVORITE,
    favoriteTv
});

export const fetchTvFavorites = (accountId, page = 1) => (dispatch) => {
    const resource = `/api/account/${accountId}/favorite/tv`;
    dispatch(showLoading());
    axios.get(resource, { params: { page } }).then((response) => { // eslint-disable-line
        dispatch(loadFavoriteTv(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

const loadMovieWatchlist = movieWatchlist => ({
    type: ActionConstants.MOVIE_WATCHLIST,
    movieWatchlist
});

export const fetchMovieWatchlist = (accountId, page = 1) => (dispatch) => {
    const resource = `/api/account/${accountId}/watchlist/movies`;
    dispatch(showLoading());
    axios.get(resource, { params: { page } }).then((response) => {
        dispatch(loadMovieWatchlist(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

const loadTvWatchlist = tvWatchlist => ({
    type: ActionConstants.TV_WATCHLIST,
    tvWatchlist
});

export const fetchTvWatchlist = (accountId, page = 1) => (dispatch) => {
    const resource = `/api/account/${accountId}/watchlist/tv`;
    dispatch(showLoading());
    axios.get(resource,  { params: { page } }).then((response) => { // eslint-disable-line
        dispatch(loadTvWatchlist(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

const loadRatedMovies = ratedMovies => ({
    type: ActionConstants.MOVIES_RATED,
    ratedMovies
});

export const fetchRatedMovies = (accountId, page = 1) => (dispatch) => {
    const resource = `/api/account/${accountId}/rated/movies`;
    dispatch(showLoading());
    axios.get(resource,  { params: { page } }).then((response) => { // eslint-disable-line
        dispatch(loadRatedMovies(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

const loadRatedTv = ratedTv => ({
    type: ActionConstants.TV_RATED,
    ratedTv
});

export const fetchRatedTv = (accountId, page = 1) => (dispatch) => { // eslint-disable-line
    const resource = `/api/account/${accountId}/rated/tv`;
    dispatch(showLoading());
    axios.get(resource,  { params: { page } }).then((response) => { // eslint-disable-line
        dispatch(loadRatedTv(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const saveFavorite = (accountId, mediaType, mediaId, favoriteFlag) => (dispatch) => { // eslint-disable-line
    const resource = `/api/account/${accountId}/favorite`;
    const body = {
        media_type: mediaType,
        media_id: mediaId,
        favorite: favoriteFlag
    };
    axios.post(resource, body).then((response) => { // eslint-disable-line
    }, (error) => { // eslint-disable-line

    });
};

export const saveWatchlist = (accountId, mediaType, mediaId, watchlistFlag) => (dispatch) => { // eslint-disable-line
    const resource = `/api/account/${accountId}/watchlist`;
    const body = {
        media_type: mediaType,
        media_id: mediaId,
        watchlist: watchlistFlag
    };
    axios.post(resource, body).then((response) => { // eslint-disable-line
        
    }, (error) => { // eslint-disable-line

    });
};
