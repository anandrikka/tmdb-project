'use strict';

var router = require('express').Router();
var ApiUtils = require('../ApiUtils');
var tmdbApi = ApiUtils.tmdbApi;
var reqFn = ApiUtils.requestFn;

router.get('/login', function (req, res) {
    console.log('request recieved');
});

module.exports = router;