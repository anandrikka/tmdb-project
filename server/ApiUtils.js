'use strict';

var tmdbRequest = require('./tmdb/tmdb-request')('a7109af86b1d09cb5ae4087d834988d7');

var successObj = function (result) {
    return {
        config: result.config,
        headers: result.headers,
        data: result.data,
        status: result.status,
        statusText: result.statusText
    };
}

module.exports = {
    tmdbApi: tmdbRequest,
    reqMiddleware: function (req, res, next) {
        req.params = req.params || {};
        req.query = req.query || {};
        next();
    },
    successObj: successObj,
    requestFn: function (api) {
        return function (req, res) {
            tmdbRequest[api](req.query, req.params).then(function (result) {
                res.send(result.data);
            }, function (error) {
                //Removing Url as it contains api_key
                error.config.url = '';
                res.status(500);
                res.send({message:error.message, stack:error.stack, code:error.code});
            })
        }
    }
};