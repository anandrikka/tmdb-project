'use strict';

var CryptoJS = require("crypto-js");
var AES = require('crypto-js/aes');

var apiKey = process.env.api_key || 'a7109af86b1d09cb5ae4087d834988d7';
var jwt_secret = process.env.jwt_secret || 'secret123';
var encrypt_token_secret = process.env.encrypt_jwt || 'secret123'; 
var tmdbRequest = require('./tmdb/tmdb-request')(apiKey);

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
        req.body = req.body || {}
        next();
    },
    successObj: successObj,
    requestFn: function (api) {
        return function (req, res) {
            tmdbRequest[api](req.query, req.params, req.body).then(function (result) {
                res.send(result.data);
            }, function (error) {
                error.response = error.response || {};
                error.response.data = error.response.data || {};
                var message = error.response.data.status_message || error.message;
                var errorCode = error.response.data.status_code || 500;
                var statusCode = error.response.status || 500;
                res.status(statusCode);
                res.send({ apiMessage: message, message: error.message, code: errorCode });
                
            })
        }
    },
    encrypt: function (message) {
        return AES.encrypt(message, encrypt_token_secret).toString();
    },
    decrypt: function decrypt(message) {
        var bytes = AES.decrypt(message, encrypt_token_secret);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
};