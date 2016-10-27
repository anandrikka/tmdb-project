'use strict';

var express = require('express');
var router = express.Router();
var tmdbRequest = require('../tmdb/tmdb-request')('a7109af86b1d09cb5ae4087d834988d7');

router.get('/search', function (req, res) {
    tmdbRequest.searchMovie().then(function (result) {
        res.send({config: result.config, headers: result.headers, data: result.data}); 
    }, function (error) {
        res.send(error)     
    })
});

module.exports = router;
