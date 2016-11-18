import * as HomeConstants from '../constants/home.constants';
import axios from 'axios';

export const loadLatestMovies = () => ({
    type: HomeConstants.FETCH_MOVIES
});

export const loadingMoviesStarted = (loading) => ({
    type: HomeConstants.LOADING_LATEST_MOVIES_STARTED,
    loading
});

export const loadingMoviesStoped = (loading) => ({
    type: HomeConstants.LOADING_LATEST_MOVIES_STOPPED,
    loading
});

export const loadMovies = (nowPlaying) => ({
    type: HomeConstants.FETCH_MOVIES,
    nowPlaying
});

export const fetchMovies = () => ((dispatch) => {
    dispatch(loadingMoviesStarted(true));
    return axios.get('/api/movies/nowPlaying').then((response) => {
        dispatch(loadMovies(response.data.data.results));
        dispatch(loadingMoviesStoped());
    }, (error) => {
        dispatch(loadingMoviesStoped(false));
    })
}) 