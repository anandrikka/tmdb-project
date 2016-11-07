'use strict';

let tmdbRequest = require('./tmdb/tmdb-request')('a7109af86b1d09cb5ae4087d834988d7');
module.exports = {
    tmdb: tmdbRequest,
    reqMiddleware: function (req, res, next) {
        req.params = req.params || {};
        req.query = req.query || {};
        next();
    }
};