'use strict';
import axios from 'axios';

import * as AppActionConstants from '../constants/app.constants';
import {
    RESOURCE_TIMEZONES,
    RESOURCE_MOVIE_GENRES,
    RESOURCE_AUTHENTICATE,
    RESOURCE_TV_GENRES
} from '../constants/Urls';

export const timezones = (timezones) =>  {
    return {
        type: AppActionConstants.TIMEZONES,
        timezones
    };
};

export const movieGenres = (movieGenres) => {
    return {
        type: AppActionConstants.MOVIE_GENRES,
        movieGenres
    }
};

export const tvGenres = (tvGenres) => {
    return {
        type: AppActionConstants.TV_GENRES,
        tvGenres
    }
}

export const loadUser = (user) => {
    return {
        type: AppActionConstants.USER_INFO,
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