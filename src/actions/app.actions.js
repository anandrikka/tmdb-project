'use strict';

import * as AppConstants from '../constants/app.constants';

export const test = () =>  {
    return {
        type: AppConstants.LATEST_MOVIES
    };
};