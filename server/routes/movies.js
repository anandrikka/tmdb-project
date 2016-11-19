'use strict';

var router = require('express').Router();
var ApiUtils = require('../ApiUtils');

var reqFn = ApiUtils.requestFn;

//Middleware
router.use(ApiUtils.reqMiddleware);

router.get('/discoverMovie', reqFn('discoverMovie'));

router.get('/nowPlaying', reqFn('getMoviesNowPlaying'));

router.get('/popular', reqFn('getPopularMovies'));

router.get('/topRated', reqFn('getTopRatedMovies'));

router.get('/upcoming', reqFn('getUpcomingMovies'));

module.exports = router;
