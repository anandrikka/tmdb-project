import axios from 'axios';

import * as ActionConstants from './action.constants';
import { showLoading, hideLoading } from './app.actions';
import {
    RESOURCE_TODAY_SERIALS,
    RESOURCE_TV_TOP_RATED,
    RESOURCE_TV_ON_AIR,
    RESOURCE_TV_POPULAR
} from '../Utilities/Urls';
import TV_APPEND_TO_RESPONSE from '../Utilities/AppConstants';

export const loadTvList = (tvList, page = 1) => ({
    type: ActionConstants.FETCH_TV_LIST,
    tvList,
    page
});

export const loadTvDetails = tv => ({
    type: ActionConstants.FETCH_TV_DETAILS,
    tv
});

export const fetchTvList = (type, page = 1) => ((dispatch) => {
    let resource;
    switch (type) {
    case 'onAir':
        resource = RESOURCE_TV_ON_AIR;
        break;
    case 'topRated':
        resource = RESOURCE_TV_TOP_RATED;
        break;
    case 'popular':
        resource = RESOURCE_TV_POPULAR;
        break;
    default:
        resource = RESOURCE_TODAY_SERIALS;
    }
    dispatch(showLoading());
    return axios.get(resource, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadTvList(response.data, page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchTv = id => (dispatch) => {
    const resource = `/api/tv/${id}`;
    dispatch(showLoading());
    return axios.get(resource, {
        params: {
            append_to_response: TV_APPEND_TO_RESPONSE
        }
    }).then((response) => {
        dispatch(loadTvDetails(response.data));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};
