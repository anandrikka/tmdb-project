import axios from 'axios';

import * as ActionConstants from './action.constants';
import {
    RESOURCE_TODAY_SERIALS,
    RESOURCE_TV_TOP_RATED,
    RESOURCE_TV_ON_AIR,
    RESOURCE_TV_POPULAR
} from '../Utilities/Urls';

export const loadTvList = (tvList, page = 1) => ({
    type: ActionConstants.FETCH_TV_LIST,
    tvList,
    page
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
    return axios.get(resource, {
        params: {
            page
        }
    }).then((response) => {
        dispatch(loadTvList(response.data, page));
    }, (error) => { // eslint-disable-line
    });
});
