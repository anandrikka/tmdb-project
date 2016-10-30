'use strict';

var express = require('express');
var router = express.Router();
var tmdbRequest = require('../tmdbRequestor');


router.use(function queryorParams(req, res, next) {
    req.params = req.params || {};
    req.query = req.query || {};
    next();
});

router.get('/discoverMovie', function (req, res) {
    tmdbRequest.discoverMovie().then(function (result) {
        res.send({config: result.config, headers: result.headers, data: result.data}); 
    }, function (error) {
        res.send(error)     
    })
});

router

module.exports = router;
