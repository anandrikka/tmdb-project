'use strict';

var router = require('express').Router();
var ApiUtils = require('../ApiUtils');
var Cookies = require('cookies');

var reqFn = ApiUtils.requestFn;

//Middleware
router.use(ApiUtils.reqMiddleware);

router.use(function (req, res, next) {
    if (req.url.indexOf('rating') > -1) {
        var cookie = new Cookies(req, res).get('filmtalkies');
        if (cookie) {
            cookie = ApiUtils.decrypt(cookie);
            req.query.session_id = cookie;
        }
    }
    next();
});

router.get('/nowPlaying', reqFn('getMoviesNowPlaying'));

router.get('/popular', reqFn('getPopularMovies'));

router.get('/topRated', reqFn('getTopRatedMovies'));

router.get('/upcoming', reqFn('getUpcomingMovies'));

router.get('/search', reqFn('searchMovies'));

router.get('/discover', reqFn('discoverMovie'));

router.get('/:movieId', reqFn('getMovieDetails'));

router.get('/:movieId/similar', reqFn('getSimilarMovies'));

router.get('/:movieId/recommendations', reqFn('getMovieRecommendations'));

router.post('/:movieId/rating', reqFn('rateMovie'));

module.exports = router;
