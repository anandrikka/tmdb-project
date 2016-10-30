'use strict';

var express = require('express');
var router = express.Router();
var tmdbRequest = require('../tmdbRequestor');

router.use(function queryorParams(req, res, next) {
    req.params = req.params || {};
    req.query = req.query || {};
    next();
});

router.get('/movieGenres', function (req, res) {
    tmdbRequest.getListOfGenreForMovies(req.query, req.params).then(function (result) {
        res.send({ config: result.config, headers: result.headers, data: result.data });
    }, function (error) {
        res.send(error);
    })
});

module.exports = router;