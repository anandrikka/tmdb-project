import axios from 'axios';

import * as MovieActionConstants from '../constants/movies.constants';
import { RESOURCE_PLAYING_MOVIES } from '../constants/Urls';


export const loadLatestMovies = (latestMovies, page) => ({
    type: MovieActionConstants.FETCH_LATEST_MOVIES,
    latestMovies,
    page: page || 1
});

export const fetchLatestMovies = (page) => ((dispatch) => {
    page = page || 1;
    return axios.get(RESOURCE_PLAYING_MOVIES, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadLatestMovies(response.data, page));
    }, (error) => {
        
    });
})