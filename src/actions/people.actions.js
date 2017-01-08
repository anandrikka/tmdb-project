import axios from 'axios';

import * as ActionConstants from './action.constants';
import { showLoading, hideLoading } from './app.actions';
import { PEOPLE_POPULAR, PEOPLE_SEARCH } from '../utilities/ResourceURI';
import { PEOPLE_APPEND_TO_RESPONSE } from '../utilities/AppConstants';

const loadPeople = (peopleList, page = 1) => ({
    type: ActionConstants.FETCH_PEOPLE_LIST,
    peopleList,
    page
});

const loadPeopleDetails = peopleDetails => ({
    type: ActionConstants.FETCH_PEOPLE_DETAILS,
    peopleDetails
});

const loadQueryPeople = queryDetails => ({
    type: ActionConstants.FETCH_PEOPLE_QUERY_RESULTS,
    queryDetails
});

const loadTaggedImages = (peopleId, taggedImages) => ({
    type: ActionConstants.FETCH_TAGGED_IMAGES,
    peopleId,
    taggedImages
});

export const clearQueryResults = () => ({
    type: ActionConstants.CLEAR_PEOPLE_QUERY_RESULTS
});

export const fetchPeople = (page = 1) => ((dispatch) => {
    dispatch(showLoading());
    dispatch(clearQueryResults());
    return axios.get(PEOPLE_POPULAR, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadPeople(response.data, page));
        dispatch(hideLoading());
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
});

export const fetchPeopleDetails = id => (dispatch) => {
    const resource = `/api/people/${id}`;
    dispatch(showLoading());
    return axios.get(resource, {
        params: {
            append_to_response: PEOPLE_APPEND_TO_RESPONSE
        }
    }).then((response) => {
        dispatch(hideLoading());
        dispatch(loadPeopleDetails(response.data));
    }, (error) => { // eslint-disable-line
        dispatch(hideLoading());
    });
};

export const fetchQueryedPeople = query => (dispatch) => {
    dispatch(showLoading());
    return axios.get(PEOPLE_SEARCH, { params: { query } })
        .then((response) => {
            dispatch(hideLoading());
            dispatch(loadQueryPeople(response.data));
        },(error) => { // eslint-disable-line
            dispatch(hideLoading());
        });
};

export const fetchTaggedImages = (peopleId, page = 1) => (dispatch) => {
    const resource = `/api/people/${peopleId}/tagged_images`;
    return axios.get(resource, { params: { page } })
        .then((response) => {
            dispatch(loadTaggedImages(peopleId, response.data));
        }, (error) => { // eslint-disable-line

        });
};

