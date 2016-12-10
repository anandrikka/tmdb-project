import axios from 'axios';
import * as ActionConstants from './action.constants';
import {
    RESOURCE_TIMEZONES,
    RESOURCE_MOVIE_GENRES,
    RESOURCE_TV_GENRES,
    RESOURCE_USER_DETAILS
} from '../Utilities/Urls';

export const timezones = timezones => ({ // eslint-disable-line
    type: ActionConstants.TIMEZONES,
    timezones
});

export const movieGenres = movieGenres => ({ // eslint-disable-line
    type: ActionConstants.MOVIE_GENRES,
    movieGenres
});

export const tvGenres = tvGenres => ({ // eslint-disable-line
    type: ActionConstants.TV_GENRES,
    tvGenres
});

export const loadUser = userInfo => ({
    type: ActionConstants.USER_INFO,
    userInfo
});

export const loadUserFailed = () => ({
    type: ActionConstants.USER_INFO_FAILED
});

export const fetchTimezones = () => dispatch => axios.get(RESOURCE_TIMEZONES)
    .then((response) => {
        dispatch(timezones(response.data));
    }, (error) => { // eslint-disable-line
    });


export const fetchMovieGenres = () => dispatch => axios.get(RESOURCE_MOVIE_GENRES)
    .then((response) => {
        dispatch(movieGenres(response.data.genres));
    }, (error) => { // eslint-disable-line
    });

export const fetchTvGenres = () => dispatch => axios.get(RESOURCE_TV_GENRES)
    .then((response) => {
        dispatch(tvGenres(response.data.genres));
    }, (error) => { // eslint-disable-line
    });

export const fetchUserDetails = () => dispatch => axios.get(RESOURCE_USER_DETAILS)
    .then((response) => {
        dispatch(loadUser(response.data));
    }, (error) => { // eslint-disable-line
        dispatch(loadUserFailed);
    });
