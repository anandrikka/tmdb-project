import axios from 'axios';

import * as HomeActionConstants from '../constants/home.constants';
import {
    RESOURCE_PLAYING_MOVIES,
    RESOURCE_TODAY_SERIALS,
    RESOURCE_UPCOMING_MOVIES
} from '../constants/Urls';

export const loadMovies = (nowPlaying) => ({
    type: HomeActionConstants.FETCH_NOW_PLAYING_MOVIES,
    nowPlaying
});

export const loadTvAiringToday = (tvAiringToday) => ({
    type: HomeActionConstants.FETCH_TV_AIRING_TODAY,
    tvAiringToday
});

export const loadUpcomingMovies = (upcomingMovies) => ({
    type: HomeActionConstants.FETCH_UPCOMING_MOVIES,
    upcomingMovies
})

export const updateErrorStatus = (type, status) => ({
    type,
    status
})

export const fetchMovies = (page) => ((dispatch) => {
    page = page || 1;
    return axios.get(RESOURCE_PLAYING_MOVIES, {
        params: {
            page: page
        }
    }).then((response) => {
        dispatch(loadMovies(response.data));
    }, (error) => {
        dispatch(updateErrorStatus(HomeActionConstants.FETCH_NOW_PLAYING_MOVIES_FAILURE, true));
    });
});

export const fetchTvAiringToday = () => ((dispatch) => {
    return axios.get(RESOURCE_TODAY_SERIALS).then((response) => {
        dispatch(loadTvAiringToday(response.data));
    }, (error) => {
        dispatch(updateErrorStatus(HomeActionConstants.FETCH_TV_AIRING_TODAY_FAILURE, true));
    });
});

export const fetchUpcomingMovies = () => ((dispatch) => {
    return axios.get(RESOURCE_UPCOMING_MOVIES).then((response) => {
        dispatch(loadUpcomingMovies(response.data));
    }, (error) => {
        dispatch(updateErrorStatus(HomeActionConstants.FETCH_UPCOMING_MOVIES_FAILURE, true));
    });
});