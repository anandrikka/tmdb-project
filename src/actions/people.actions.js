import axios from 'axios';

import * as ActionConstants from './action.constants';
import { showLoading, hideLoading } from './app.actions';
import {
    RESOURCE_PEOPLE_POPULAR
} from '../Utilities/Urls';
import { PEOPLE_APPEND_TO_RESPONSE } from '../Utilities/AppConstants';

export const loadPeople = (peopleList, page = 1) => ({
    type: ActionConstants.FETCH_PEOPLE_LIST,
    peopleList,
    page
});

export const loadPeopleDetails = peopleDetails => ({
    type: ActionConstants.FETCH_PEOPLE_DETAILS,
    peopleDetails
});

export const fetchPeople = (type, page = 1) => ((dispatch) => {
    let resource;
    switch (type) {
    case 'popular':
        resource = RESOURCE_PEOPLE_POPULAR;
        break;
    default:
        resource = RESOURCE_PEOPLE_POPULAR;
    }
    dispatch(showLoading());
    return axios.get(resource, {
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
