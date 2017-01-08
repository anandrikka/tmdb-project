'use strict';

var router = require('express').Router();
var ApiUtils = require('../ApiUtils');

var reqFn = ApiUtils.requestFn;

router.use(ApiUtils.reqMiddleware);

//Middleware
router.use(ApiUtils.reqMiddleware);

router.get('/popular', reqFn('getPopularPersons'));

router.get('/search', reqFn('searchPeople'));

router.get('/:personId', reqFn('getPersonDetails'));

router.get('/:personId/tagged_images', reqFn('getPersonTaggedCredits'));

module.exports = router;