import axios from 'axios';

import * as ActionConstants from './action.constants';
import {
    RESOURCE_PEOPLE_POPULAR
} from '../Utilities/Urls';

export const loadPeople = (peopleList, page) => ({
    type: ActionConstants.FETCH_PEOPLE_LIST,
    peopleList,
    page: page || 1
})

export const fetchPeople = (type, page) => ((dispatch) => {
    page = page || 1;
    let resource;
    switch (type) {
        case 'popular':
            resource = RESOURCE_PEOPLE_POPULAR;
            break;
        default:
            resource = RESOURCE_PEOPLE_POPULAR;
    }
    return axios.get(resource, {
        params: {
            page
        }
    }).then((response) => {
            dispatch(loadPeople(response.data, page));
    }, (error) => {
        
    })
});