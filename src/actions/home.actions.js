import axios from 'axios';

import * as HomeActionConstants from '../constants/home.constants';
import { RESOURCE_PLAYING_MOVIES, RESOURCE_TODAY_SERIALS, RESOURCE_UPCOMING_MOVIES } from '../constants/Urls';

export const loadingStatus = (actionType, isLoading) => ({
    type: actionType,
    isLoading
});

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

export const fetchMovies = (page) => ((dispatch) => {
    page = page || 1;
    dispatch(loadingStatus(HomeActionConstants.FETCH_NOW_PLAYING_MOVIES_LOADING_STATUS, true));
    return axios.get(RESOURCE_PLAYING_MOVIES, {
        params: {
            page: page
        }
    }).then((response) => {
        dispatch(loadMovies(response.data));
        dispatch(loadingStatus(HomeActionConstants.FETCH_NOW_PLAYING_MOVIES_LOADING_STATUS, false));
    }, (error) => {
        dispatch(loadingStatus(HomeActionConstants.FETCH_NOW_PLAYING_MOVIES_LOADING_STATUS, false));
    });
});

export const fetchTvAiringToday = () => ((dispatch) => {
    dispatch(loadingStatus(HomeActionConstants.FETCH_TV_AIRING_TODAY_LOADING_STATUS, true));
    return axios.get(RESOURCE_TODAY_SERIALS).then((response) => {
        dispatch(loadTvAiringToday(response.data));
        dispatch(loadingStatus(HomeActionConstants.FETCH_TV_AIRING_TODAY_LOADING_STATUS, false));
    }, (error) => {
        dispatch(loadingStatus(HomeActionConstants.FETCH_TV_AIRING_TODAY_LOADING_STATUS, false));
    });
});

export const fetchUpcomingMovies = () => ((dispatch) => {
    dispatch(loadingStatus(HomeActionConstants.FETCH_UPCOMING_MOVIES_LOADING_STATUS, true));
    return axios.get(RESOURCE_UPCOMING_MOVIES).then((response) => {
        dispatch(loadUpcomingMovies(response.data));
        dispatch(loadingStatus(HomeActionConstants.FETCH_UPCOMING_MOVIES_LOADING_STATUS, false));
    }, (error) => {
        dispatch(loadingStatus(HomeActionConstants.FETCH_TV_AIRING_TODAY_LOADING_STATUS, false));
    });
});