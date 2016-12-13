'use strict';

var router = require('express').Router();
var ApiUtils = require('../ApiUtils');

var reqFn = ApiUtils.requestFn;

//Middleware
router.use(ApiUtils.reqMiddleware);

router.get('/airingToday', reqFn('tvShowsAiringToday'));

router.get('/popular', reqFn('getPopularTvShows'));

router.get('/topRated', reqFn('getTopRatedTvShows'));

router.get('/airingNow', reqFn('getTvShowsCurrentlyAiring'));

router.get('/:tvId', reqFn('getTvShowDetails'));

module.exports = router;