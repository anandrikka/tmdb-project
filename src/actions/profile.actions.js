import axios from 'axios';
import * as ActionConstants from './action.constants';

import { showLoading, hideLoading } from './app.actions';

export const loadFavoriteMovies = favoriteMovies => ({
    type: ActionConstants.MOVIES_FAVORITE,
    favoriteMovies
});

export const fetchMovieFavorites = accountId => (dispatch) => {
    const resource = `/api/account/${accountId}/favorite/movies`;
    dispatch(showLoading());
    axios.get(resource).then((response) => {
        dispatch(loadFavoriteMovies(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const loadFavoriteTv = favoriteTv => ({
    type: ActionConstants.TV_FAVORITE,
    favoriteTv
});

export const fetchTvFavorites = accountId => (dispatch) => {
    const resource = `/api/account/${accountId}/favorite/tv`;
    dispatch(showLoading());
    axios.get(resource).then((response) => {
        dispatch(loadFavoriteTv(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const loadMovieWatchlist = movieWatchlist => ({
    type: ActionConstants.MOVIE_WATCHLIST,
    movieWatchlist
});

export const fetchMovieWatchlist = accountId => (dispatch) => {
    const resource = `/api/account/${accountId}/watchlist/movies`;
    dispatch(showLoading());
    axios.get(resource).then((response) => {
        dispatch(loadMovieWatchlist(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const loadTvWatchlist = tvWatchlist => ({
    type: ActionConstants.TV_WATCHLIST,
    tvWatchlist
});

export const fetchTvWatchlist = accountId => (dispatch) => {
    const resource = `/api/account/${accountId}/watchlist/tv`;
    dispatch(showLoading());
    axios.get(resource).then((response) => {
        dispatch(loadTvWatchlist(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const loadRatedMovies = ratedMovies => ({
    type: ActionConstants.MOVIES_RATED,
    ratedMovies
});

export const fetchRatedMovies = accountId => (dispatch) => {
    const resource = `/api/account/${accountId}/rated/movies`;
    dispatch(showLoading());
    axios.get(resource).then((response) => {
        dispatch(loadRatedMovies(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const loadRatedTv = ratedTv => ({
    type: ActionConstants.TV_RATED,
    ratedTv
});

export const fetchRatedTv = accountId => (dispatch) => {
    const resource = `/api/account/${accountId}/rated/tv`;
    dispatch(showLoading());
    axios.get(resource).then((response) => {
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
    axios.post(resource, body).then((response) => {
        console.log(response.data);
    }, (error) => { // eslint-disable-line

    });
};
