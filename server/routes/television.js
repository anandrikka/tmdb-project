'use strict';

var router = require('express').Router();
var Cookies = require('cookies');
var ApiUtils = require('../ApiUtils');

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

router.get('/airingToday', reqFn('tvShowsAiringToday'));

router.get('/popular', reqFn('getPopularTvShows'));

router.get('/topRated', reqFn('getTopRatedTvShows'));

router.get('/airingNow', reqFn('getTvShowsCurrentlyAiring'));

router.get('/search', reqFn('searchTv'));

router.get('/discover', reqFn('discoverTv'));

router.get('/:tvId', reqFn('getTvShowDetails'));

router.get('/:tvId/similar', reqFn('getTvShowsSimilar'));

router.get('/:tvId/recommendations', reqFn('getTvShowRecommendations'));

router.post('/:tvId/rating', reqFn('rateTv'));

module.exports = router;