import axios from 'axios';

import * as ActionConstants from './action.constants';
import { showLoading, hideLoading } from './app.actions';
import * as Resources from '../utilities/ResourceURI';

import { MOVIES_APPEND_TO_RESPONSE } from '../utilities/AppConstants';

const loadMovies = (movies, page = 1) => ({
    type: ActionConstants.FETCH_MOVIES,
    movies,
    page
});

const loadMovieDetails = movie => ({
    type: ActionConstants.FETCH_MOVIE_DETAILS,
    movie
});

const clearList = () => ({
    type: ActionConstants.CLEAR_MOVIE_LIST
});

export const fetchMovies = (type, page = 1) => ((dispatch) => {
    let resource;
    switch (type) {
    case 'upcoming':
        resource = Resources.UPCOMING_MOVIES;
        break;
    case 'topRated':
        resource = Resources.TOP_RATED_MOVIES;
        break;
    case 'popular':
        resource = Resources.POPULAR_MOVIES;
        break;
    default:
        resource = Resources.PLAYING_MOVIES;
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

export const fetchNowPlaying = quickSearchQuery => ((dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(Resources.PLAYING_MOVIES, {
        params: quickSearchQuery
    }).then((response) => {
        dispatch(loadMovies(response.data, quickSearchQuery.page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchUpcoming = quickSearchQuery => ((dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(Resources.UPCOMING_MOVIES, {
        params: quickSearchQuery
    }).then((response) => {
        dispatch(loadMovies(response.data, quickSearchQuery.page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchPopular = quickSearchQuery => ((dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(Resources.POPULAR_MOVIES, {
        params: quickSearchQuery
    }).then((response) => {
        dispatch(loadMovies(response.data, quickSearchQuery.page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchTopRated = quickSearchQuery => ((dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(Resources.TOP_RATED_MOVIES, {
        params: quickSearchQuery
    }).then((response) => {
        dispatch(loadMovies(response.data, quickSearchQuery.page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const searchMovies = searchQuery => (dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(Resources.SEARCH_MOVIES, { params: searchQuery }).then((response) => {
        dispatch(hideLoading());
        dispatch(loadMovies(response.data, searchQuery.page || 1));
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const discoverMovies = discoverQuery => (dispatch) => {
    dispatch(showLoading());
    dispatch(clearList());
    return axios.get(Resources.DISCOVER_MOVIES, { params: discoverQuery }).then((response) => {
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
