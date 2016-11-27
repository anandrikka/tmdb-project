'use strict';

var router = require('express').Router();
var ApiUtils = require('../ApiUtils');
var tmdbApi = ApiUtils.tmdbApi;
var reqFn = ApiUtils.requestFn;

router.get('/login', function (req, res) {
    //res.sendFile(__dirname+'/login.html');
    //res.send('<html><head>window.open(\'http://www.google.com\')</head><body></body></html>')
});

module.exports = router;