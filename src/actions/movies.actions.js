import axios from 'axios';

import * as ActionConstants from './action.constants';
import { showLoading, hideLoading } from './app.actions';
import {
    RESOURCE_PLAYING_MOVIES,
    RESOURCE_POPULAR_MOVIES,
    RESOURCE_UPCOMING_MOVIES,
    RESOURCE_TOP_RATED_MOVIES,
    RESOURCE_SEARCH_MOVIES,
    RESOURCE_DISCOVER_MOVIES
} from '../Utilities/Urls';

import { MOVIES_APPEND_TO_RESPONSE } from '../Utilities/AppConstants';

export const loadMovies = (movies, page = 1) => ({
    type: ActionConstants.FETCH_MOVIES,
    movies,
    page
});

export const loadMovieDetails = movie => ({
    type: ActionConstants.FETCH_MOVIE_DETAILS,
    movie
});

export const clearList = () => ({
    type: ActionConstants.CLEAR_MOVIE_LIST
});

export const fetchMovies = (type, page = 1) => ((dispatch) => {
    let resource;
    switch (type) {
    case 'upcoming':
        resource = RESOURCE_UPCOMING_MOVIES;
        break;
    case 'topRated':
        resource = RESOURCE_TOP_RATED_MOVIES;
        break;
    case 'popular':
        resource = RESOURCE_POPULAR_MOVIES;
        break;
    default:
        resource = RESOURCE_PLAYING_MOVIES;
    }
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(resource, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadMovies(response.data, page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchNowPlaying = (page = 1) => ((dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(RESOURCE_PLAYING_MOVIES, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadMovies(response.data, page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchUpcoming = (page = 1) => ((dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(RESOURCE_UPCOMING_MOVIES, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadMovies(response.data, page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchPopular = (page = 1) => ((dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(RESOURCE_POPULAR_MOVIES, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadMovies(response.data, page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchTopRated = (page = 1) => ((dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(RESOURCE_TOP_RATED_MOVIES, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadMovies(response.data, page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const searchMovies = searchQuery => (dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(RESOURCE_SEARCH_MOVIES, { params: searchQuery }).then((response) => {
        dispatch(hideLoading());
        dispatch(loadMovies(response.data, searchQuery.page || 1));
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const discoverMovies = discoverQuery => (dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(RESOURCE_DISCOVER_MOVIES, { params: discoverQuery }).then((response) => {
        dispatch(hideLoading());
        dispatch(loadMovies(response.data, discoverQuery.page || 1));
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const fetchMovie = id => (dispatch) => {
    const resource = `/api/movies/${id}`;
    dispatch(showLoading());
    return axios.get(resource, {
        params: {
            append_to_response: MOVIES_APPEND_TO_RESPONSE
        }
    }).then((response) => {
        dispatch(hideLoading());
        dispatch(loadMovieDetails(response.data));
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};
