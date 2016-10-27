'use strict';

var express = require('express');
var router = express.Router();
var tmdbRequest = require('../tmdb/tmdb-request')('a7109af86b1d09cb5ae4087d834988d7');

router.get('/search', function (req, res) {
    tmdbRequest.searchMovie().then(function (result) {
        let {config, headers, data} = result
        res.send({config, headers, data}); 
    }, function (error) {
        res.send(error)     
    })
    
});

module.exports = router;
