'use strict';

var router = require('express').Router();
var ApiUtils = require('../ApiUtils');

var reqFn = ApiUtils.requestFn;

//middleware
router.use(ApiUtils.reqMiddleware);

router.get('/movieGenres', reqFn('getListOfGenreForMovies'));
router.get('/timezones', reqFn('getSupportedTimezones'));
router.get('/tvGenres', reqFn('getListOfGenreForTv'));

module.exports = router;