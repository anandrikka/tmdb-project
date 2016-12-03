'use strict';
import axios from 'axios';

import * as ActionConstants from './action.constants';
import {
    RESOURCE_TIMEZONES,
    RESOURCE_MOVIE_GENRES,
    RESOURCE_AUTHENTICATE,
    RESOURCE_TV_GENRES
} from '../Utilities/Urls';

export const timezones = (timezones) =>  {
    return {
        type: ActionConstants.TIMEZONES,
        timezones
    };
};

export const movieGenres = (movieGenres) => {
    return {
        type: ActionConstants.MOVIE_GENRES,
        movieGenres
    }
};

export const tvGenres = (tvGenres) => {
    return {
        type: ActionConstants.TV_GENRES,
        tvGenres
    }
}

export const loadUser = (user) => {
    return {
        type: ActionConstants.USER_INFO,
        user
    }
}

export const fetchTimezones = () => ((dispatch) => {
    return axios.get(RESOURCE_TIMEZONES).then((response) => {
        dispatch(timezones(response.data));
    }, (error) => {

    });
});

export const fetchMovieGenres = () => ((dispatch) => {
    return axios.get(RESOURCE_MOVIE_GENRES).then((response) => {
        dispatch(movieGenres(response.data.genres));
    }, (error) => {
       
    })
});

export const fetchTvGenres = () => ((dispatch) => {
    return axios.get(RESOURCE_TV_GENRES).then((response) => {
        dispatch(tvGenres(response.data.genres))
    }, (error) => {

    })
})

export const authenticate = () => ((dispatch) => {
    return axios.get(RESOURCE_AUTHENTICATE).then((response) => {
        dispatch(loadUser(response.data));
    }, (error) => {

    })
});