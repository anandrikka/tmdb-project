'use strict';
var Cookies = require('cookies');
var router = require('express').Router();
var ApiUtils = require('../ApiUtils');
var reqFn = ApiUtils.requestFn;

router.use(ApiUtils.reqMiddleware);

router.use(function (req, res, next) {
    var cookie = new Cookies(req, res).get('tmdbredux');
    if (!cookie) {
        if (req.url === '/getAccountDetails') {
            res.send({authenticationFalied: true});
        } else {
            res.status(401);
            res.send("UnAuthorized Request");
        }
        return;
    } else {
        cookie = ApiUtils.decrypt(cookie);
        console.log('session-id: ', cookie);
    }
    req.query.session_id = cookie;
    next();
});

router.get('/getAccountDetails', reqFn('getAccountDetails'));
router.get('/:accountId/favorite/movies', reqFn('getFavoriteMovies'));
router.get('/:accountId/favorite/tv', reqFn('getFavoriteTvShows'));
router.get('/:accountId/watchlist/movies', reqFn('getMoviesWatchlist'));
router.get('/:accountId/watchlist/tv', reqFn('getTvWatchlist'));
router.get('/:accountId/rated/movies', reqFn('getRatedMovies'));
router.get('/:accountId/rated/tv', reqFn('getRatedTvShows'));

router.post('/:accountId/favorite', reqFn('markAsFavorite'));
router.post('/:accountId/watchlist', reqFn('addToWatchlist'));

module.exports = router;