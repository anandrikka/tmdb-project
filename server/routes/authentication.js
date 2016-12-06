'use strict';

var router = require('express').Router();
var ApiUtils = require('../ApiUtils');
var tmdbApi = ApiUtils.tmdbApi;
var reqFn = ApiUtils.requestFn;
var axios = require('axios');

router.get('/loginReqToken', reqFn('requestToken'));

var authId = '';

router.get('/dialogWithReqToken', function (req, res) {
    res.redirect('https://www.themoviedb.org/authenticate/' + req.query.reqToken +
        '?redirect_to=http://localhost/callback');
    authId = req.query.reqToken;
})

router.get('/authenticate/'+authId+'/allow', function (req, res) {
    console.log(res); 
});

module.exports = router;