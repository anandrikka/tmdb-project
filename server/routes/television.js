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

router.get('/search', reqFn('searchTv'));

router.get('/discover', reqFn('discoverTv'));

router.get('/:tvId', reqFn('getTvShowDetails'));

router.get('/:tvId/similar', reqFn('getTvShowsSimilar'));

router.get('/:tvId/recommendations', reqFn('getTvShowRecommendations'));



module.exports = router;