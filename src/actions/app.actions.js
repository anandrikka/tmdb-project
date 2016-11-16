'use strict';

import * as AppConstants from '../constants/app.constants';

export const latestMovies = () =>  {
    return {
        type: AppConstants.LATEST_MOVIES
    };
};