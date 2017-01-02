import axios from 'axios';

import * as ActionConstants from './action.constants';
import { showLoading, hideLoading } from './app.actions';
import * as Resources from '../utilities/ResourceURI';

const loadMovies = nowPlaying => ({
    type: ActionConstants.FETCH_NOW_PLAYING_MOVIES,
    nowPlaying
});


const loadUpcomingMovies = upcoming => ({
    type: ActionConstants.FETCH_UPCOMING_MOVIES,
    upcoming
});

const loadTvAiringToday = tvAiringToday => ({
    type: ActionConstants.FETCH_TV_AIRING_TODAY,
    tvAiringToday
});

export const fetchMovies = () => (dispatch) => {
    dispatch(showLoading());
    return axios.get(Resources.PLAYING_MOVIES, { params: { region: 'US' } }).then((response) => {
        dispatch(loadMovies(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const fetchTvAiringToday = () => (dispatch) => {
    dispatch(showLoading());
    return axios.get(Resources.TODAY_SERIALS).then((response) => {
        dispatch(loadTvAiringToday(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
    });
};

export const upcomingMovies = () => (dispatch) => {
    dispatch(showLoading());
    return axios.get(Resources.UPCOMING_MOVIES, { params: { region: 'US' } }).then((response) => {
        dispatch(loadUpcomingMovies(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};
