import axios from 'axios';

import * as ActionConstants from './action.constants';
import {
    RESOURCE_PLAYING_MOVIES,
    RESOURCE_POPULAR_MOVIES,
    RESOURCE_UPCOMING_MOVIES,
    RESOURCE_TOP_RATED_MOVIES
} from '../Utilities/Urls';

export const loadMovies = (movies, page) => ({
    type: ActionConstants.FETCH_MOVIES,
    movies,
    page: page || 1
})

export const fetchMovies = (type, page) => ((dispatch) => {
    page = page || 1;
    let resource;
    switch (type) {
        case 'upcoming':
            resource = RESOURCE_UPCOMING_MOVIES;
            break;
        case 'topRated':
            resource = RESOURCE_TOP_RATED_MOVIES;
            break;
        case 'popular':
            resource = RESOURCE_POPULAR_MOVIES
            break;
        default:
            resource = RESOURCE_PLAYING_MOVIES;
    }
    return axios.get(resource, {
        params: {
            page
        }
    }).then((response) => {
            dispatch(loadMovies(response.data, page));
    }, (error) => {
        
    })
});