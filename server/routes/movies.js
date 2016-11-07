'use strict';

var express = require('express');
var router = express.Router();
var utils = require('../utils');
var tmdbRequest = utils.tmdb

router.use(utils.reqMiddleware);

router.get('/discoverMovie', function (req, res) {
    tmdbRequest.discoverMovie().then(function (result) {
        res.send({config: result.config, headers: result.headers, data: result.data}); 
    }, function (error) {
        res.send(error)     
    })
});

module.exports = router;
