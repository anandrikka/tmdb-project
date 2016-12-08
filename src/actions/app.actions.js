import axios from 'axios';
import * as ActionConstants from './action.constants';
import {
    RESOURCE_TIMEZONES,
    RESOURCE_MOVIE_GENRES,
    RESOURCE_AUTHENTICATE,
    RESOURCE_TV_GENRES,
    RESOURCE_REQ_AUTH_TOKEN,
    REQ_LOGIN_WITH_AUTH_TOKEN
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

export const loadUser = user => ({
    type: ActionConstants.USER_INFO,
    user
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

export const authenticate = (username, password) => dispatch => axios.post(RESOURCE_AUTHENTICATE,
    { username, password })
    .then((response) => {
        dispatch(loadUser(response.data));
    }, (error) => { // eslint-disable-line
    });

export const getReqToken = () => dispatch => axios.get(RESOURCE_REQ_AUTH_TOKEN) // eslint-disable-line
    .then((response) => {
        axios.get(REQ_LOGIN_WITH_AUTH_TOKEN, {
            params: {
                reqToken: response.data.request_token
            }
        }).then((res) => { // eslint-disable-line
        }, () => {
        });
    }, (error) => { // eslint-disable-line
    });
