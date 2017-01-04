import axios from '../utilities/Axios';
import * as ActionConstants from './action.constants';
import * as Resources from '../utilities/ResourceURI';

export const showLoading = () => ({
    type: ActionConstants.LOADING_STARTED
});

export const hideLoading = () => ({
    type: ActionConstants.LOADING_STOPPED
});

const movieGenres = movieGenres => ({ // eslint-disable-line
    type: ActionConstants.MOVIE_GENRES,
    movieGenres
});

export const fetchMovieGenres = () => dispatch => axios.get(Resources.MOVIE_GENRES)
    .then((response) => {
        dispatch(movieGenres(response.data.genres));
    }, (error) => { // eslint-disable-line
    });

export const tvGenres = tvGenres => ({ // eslint-disable-line
    type: ActionConstants.TV_GENRES,
    tvGenres
});

export const fetchTvGenres = () => dispatch => axios.get(Resources.TV_GENRES)
    .then((response) => {
        dispatch(tvGenres(response.data.genres));
    }, (error) => { // eslint-disable-line
    });

const loadUser = userInfo => ({
    type: ActionConstants.USER_INFO,
    userInfo
});

export const fetchUserDetails = () => dispatch => axios.get(Resources.USER_DETAILS)
    .then((response) => {
        dispatch(loadUser(response.data));
    }, (error) => { // eslint-disable-line
    });

const loadConfig = config => ({
    type: ActionConstants.CONFIGURATION,
    config
});

export const fetchConfiguration = () => dispatch => axios.get(Resources.CONFIG)
    .then((response) => {
        dispatch(loadConfig(response.data));
    }, (error) => { // eslint-disable-line
    });

