'use strict';

var router = require('express').Router();
var ApiUtils = require('../ApiUtils');

var reqFn = ApiUtils.requestFn;

router.use(function(req, res, next) {
    console.log('people', req.url, req.query);
    next();
});

//Middleware
router.use(ApiUtils.reqMiddleware);

router.get('/popular', reqFn('getPopularPersons'));

router.get('/:personId', reqFn('getPersonDetails'));

module.exports = router;