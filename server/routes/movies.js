'use strict';

var router = require('express').Router();
var ApiUtils = require('../ApiUtils');

var reqFn = ApiUtils.requestFn;

//Middleware
router.use(ApiUtils.reqMiddleware);

router.get('/nowPlaying', reqFn('getMoviesNowPlaying'));

router.get('/popular', reqFn('getPopularMovies'));

router.get('/topRated', reqFn('getTopRatedMovies'));

router.get('/upcoming', reqFn('getUpcomingMovies'));

router.get('/search', reqFn('searchMovies'));

router.get('/discover', reqFn('discoverMovie'));

router.get('/:movieId', reqFn('getMovieDetails'));

router.get('/:movieId/similar', reqFn('getSimilarMovies'));

router.get('/:movieId/recommendations', reqFn('getMovieRecommendations'));



module.exports = router;
