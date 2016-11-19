import * as HomeConstants from '../constants/home.constants';
import axios from 'axios';

export const loadingMoviesStarted = (isLoading) => ({
    type: HomeConstants.LOADING_LATEST_MOVIES_STARTED,
    isLoading
});

export const loadingMoviesStoped = (isLoading) => ({
    type: HomeConstants.LOADING_LATEST_MOVIES_STOPPED,
    isLoading
});

export const loadMovies = (nowPlaying) => ({
    type: HomeConstants.FETCH_MOVIES,
    nowPlaying
});

export const fetchMovies = () => ((dispatch) => {
    dispatch(loadingMoviesStarted(true));
    setTimeout(() => {
        return axios.get('/api/movies/nowPlaying', { params: { language: 'en_US' } }).then((response) => {
            dispatch(loadMovies(response.data.data.results));
            dispatch(loadingMoviesStoped(false));
        }, (error) => {
            dispatch(loadingMoviesStoped(false));
        })
    }, 5000);
    
}) 