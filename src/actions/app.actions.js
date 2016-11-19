'use strict';
import axios from 'axios';

import * as AppActionConstants from '../constants/app.constants';
import { RESOURCE_TIMEZONES, RESOURCE_MOVIE_GENRES } from '../constants/Urls';

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

export const fetchTimezones = () => ((dispatch) => {
    return axios.get(RESOURCE_TIMEZONES).then((response) => {
        dispatch(timezones(response.data));
    }, (error) => {

    });
});

export const fetchMovieGenres = () => ((dispatch) => {
    return axios.get(RESOURCE_MOVIE_GENRES).then((response) => {
        dispatch(movieGenres(response.data));
    }, (error) => {
        
    })
});