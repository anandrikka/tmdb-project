'use strict';

var express = require('express');
var router = express.Router();
var utils = require('../utils');
var tmdbRequest = utils.tmdb;
var successObj = utils.successObj;

router.use(utils.reqMiddleware);

router.get('/discoverMovie', function (req, res) {
    tmdbRequest.discoverMovie(req.query, req.params).then(function (result) {
        res.send(successObj(result));
    }, function (error) {
        res.send(error)
    });
});

router.get('/nowPlaying', function (req, res) {
    tmdbRequest.getMoviesNowPlaying(req.query, req.params).then(function (result) {
        res.send(successObj(result));
    }, function (error) {
        res.send(error);
    });
});

router.get('/popular', function (req, res) {
    tmdbRequest.getPopularMovies(req.query, req.params).then(function (result) {
        res.send(successObj(result));
    }, function (error) {
        res.send(error);
    });
});

router.get('/topRated', function (req, res) {
    tmdbRequest.getTopRatedMovies(req.query, req.params).then(function (result) {
        res.send(successObj(result));
    }, function (error) {
        res.send(error);
    });
});

router.get('/upcoming', function (req, res) {
    tmdbRequest.getUpcomingMovies(req.query, req.params).then(function (result) {
        res.send(successObj(result));
    }, function (error) {
        res.send(error);
    }); 
});

module.exports = router;
