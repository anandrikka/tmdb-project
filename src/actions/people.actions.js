import axios from 'axios';

import * as ActionConstants from './action.constants';
import { showLoading, hideLoading } from './app.actions';
import {
    RESOURCE_PEOPLE_POPULAR
} from '../Utilities/Urls';

export const loadPeople = (peopleList, page = 1) => ({
    type: ActionConstants.FETCH_PEOPLE_LIST,
    peopleList,
    page
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
