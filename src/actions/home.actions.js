import axios from 'axios';

import * as ActionConstants from './action.constants';
import { showLoading, hideLoading } from './app.actions';
import {
    RESOURCE_PLAYING_MOVIES,
    RESOURCE_TODAY_SERIALS
} from '../Utilities/Urls';

export const loadMovies = nowPlaying => ({
    type: ActionConstants.FETCH_NOW_PLAYING_MOVIES,
    nowPlaying
});

export const loadTvAiringToday = tvAiringToday => ({
    type: ActionConstants.FETCH_TV_AIRING_TODAY,
    tvAiringToday
});

export const updateErrorStatus = (type, status) => ({
    type,
    status
});

export const fetchMovies = (page = 1) => (dispatch) => {
    dispatch(showLoading());
    axios.get(
        RESOURCE_PLAYING_MOVIES, {
            params: {
                page
            }
        }).then((response) => {
            dispatch(loadMovies(response.data));
            dispatch(hideLoading());
        }, (error) => { // eslint-disable-line
            dispatch(updateErrorStatus(ActionConstants.FETCH_NOW_PLAYING_MOVIES_FAILURE, true));
            dispatch(hideLoading());
        });
};

export const fetchTvAiringToday = () => (dispatch) => {
    dispatch(showLoading());
    axios.get(
        RESOURCE_TODAY_SERIALS).then((response) => {
            dispatch(loadTvAiringToday(response.data));
            dispatch(hideLoading());
        }, (error) => { // eslint-disable-line
            dispatch(updateErrorStatus(ActionConstants.FETCH_TV_AIRING_TODAY_FAILURE, true));
            dispatch(hideLoading());
        });
};
