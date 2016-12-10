'use strict';
var Cookies = require('cookies');
var router = require('express').Router();
var ApiUtils = require('../ApiUtils');
var reqFn = ApiUtils.requestFn;

router.use(ApiUtils.reqMiddleware);

router.use(function (req, res, next) {
    var cookie = new Cookies(req, res).get('tmdbredux');
    if (!cookie) {
        res.sendStatus(401);
    } else {
        cookie = ApiUtils.decrypt(cookie);
    }
    req.query.session_id = cookie;
    next();
});

router.get('/getAccountDetails', reqFn('getAccountDetails'));
router.post('/:accountId/addToWatchlist', reqFn('addToWatchlist'))

module.exports = router;