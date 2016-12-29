import axios from 'axios';

import * as ActionConstants from './action.constants';
import { showLoading, hideLoading } from './app.actions';
import * as Resources from '../utilities/ResourceURI';
import { TV_APPEND_TO_RESPONSE } from '../utilities/AppConstants';

const loadTvList = (tvList, page = 1) => ({
    type: ActionConstants.FETCH_TV_LIST,
    tvList,
    page
});

const loadTvDetails = tv => ({
    type: ActionConstants.FETCH_TV_DETAILS,
    tv
});

export const fetchTvList = (type, page = 1) => ((dispatch) => {
    let resource;
    switch (type) {
    case 'onAir':
        resource = Resources.TV_ON_AIR;
        break;
    case 'topRated':
        resource = Resources.TV_TOP_RATED;
        break;
    case 'popular':
        resource = Resources.TV_POPULAR;
        break;
    default:
        resource = Resources.TODAY_SERIALS;
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
