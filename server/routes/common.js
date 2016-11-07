'use strict';

var express = require('express');
var router = express.Router();
var utils = require('../utils');
var tmdbRequest = utils.tmdb;

router.use(utils.reqMiddleware);

router.get('/movieGenres', function (req, res) {
    tmdbRequest.getListOfGenreForMovies(req.query, req.params).then(function (result) {
        res.send({ config: result.config, headers: result.headers, data: result.data });
    }, function (error) {
        res.send(error);
    })
});

module.exports = router;