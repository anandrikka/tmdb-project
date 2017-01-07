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

const loadTvSeason = (id, seasonNumber, details) => ({
    type: ActionConstants.FETCH_TV_SEASON,
    id,
    seasonNumber,
    details
});

const loadSimilarSerials = (id, similarSerials) => ({
    type: ActionConstants.FETCH_SIMILAR_SERIALS,
    id,
    similarSerials
});

const loadRecommendedSerials = (id, recommendedSerials) => ({
    type: ActionConstants.FETCH_RECOMMENDED_SERIALS,
    id,
    recommendedSerials
});

const clearList = () => ({ // eslint-disable-line
    type: ActionConstants.CLEAR_TV_LIST
});

export const fetchOnAir = quickSearchQuery => ((dispatch) => {
    dispatch(showLoading());
    // dispatch(clearList());
    return axios.get(Resources.TV_ON_AIR, {
        params: quickSearchQuery
    }).then((response) => {
        dispatch(loadTvList(response.data, quickSearchQuery.page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchTodaySerials = quickSearchQuery => ((dispatch) => {
    dispatch(showLoading());
    // dispatch(clearList());
    return axios.get(Resources.TODAY_SERIALS, {
        params: quickSearchQuery
    }).then((response) => {
        dispatch(loadTvList(response.data, quickSearchQuery.page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchPopular = quickSearchQuery => ((dispatch) => {
    dispatch(showLoading());
    // dispatch(clearList());
    return axios.get(Resources.TV_POPULAR, {
        params: quickSearchQuery
    }).then((response) => {
        dispatch(loadTvList(response.data, quickSearchQuery.page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchTopRated = quickSearchQuery => ((dispatch) => {
    dispatch(showLoading());
    // dispatch(clearList());
    return axios.get(Resources.TV_TOP_RATED, {
        params: quickSearchQuery
    }).then((response) => {
        dispatch(loadTvList(response.data, quickSearchQuery.page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const searchTv = searchQuery => (dispatch) => {
    dispatch(showLoading());
    // dispatch(clearList());
    return axios.get(Resources.SEARCH_TV, { params: searchQuery }).then((response) => {
        dispatch(hideLoading());
        dispatch(loadTvList(response.data, searchQuery.page || 1));
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const discoverTv = discoverQuery => (dispatch) => {
    dispatch(showLoading());
    // dispatch(clearList());
    return axios.get(Resources.DISCOVER_TV, { params: discoverQuery }).then((response) => {
        dispatch(hideLoading());
        dispatch(loadTvList(response.data, discoverQuery.page || 1));
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const fetchTv = id => (dispatch) => {
    const resource = `/api/tv/${id}`;
    dispatch(showLoading());
    return axios.get(resource, {
        params: {
            append_to_response: TV_APPEND_TO_RESPONSE
        }
    }).then((response) => {
        dispatch(hideLoading());
        dispatch(loadTvDetails(response.data));
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const fetchTvSeason = (id, seasonNumber) => (dispatch) => {
    const resource = `/api/tv/${id}/season/${seasonNumber}`;
    dispatch(showLoading());
    return axios.get(resource).then((response) => {
        loadTvSeason(id, seasonNumber, response.data);
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};


export const similarSerials = (id, page = 1) => (dispatch) => {
    const resource = `/api/tv/${id}/similar`;
    return axios.get(resource, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadSimilarSerials(id, response.data));
    }, (error) => { // eslint-disable-line

    });
};

export const recommendedSerials = (id, page = 1) => (dispatch) => {
    const resource = `/api/tv/${id}/recommendations`;
    return axios.get(resource, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadRecommendedSerials(id, response.data));
    }, (error) => { // eslint-disable-line

    });
};

export const rateTv = (id, rating) => (dispatch) => { // eslint-disable-line
    const resource = `/api/tv/${id}/rating`;
    return axios.post(resource, { value: rating }).then((response) => { // eslint-disable-line
    }, (error) => { // eslint-disable-line
    });
};
